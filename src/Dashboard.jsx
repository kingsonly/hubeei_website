import DashboardCard from "./components/Dashboard/DashboardCard";
import KanbanBoard from "./components/Kanban/KanbanBoard";
import Sidebar from "./components/SideBar/SideBar";
import { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AppModal from "./components/modalcomponent/AppModal";
import { styled } from "@mui/system";
import ActionButton from "./components/ActionButton";
import CategoryContent from "./components/CategoryContent/CategoryContent";
import { useEffect } from "react";
import axios, { Axios } from "axios";
import DashboardHubs from "./components/Dashboard/DashboardHubs";
import TextInput from "./components/InputComponent/TextInput";
import ReactPlayer from "react-player";
import StarRateIcon from "@mui/icons-material/StarRate";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UpdateContent from "./components/UpdateContentComponent/UpdateContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import { CircularProgress, Typography } from "@mui/material";

import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import Tooltip from "@mui/material/Tooltip";
import UploadButton from "./components/InputComponent/UploadButton";
import Engagement from "./components/Engagement/Engagement";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const router = useNavigate();
  const [selectedHub, setSelectedHub] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [createdCounter, setCreatedCounter] = useState(0);
  const [dashboardStats, setDashboardStats] = useState([]);
  const [hubs, setHubs] = useState([]);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [openCategory, setOpenCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [viewSelectedContents, setViewSelectedContents] = useState([]);
  const [showContentModal, setShowContentModal] = useState(false);
  const [updateContentState, setUpdateContentState] = useState(false);
  const [openDeleteContent, setOpenDeleteContent] = useState(false);
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [createHub, setCreateHub] = useState(false);
  const [hubLoader, setHubLoader] = useState(false);
  const [refreshLoader, setRefreshLoader] = useState(false);
  const [hubTitle, setHubTitle] = useState("");
  const [hubUrl, setHubUrl] = useState("");
  const [hubDescription, setHubDescription] = useState("");
  const [createCategoryLoader, setCreateCategoryLoader] = useState(false);
  const [settings, setSettings] = useState({});
  const [logoModal, setLogoModal] = useState(false);
  const [catTititleError, setCatTititleError] = useState(false);
  const [logoModalLoader, setLogoModalLoader] = useState(false);
  const [logoValue, setLogoValue] = useState();
  const [registrationSettings, setRegistrationSettings] = useState(false);
  const [updateCategoryTitleState, setUpdateCategoryTitleState] = useState("");
  const [updateCategoryId, setUpdateCategoryId] = useState("");
  const [updateCategoryTitleError, setUpdateCategoryTitleError] =
    useState(false);
  const [newHubError, setNewHubError] = useState({
    name: "",
    url: "",
    description: "",
  });
  const [registrationFieldData, setRegistrationFieldData] = useState([]);
  const [registrationFieldSettingsStage, setRegistrationFieldSettingsStage] =
    useState(1);
  const [withPayment, setWithPayment] = useState("no");
  const [tenure, setTenure] = useState("one off");
  const [amount, setAmount] = useState(0);
  const [registrationSettingsDetails, setRegistrationSettingsDetails] =
    useState({});
  const [
    registrationSettingsDetailsModal,
    setRegistrationSettingsDetailsModal,
  ] = useState(false);
  const [subscribersModal, setSubscribersModal] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const option = [
    { label: "YES", value: "yes" },
    { label: "NO", value: "no" },
  ];

  const paymentTenure = [
    { label: "ONE OFF", value: "one Off" },
    { label: "MONTHLY", value: "monthly" },
    { label: "YEARLY", value: "yearly" },
  ];

  useEffect(() => {
    bootstrap();
  }, [createdCounter]);

  const init = async () => {
    // there is no selected hub in the local storage , then get a list of all the hubs
    let getHub = localStorage.getItem("hub");

    if (getHub == null) {
      let userData = JSON.parse(localStorage.getItem("userData"));
      let id = localStorage.getItem("hub");
      if (userData != undefined) {
        let userId = userData.id;
        let response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API}usershub/${userId}`
        );

        if (response.data.status == "success") {
          // save state which would be used to display the list of hubs
          // set the dashboad to show modal and display the list of hubs for that user
          setHubs(response.data.data);

          localStorage.setItem("hubList", JSON.stringify(response.data.data));
          let id = localStorage.getItem("hub");
          let hubDetails = JSON.parse(localStorage.getItem("hubDetails"));
          let getNewHubId = localStorage.getItem("newHub");
          if (getNewHubId != undefined) {
            let mainHubDetails = response.data.data.filter(
              (data) => data.id == getNewHubId
            );
            action(getNewHubId, mainHubDetails[0]);
            console.log("i am the main real", mainHubDetails);
            localStorage.removeItem("newHub");
          }

          createSettings();
        } else {
          //handle the error here
        }
      }
    } else {
      let hubs = JSON.parse(localStorage.getItem("hubList"));
      setHubs(hubs);
      setLoader(true);
      let id = localStorage.getItem("hub");
      let hubDetails = JSON.parse(localStorage.getItem("hubDetails"));
      action(id, hubDetails);
      setSelectedHub(true);
      getDashboardStats();
      createSettings();

      // fetch all hub details and display on the dashboard
    }
  };

  const updateLogo = async () => {
    let validationStatus = true;
    setLogoModalLoader(true);
    if (typeof logoValue == "undefined") {
      setLogoError(true);
      setLogoModalLoader(false);
      validationStatus = false;
    }

    if (validationStatus) {
      let data = new FormData();
      let hubId = localStorage.getItem("hub");
      data.append("hub_id", hubId);
      data.append("type", "logo");
      data.append("value", logoValue);
      let response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}dashboard/hubs/settings/update`,
        data
      );

      if (response.data.status == "success") {
        setLogoModalLoader(false);
        setLogoModal(false);
        updateHubSettings(hubId);
      } else {
        setLogoModalLoader(false);
      }
    }
  };

  const updateLogoModal = () => {
    setLogoModal(true);
  };

  const getDashboardStats = async () => {
    let getHub = localStorage.getItem("hub");
    let response = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}dashboard/stats/${getHub}`
    );
    if (response.data.status == "success") {
      setDashboardStats(response.data.data);
    }
  };

  const showCreateHub = () => {
    setCreateHub(true);
  };
  const bootstrap = async () => {
    isLoggedIn();
    init();
  };

  const createSettings = async () => {
    let localSettings = JSON.parse(localStorage.getItem("hubDetails"));
    if (localSettings != undefined) {
      localSettings.settings["title"] = localSettings.name;
      localSettings.settings["description"] = localSettings.description;
      setSettings(localSettings.settings);
    }
  };

  const isLoggedIn = () => {
    // check if a user is logged in and redirect the user to the dashboard page
    let token = localStorage.getItem("token");
    if (token == undefined) {
      router("/");
    }
  };

  const fabStyle = {
    position: "fixed",
    bottom: 0,
    width: "75%",
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createNewHub = async () => {
    // validation is done here
    // handle inpute data
    setHubLoader(true);
    if (hubTitle.trim().length < 1) {
      setNewHubError((previous) => ({
        ...previous,
        name: "Name cant be empty",
      }));
    }

    if (hubDescription.trim().length < 1) {
      setNewHubError((previous) => ({
        ...previous,
        description: "Description cant be empty",
      }));
    }

    if (hubUrl.trim().length < 1) {
      setNewHubError((previous) => ({
        ...previous,
        url: "URL cant be empty",
      }));
    }

    if (
      hubDescription.trim().length < 1 ||
      hubUrl.trim().length < 1 ||
      hubDescription.trim().length < 1
    ) {
      setHubLoader(false);
      return;
    }

    let data = {
      name: hubTitle,
      hubDescription: hubDescription,
      url: hubUrl,
    };

    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };

    let response = axios.post(
      `${process.env.REACT_APP_BACKEND_API}hub/create`,
      data,
      { headers }
    );

    response
      .then((response) => {
        setHubLoader(false);
        if (response.data.status == "sucess") {
          // save new hub id in local storage
          localStorage.removeItem("hub");
          localStorage.removeItem("hubDetails");
          localStorage.removeItem("hubList");
          localStorage.setItem("newHub", response.data.data.id);
          // move user to new hub.

          window.location.reload();
        }
      })
      .catch((error) => {
        // Handle errors
        setHubLoader(false);
        Object.keys(error.response.data.message).map((keys) => {
          if (keys == "name") {
            setNewHubError((previous) => ({
              ...previous,
              name: error.response.data.message[keys][0],
            }));
          }

          if (keys == "url") {
            setNewHubError((previous) => ({
              ...previous,
              url: error.response.data.message[keys][0],
            }));
          }
        });
      });
  };

  const handleCloseCategory = () => {
    setOpenCategory(false);
  };

  const handleOpen = (id) => {
    setOpen(true);
    setCategoryId(id);
  };

  const viewContents = (item) => {
    setViewSelectedContents(item);
    setShowContentModal(true);
    console.log("item is working ", item);
  };

  const confirmDeleteContent = (item) => {
    setViewSelectedContents(item);
    setOpenDeleteContent(true);
  };

  const handleCloseDeleteContent = (item) => {
    setOpenDeleteContent(false);
  };

  const updateContent = (item) => {
    setViewSelectedContents(item);
    setUpdateContentState(true);
  };

  const handleOpenCategory = () => {
    setOpenCategory(true);
  };

  const createCategory = async () => {
    let creationStatus = true;

    if (title.trim().length < 1) {
      creationStatus = false;
      setCatTititleError(true);
    }

    if (creationStatus) {
      setCreateCategoryLoader(true);
      let data = {
        name: title,
        hub_id: localStorage.getItem("hub"),
      };
      setLoader(true);
      // after showing loader fetch every hub content
      let response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}create-category`,
        data
      );

      if (response.data.status == "success") {
        setCreateCategoryLoader(false);
        window.location.reload();
      }
    }
  };

  const action = async (id, details) => {
    setLoader(true);
    var newHubDetails = {};
    if (details) {
      if (details.settings instanceof Array) {
        await details.settings.map((item) => {
          if (item.name == "logo") {
            newHubDetails["logo"] = item;
          }
          if (item.name == "menu") {
            newHubDetails["menu"] = item;
          }
          if (item.name == "sportlight") {
            newHubDetails["sportlight"] = item;
          }
          if (item.name == "search") {
            newHubDetails["search"] = item;
          }
          if (item.name == "content") {
            newHubDetails["content"] = item;
          }
          if (item.name == "topten") {
            newHubDetails["topten"] = item;
          }
          if (item.name == "category") {
            newHubDetails["category"] = item;
          }
          if (item.name == "background") {
            newHubDetails["background"] = item;
          }
          if (item.name == "background") {
            newHubDetails["background"] = item;
          }
          if (item.name == "registration") {
            newHubDetails["registration"] = item;
          }
        });
        newHubDetails["title"] = details.name;
        newHubDetails["description"] = details.description;
        details.settings = newHubDetails;

        localStorage.setItem("hubDetails", JSON.stringify(details));
        setSettings(details.settings);
      }
    }

    // lets have a 3 seconsd delay for info to set
    let response = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}category-content/${id}`
    );

    if (response.data.status == "success") {
      // save state which would be used to display the list of hubs
      // set the dashboad to show modal and display the list of hubs for that user
      setCategories(response.data.data);
      setLoader(false);
      localStorage.setItem("hub", id);
      //localStorage.setItem("hub", id);

      setSelectedHub(true);
    } else {
      setCategories([]);
    }
  };

  const content = (type, content) => {
    switch (type) {
      case "pdf":
        return (
          <iframe
            src={`${process.env.REACT_APP_DOCUMENTS}${content}`}
            //src={"https://research.google.com/pubs/archive/44678.pdf"}
            allowFullScreen
            className="w-[100%] h-[400px]"
          ></iframe>
        );
      case "engagement":
        return "abc";
      default:
        if (type == "link") {
          return <ReactPlayer width={"100%"} url={content} controls={true} />;
        } else {
          return (
            <ReactPlayer
              width={"100%"}
              url={`${process.env.REACT_APP_DOCUMENTS}${content}`}
              controls={true}
            />
          );
        }
    }
  };

  const deleteContent = async (item) => {
    // delete content here
    setDeleteLoader(true);
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}content/delete/${viewSelectedContents.id}`,
        {}
      );
      if (response.data.satus == "success") {
        console.log("item has being removed");
        let hub = localStorage.getItem("hub");
        action(parseInt(hub));
        setDeleteLoader(false);
        setOpenDeleteContent(false);
      } else {
        setDeleteLoader(false);
        setOpenDeleteContent(false);
      }
      //setCreatedCounter((previousState) => previousState + 1);
      window.location.reload();
    } catch (e) {
      setDeleteLoader(false);
      setOpenDeleteContent(false);
      console.log("sorry no internet");
    }

    //response.catch()
  };

  const setCreated = () => {
    window.location.reload();
  };

  const updateHubSettings = async (id) => {
    let data = await axios
      .get(`${process.env.REACT_APP_BACKEND_API}gethubsettings/${id}`)
      .then(async (res) => {
        let newHubDetails = {};
        await res.data.data.map((item) => {
          if (item.name == "logo") {
            newHubDetails["logo"] = item;
          }
          if (item.name == "menu") {
            newHubDetails["menu"] = item;
          }
          if (item.name == "sportlight") {
            newHubDetails["sportlight"] = item;
          }
          if (item.name == "search") {
            newHubDetails["search"] = item;
          }
          if (item.name == "content") {
            newHubDetails["content"] = item;
          }
          if (item.name == "category") {
            newHubDetails["category"] = item;
          }
          if (item.name == "background") {
            newHubDetails["background"] = item;
          }
          if (item.name == "background") {
            newHubDetails["background"] = item;
          }
          if (item.name == "registration") {
            newHubDetails["registration"] = item;
          }
          if (item.name == "topten") {
            newHubDetails["topten"] = item;
          }
        });

        //details.settings = newHubDetails;
        let savedHubDetails = JSON.parse(localStorage.getItem("hubDetails"));
        newHubDetails["title"] = savedHubDetails.settings.title;
        newHubDetails["description"] = savedHubDetails.settings.description;
        savedHubDetails["settings"] = newHubDetails;

        localStorage.setItem("hubDetails", JSON.stringify(savedHubDetails));
        setSettings(savedHubDetails.settings);
        window.location.reload();
      })
      .catch((error) => {});

    // use content to update both state and local storage
  };

  const editCategory = (item) => {
    //show modal here
    setUpdateCategoryTitleState(item.name);
    setUpdateCategoryId(item.id);
    setOpenEditCategory(true);
    setUpdateCategoryTitleError(false);
  };

  const showRegistrationSettings = (data) => {
    // get hub id fromthe local storage
    let hub = localStorage.getItem("hub");
    // check the status of the registration
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}registion-status/${hub}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.data.status == 0) {
          // show modal
          setRegistrationSettings(true);
        } else {
          activateRegistrationSettings();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //console.log(data);
    //setRegistrationSettings(true);
  };

  const updateCategoryTitle = () => {
    // check that the category name is not empty
    if (updateCategoryTitleState.length < 1) {
      setUpdateCategoryTitleError(true);
      return;
    }
    // start the modal loader
    setLogoModalLoader(true);
    // tun axios command to update category
    let data = { name: updateCategoryTitleState };
    let id = updateCategoryId;
    let url = `${process.env.REACT_APP_BACKEND_API}update-category/${id}`;
    axios
      .post(url, data)
      .then((res) => {
        setLogoModalLoader(false);
        if (res.data.status == "success") {
          window.location.reload();
        }
      })
      .catch((error) => {
        setLogoModalLoader(false);
      });
  };

  const addRegistrationCustomField = () => {
    let newCustomField = { name: "", type: "string" };
    setRegistrationFieldData((previous) => [...previous, newCustomField]);
  };

  const removeRegistrationCustomField = (indexToDelete) => {
    let customField = [...registrationFieldData];
    const customFieldAfterDelete = [
      ...customField.slice(0, indexToDelete),
      ...customField.slice(indexToDelete + 1),
    ];
    setRegistrationFieldData(customFieldAfterDelete);
  };

  const updateCustomFieldValue = (value, index) => {
    let customField = [...registrationFieldData];
    customField[index].name = value;
    setRegistrationFieldData(customField);
    console.log("customField", customField);
  };

  const renderRegistrationSettings = () => {
    switch (registrationFieldSettingsStage) {
      case 1:
        return renderRegistrationSettingsCase1();
      case 2:
        return renderRegistrationSettingsCase2();
    }
  };

  const renderRegistrationSettingsCase1 = () => {
    return (
      <div>
        <div className="flex justify-center ">
          <h1 className="text-[25px]">Configure Registration</h1>
        </div>
        <div className="justify-center mt-6  ">
          <div className="w-[100%]">
            <TextInput
              disabled
              label="Required"
              value={"Full Name"}
              onChange={(e) => {
                setUpdateCategoryTitleState(e.target.value);
                setUpdateCategoryTitleError(false);
              }}
              inputProps={{
                style: {
                  fontFamily: "Arial",
                  webkitTextFillColor: "white",
                },
              }}
              style={{ flex: 1 }}
              maxRows={10}
              sx={{
                "& .MuiFormLabel-root": {
                  color: "red",
                  backgroundColor: "red",
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "red",
                  backgroundColor: "red",
                },
                "&.MuiFormLabel-root.Mui-disabled": {
                  color: "gray", // Change the font color of disabled label here
                },
              }}
            />
          </div>
          <div className="w-[100%]">
            <TextInput
              disabled
              label="Required"
              value={"Email"}
              onChange={(e) => {
                setUpdateCategoryTitleState(e.target.value);
                setUpdateCategoryTitleError(false);
              }}
              inputProps={{
                style: {
                  fontFamily: "Arial",
                  webkitTextFillColor: "white",
                },
              }}
              style={{ flex: 1 }}
              maxRows={10}
              sx={{
                "& .MuiFormLabel-root": {
                  color: "red",
                  backgroundColor: "red",
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "red",
                  backgroundColor: "red",
                },
                "&.MuiFormLabel-root.Mui-disabled": {
                  color: "gray", // Change the font color of disabled label here
                },
              }}
            />
          </div>
          <div className="w-[100%]">
            <TextInput
              disabled
              label="Required"
              value={"Password"}
              onChange={(e) => {
                setUpdateCategoryTitleState(e.target.value);
                setUpdateCategoryTitleError(false);
              }}
              inputProps={{
                style: {
                  fontFamily: "Arial",
                  webkitTextFillColor: "white",
                },
              }}
              style={{ flex: 1 }}
              maxRows={10}
              sx={{
                "& .MuiFormLabel-root": {
                  color: "red",
                  backgroundColor: "red",
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "red",
                  backgroundColor: "red",
                },
                "&.MuiFormLabel-root.Mui-disabled": {
                  color: "gray", // Change the font color of disabled label here
                },
              }}
            />
          </div>
        </div>
        {registrationFieldData.length < 1 ? (
          <div>
            <ActionButton
              handleClick={addRegistrationCustomField}
              withBG={true}
            >
              Add Custom Field
            </ActionButton>
          </div>
        ) : (
          <div>
            {registrationFieldData.map((value, index) => (
              <div className="flex w-[100%] justify-between">
                <div className="w-[90%]">
                  <TextInput
                    label="Field Name"
                    onChange={(e) => {
                      updateCustomFieldValue(e.target.value, index);
                    }}
                    inputProps={{
                      style: {
                        fontFamily: "Arial",
                        webkitTextFillColor: "white",
                      },
                    }}
                    style={{ flex: 1 }}
                    maxRows={10}
                    sx={{
                      "& .MuiFormLabel-root": {
                        color: "red",
                        backgroundColor: "red",
                      },
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: "red",
                        backgroundColor: "red",
                      },
                      "&.MuiFormLabel-root.Mui-disabled": {
                        color: "gray", // Change the font color of disabled label here
                      },
                    }}
                  />
                </div>
                <div className="flex justify-between">
                  <div className="w-[40%]" onClick={addRegistrationCustomField}>
                    add
                  </div>
                  <div
                    className="w-[40%]"
                    onClick={() => removeRegistrationCustomField(index)}
                  >
                    {" "}
                    remove
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end mt-6 ">
          <ActionButton handleClick={registrationNextStep} withBG={true}>
            Next
          </ActionButton>
        </div>
      </div>
    );
  };

  const renderRegistrationSettingsCase2 = () => {
    return (
      <div>
        <div className="flex justify-center ">
          <h1 className="text-[25px]">Configure Subscription </h1>
        </div>
        <div className="justify-center mt-6  ">
          <TextInput
            type="select"
            value={withPayment}
            options={option}
            label="Charge Subscribers"
            onChange={(e) => selectOption(e)}
          />
        </div>
        {withPayment == "yes" && (
          <div>
            <div className="justify-center mt-6  ">
              <TextInput
                type="select"
                options={paymentTenure}
                label="Subscription Frequency"
                onChange={(e) => setTenure(e.target.value)}
              />
            </div>

            <div className="justify-center mt-6  ">
              <TextInput
                label="Amount"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                inputProps={{
                  style: {
                    fontFamily: "Arial",
                    webkitTextFillColor: "white",
                  },
                }}
                style={{ flex: 1 }}
                maxRows={10}
                sx={{
                  "& .MuiFormLabel-root": {
                    color: "red",
                    backgroundColor: "red",
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "red",
                    backgroundColor: "red",
                  },
                  "&.MuiFormLabel-root.Mui-disabled": {
                    color: "gray", // Change the font color of disabled label here
                  },
                }}
              />
            </div>
          </div>
        )}
        <div className="flex justify-end ">
          <div className="flex  mt-6 justify-between w-[35%]">
            <div>
              <ActionButton
                handleClick={registrationPrevStep}
                withBorder={true}
              >
                Back
              </ActionButton>
            </div>
            <div>
              {!logoModalLoader ? (
                <ActionButton
                  handleClick={activateRegistrationSettings}
                  withBG={true}
                >
                  Activate
                </ActionButton>
              ) : (
                <ActionButton withBG={true}>
                  <div className="flex justify-between ">
                    <div>Activating</div>
                    <div className="pl-[10px]">
                      <CircularProgress className="text-[#000]" size={20} />{" "}
                    </div>
                  </div>
                </ActionButton>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const registrationPrevStep = () => {
    let step = registrationFieldSettingsStage;
    step -= 1;
    setRegistrationFieldSettingsStage(step);
  };
  const registrationNextStep = () => {
    let step = registrationFieldSettingsStage;
    step += 1;
    setRegistrationFieldSettingsStage(step);
  };

  const activateRegistrationSettings = () => {
    // DOnt forget to effect validation
    let hubId = localStorage.getItem("hub");
    let data = {
      hub_id: localStorage.getItem("hub"),
      structure: JSON.stringify(registrationFieldData),
      with_payment: withPayment,
      tenure: tenure,
      primary_amount: amount,
    };
    let url = `${process.env.REACT_APP_BACKEND_API}register-settings-create`;
    axios
      .post(url, data)
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          updateHubSettings(hubId);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const selectOption = (e) => {
    if (e.target.value == "no") {
      setAmount(0);
      setTenure("one off");
    }
    setWithPayment(e.target.value);
  };

  const showSubscribersSettings = () => {
    // show modal with a loader till content is done loading
    setRegistrationSettingsDetailsModal(true);
    let hubId = localStorage.getItem("hub");
    let url = `${process.env.REACT_APP_BACKEND_API}register-settings-view`;
    axios
      .get(`${url}/${hubId}`)
      .then((res) => {
        if (res.data.status == "success") {
          setRegistrationSettingsDetails(
            res.data.data.create_hub_registration_settings
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showSubscribers = () => {
    setSubscribersModal(true);
    let hubId = localStorage.getItem("hub");
    let url = `${process.env.REACT_APP_BACKEND_API}get-hub-subscribers`;
    axios
      .get(`${url}/${hubId}`)
      .then((res) => {
        console.log(res.data.data);
        setSubscribers(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderRegistrationSettingsDetails = () => {
    return (
      <div>
        <div className="flex justify-center ">
          <h1 className="text-[25px]">Registration Required Fields</h1>
        </div>
        <div className="justify-center mt-6  ">
          <div className="w-[100%]">
            <TextInput
              disabled
              label="Required"
              value={"Full Name"}
              onChange={(e) => {
                setUpdateCategoryTitleState(e.target.value);
                setUpdateCategoryTitleError(false);
              }}
              inputProps={{
                style: {
                  fontFamily: "Arial",
                  webkitTextFillColor: "white",
                },
              }}
              style={{ flex: 1 }}
              maxRows={10}
              sx={{
                "& .MuiFormLabel-root": {
                  color: "red",
                  backgroundColor: "red",
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "red",
                  backgroundColor: "red",
                },
                "&.MuiFormLabel-root.Mui-disabled": {
                  color: "gray", // Change the font color of disabled label here
                },
              }}
            />
          </div>
          <div className="w-[100%]">
            <TextInput
              disabled
              label="Required"
              value={"Email"}
              onChange={(e) => {
                setUpdateCategoryTitleState(e.target.value);
                setUpdateCategoryTitleError(false);
              }}
              inputProps={{
                style: {
                  fontFamily: "Arial",
                  webkitTextFillColor: "white",
                },
              }}
              style={{ flex: 1 }}
              maxRows={10}
              sx={{
                "& .MuiFormLabel-root": {
                  color: "red",
                  backgroundColor: "red",
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "red",
                  backgroundColor: "red",
                },
                "&.MuiFormLabel-root.Mui-disabled": {
                  color: "gray", // Change the font color of disabled label here
                },
              }}
            />
          </div>
          <div className="w-[100%]">
            <TextInput
              disabled
              label="Required"
              value={"Password"}
              onChange={(e) => {
                setUpdateCategoryTitleState(e.target.value);
                setUpdateCategoryTitleError(false);
              }}
              inputProps={{
                style: {
                  fontFamily: "Arial",
                  webkitTextFillColor: "white",
                },
              }}
              style={{ flex: 1 }}
              maxRows={10}
              sx={{
                "& .MuiFormLabel-root": {
                  color: "red",
                  backgroundColor: "red",
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "red",
                  backgroundColor: "red",
                },
                "&.MuiFormLabel-root.Mui-disabled": {
                  color: "gray", // Change the font color of disabled label here
                },
              }}
            />
          </div>
        </div>
        <div>
          {registrationSettingsDetails?.hub_registration_setting_fields?.map(
            (value, index) => (
              <div className="flex w-[100%] justify-between">
                <div className="w-[90%]">
                  <TextInput
                    disabled
                    label="Required"
                    value={value.name}
                    inputProps={{
                      style: {
                        fontFamily: "Arial",
                        webkitTextFillColor: "white",
                      },
                    }}
                    style={{ flex: 1 }}
                    maxRows={10}
                    sx={{
                      "& .MuiFormLabel-root": {
                        color: "red",
                        backgroundColor: "red",
                      },
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: "red",
                        backgroundColor: "red",
                      },
                      "&.MuiFormLabel-root.Mui-disabled": {
                        color: "gray", // Change the font color of disabled label here
                      },
                    }}
                  />
                </div>
              </div>
            )
          )}
        </div>

        <div>
          <ActionButton handleClick={addRegistrationCustomField} withBG={true}>
            Subscription Details
          </ActionButton>
        </div>
        <div className="mt-6  ">
          <table className="min-w-full divide-y  divide-gray-200 text-[#000]">
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">With Payment :</th>
                <td className="px-6 py-4 whitespace-nowrap">
                  {" "}
                  {registrationSettingsDetails.with_payment}
                </td>
              </tr>
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Tenure :</th>
                <td className="px-6 py-4 whitespace-nowrap">
                  {" "}
                  {registrationSettingsDetails.tenure}
                </td>
              </tr>
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Amount :</th>
                <td className="px-6 py-4 whitespace-nowrap">
                  {" "}
                  {registrationSettingsDetails.primary_amount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderSubscribers = () => {
    return (
      <div className="overflow-x-auto">
        <div className="flex justify-center ">
          <h1 className="text-[25px]">Subscribers</h1>
        </div>
        <table className="table-auto min-w-full border-collapse border border-gray-300 text-center ">
          <thead className="bg-gray-100 text-[#DCD427]">
            <tr>
              <th className="px-4 py-2">SN</th>
              <th className="px-4 py-2">NAME</th>
              <th className="px-4 py-2">EMAIL</th>
              <th className="px-4 py-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((value, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0 ? "bg-[black]" : "bg-white text-[black] "
                }
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{value.subscriber.name}</td>
                <td className="px-4 py-2">{value.subscriber.email}</td>
                <td className="px-4 py-2">
                  <VisibilityIcon className="bg-[#DCD427] hover:bg-[#B9B009] text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <main className="flex">
      <Snackbar
        open={showSnack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={() => setShowSnack(false)}
        message="Note archived"
      >
        <Alert
          onClose={() => setShowSnack(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          This is a success Alert inside a Snackbar!
        </Alert>
      </Snackbar>

      <AppModal
        open={subscribersModal}
        handleClose={() => setSubscribersModal(false)}
      >
        <div className="">
          {subscribers.length > 0 ? (
            <div>{renderSubscribers()}</div>
          ) : (
            <div className="flex justify-center items-center h-[300px]">
              <CircularProgress style={{ color: "#fff" }} size={50} />{" "}
            </div>
          )}
        </div>
      </AppModal>

      <AppModal
        open={registrationSettingsDetailsModal}
        handleClose={() => setRegistrationSettingsDetailsModal(false)}
      >
        <div className="">
          {Object.keys(registrationSettingsDetails).length > 0 ? (
            <div>{renderRegistrationSettingsDetails()}</div>
          ) : (
            <div className="flex justify-center items-center h-[300px]">
              <CircularProgress style={{ color: "#fff" }} size={50} />{" "}
            </div>
          )}
        </div>
      </AppModal>

      <AppModal
        open={registrationSettings}
        handleClose={() => setRegistrationSettings(false)}
      >
        <div>{renderRegistrationSettings()}</div>
      </AppModal>

      <AppModal
        open={openEditCategory}
        handleClose={() => setOpenEditCategory(false)}
      >
        <div>
          <div className="flex justify-center ">
            <h1 className="text-[25px]">Update Category</h1>
          </div>
          <div className="flex justify-center mt-6  ">
            <div className="w-[100%]">
              <TextInput
                error={updateCategoryTitleError}
                id="outlined-multiline-flexible"
                label="Category Name"
                value={updateCategoryTitleState}
                onChange={(e) => {
                  setUpdateCategoryTitleState(e.target.value);
                  setUpdateCategoryTitleError(false);
                }}
                inputProps={{
                  style: { fontFamily: "Arial", color: "white" },
                }}
                style={{ flex: 1, color: "white" }}
                maxRows={10}
                sx={{
                  "& .MuiFormLabel-root": {
                    color: "white",
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "white",
                  },
                }}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6 ">
            {!logoModalLoader ? (
              <ActionButton handleClick={updateCategoryTitle} withBG={true}>
                Update
              </ActionButton>
            ) : (
              <ActionButton withBG={true}>
                <div className="flex justify-between ">
                  <div>Update</div>
                  <div className="pl-[10px]">
                    <CircularProgress className="text-[#000]" size={20} />{" "}
                  </div>
                </div>
              </ActionButton>
            )}
          </div>
        </div>
      </AppModal>
      <AppModal open={createHub} handleClose={() => setCreateHub(false)}>
        {refreshLoader ? (
          <div>
            <div className="flex justify-center">
              <Typography variant="h4" className="mb-4">
                Switching to new hub
              </Typography>
              <CircularProgress />
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-center">
              <Typography variant="h4" className="mb-4">
                Create Hub
              </Typography>
            </div>
            <div className="flex justify-between">
              <div className="w-[45%]">
                {newHubError.name}
                <TextInput
                  error={newHubError.name.length > 0 ? true : false}
                  id="outlined-multiline-flexible"
                  label="Hub Name"
                  onChange={(e) => {
                    setHubTitle(e.target.value);
                    setNewHubError((previous) => ({
                      ...previous,
                      name: "",
                    }));
                  }}
                  inputProps={{
                    style: { fontFamily: "Arial", color: "white" },
                  }}
                  style={{ flex: 1, color: "white" }}
                  maxRows={10}
                  sx={{
                    "& .MuiFormLabel-root": {
                      color: "white",
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: "white",
                    },
                  }}
                />
              </div>
              <div className="w-[45%] ">
                <div>{newHubError.url}</div>
                <div className="w-[100%] flex ">
                  <div className="w-[65%]">
                    <TextInput
                      id="outlined-multiline-flexible"
                      error={newHubError.url.length > 0 ? true : false}
                      label="Hub Url Name"
                      onChange={(e) => {
                        setHubUrl(e.target.value);
                        setNewHubError((previous) => ({
                          ...previous,
                          url: "",
                        }));
                      }}
                      inputProps={{
                        style: { fontFamily: "Arial", color: "white" },
                      }}
                      style={{ flex: 1, color: "white" }}
                      maxRows={10}
                      sx={{
                        "& .MuiFormLabel-root": {
                          color: "white",
                        },
                        "& .MuiFormLabel-root.Mui-focused": {
                          color: "white",
                        },
                      }}
                    />
                  </div>
                  <div
                    style={{
                      borderColor: newHubError.url.length > 0 ? "red" : "#fff",
                    }}
                    className="grid justify-center content-center w-[35%] border-l-[0px] border-[1px] rounded-r mt-2 h-[56px] border-solid"
                  >
                    <div>.Hubeei.com</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                {newHubError.description}
                <TextInput
                  error={newHubError.description.length > 0 ? true : false}
                  id="outlined-multiline-flexible"
                  label="Description"
                  onChange={(e) => {
                    setHubDescription(e.target.value);
                    setNewHubError((previous) => ({
                      ...previous,
                      description: "",
                    }));
                  }}
                  multiline
                  inputProps={{
                    style: { fontFamily: "Arial", color: "white" },
                  }}
                  style={{ flex: 1, color: "white" }}
                  maxRows={10}
                  sx={{
                    "& .MuiFormLabel-root": {
                      color: "white",
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: "white",
                    },
                  }}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <div>
                <ActionButton handleClick={createNewHub} withBG={true}>
                  <div className="flex justify-between">
                    <div>Create</div>
                    {hubLoader ? (
                      <div>
                        <CircularProgress className="text-[#000]" size={20} />
                      </div>
                    ) : null}
                  </div>
                </ActionButton>
              </div>
            </div>
          </div>
        )}
      </AppModal>
      <AppModal open={logoModal} handleClose={() => setLogoModal(false)}>
        <div>
          <div className="flex justify-center ">
            <h1 className="text-[25px]">Update Logo</h1>
          </div>
          <div className="flex justify-center mt-6  ">
            <div className="w-[100%]">
              <UploadButton
                accept="image/*"
                handleOnChange={(e) => setLogoValue(e.target.files[0])}
                text="Chose Your Logo"
                error={logoError}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6 ">
            {!logoModalLoader ? (
              <ActionButton handleClick={updateLogo} withBG={true}>
                Update
              </ActionButton>
            ) : (
              <ActionButton withBG={true}>
                <div className="flex justify-between ">
                  <div>Update</div>
                  <div className="pl-[10px]">
                    <CircularProgress className="text-[#000]" size={20} />{" "}
                  </div>
                </div>
              </ActionButton>
            )}
          </div>
        </div>
      </AppModal>
      <Dialog
        open={openDeleteContent}
        onClose={handleCloseDeleteContent}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this content ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteContent}>Close</Button>
          <Button onClick={deleteContent} autoFocus>
            <div className="flex justify-between">
              <div>Delete</div>
              {deleteLoader ? (
                <div>
                  <CircularProgress
                    size={20}
                    sx={{
                      color: "red",
                      zIndex: 1,
                    }}
                  />
                </div>
              ) : null}
            </div>
          </Button>
        </DialogActions>
      </Dialog>
      <AppModal open={open} handleClose={handleClose}>
        <CategoryContent categoryId={categoryId} created={setCreated} />
      </AppModal>
      <AppModal
        open={updateContentState}
        handleClose={() => setUpdateContentState(false)}
      >
        <UpdateContent data={viewSelectedContents} />
      </AppModal>
      <AppModal
        open={showContentModal}
        handleClose={() => setShowContentModal(false)}
      >
        <div className="w-[100%]">
          <div className="w-[100%] text-center mb-4">
            <h2 className="text-[50px]">{viewSelectedContents.name}</h2>
          </div>
          <div>
            {content(
              viewSelectedContents.content_type,
              viewSelectedContents.content
            )}
          </div>
          <div className="flex justify-end mt-2">
            <div className="flex px-2 justify-between rounded-full border-2 border-[#DCD427] min-w-[70px]">
              <div>
                <VisibilityIcon className="text-[#DCD427]" />
              </div>
              <div>{viewSelectedContents.views}</div>
            </div>
            <div className="flex px-2 justify-between rounded-full border-2 border-[#DCD427] min-w-[70px] mx-4  ">
              <div>
                <FavoriteIcon className="text-[#DCD427]" />
              </div>
              <div>0</div>
            </div>
            {viewSelectedContents.sportlight > 0 ?? (
              <div>
                <StarRateIcon className="text-[#DCD427]" />
              </div>
            )}
          </div>
          <div className="mt-4 ">
            <div>
              <h1 className="mt-2 text-[#DCD427] text-[28px] font-roboto">
                Description
              </h1>
            </div>
            <div className="text-[22px] font-roboto">
              {viewSelectedContents.content_description}
            </div>
          </div>

          <div>list of likes</div>
          <div>engagement</div>
        </div>
      </AppModal>
      <AppModal open={!selectedHub}>
        {!loader ? (
          <div>
            <div>
              <h1 className="text-[40px] mb-10 text-center">Select Your Hub</h1>
            </div>
            <div className="flex gap-4 justify-between flex-wrap">
              {hubs.map((value) => {
                return (
                  <DashboardHubs
                    title={value.name}
                    action={() => action(value.id, value)}
                    image={value?.settings[0]?.value}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div>loading hub content </div>
        )}
      </AppModal>
      <AppModal open={openCategory} handleClose={handleCloseCategory}>
        <div className="flex justify-center ">
          <h1 className="text-[25px]">Create New Category</h1>
        </div>
        <div className="flex justify-center mt-6  ">
          <div className="w-[100%]">
            <TextInput
              fullWidth
              id="outlined-multiline-flexible"
              label="Title"
              error={catTititleError}
              inputProps={{
                style: { fontFamily: "Arial", color: "white" },
              }}
              style={{ flex: 1, color: "white" }}
              onChange={(e) => setTitle(e.target.value)}
              sx={{
                "& .MuiFormLabel-root": {
                  color: "white",
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "white",
                },
              }}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 ">
          {!createCategoryLoader ? (
            <ActionButton handleClick={createCategory} withBG={true}>
              {" "}
              Create
            </ActionButton>
          ) : (
            <ActionButton withBG={true}>
              <div className="flex justify-between ">
                <div>Create</div>
                <div className="pl-[10px]">
                  <CircularProgress className="text-[#000]" size={20} />{" "}
                </div>
              </div>
            </ActionButton>
          )}
        </div>
      </AppModal>
      {selectedHub ? (
        <div className="flex w-[100%]">
          <div className="hidden lg:block w-[20%] h-[100vh] ">
            {Object.keys(settings).length > 0 ? (
              <div>
                <Sidebar
                  hubList={hubs}
                  showCreateHub={showCreateHub}
                  setting={settings}
                  updateLogo={updateLogoModal}
                  showRegistrationSettings={showRegistrationSettings}
                  updateSettingsRefresh={updateHubSettings}
                  showSubscribersSettings={showSubscribersSettings}
                  showSubscribers={showSubscribers}
                />
              </div>
            ) : null}
          </div>
          <div className="w-[100%] lg:w-[78%] pl-[30px] mt-4">
            <div className="w-[100%] lg:flex justify-between">
              {dashboardStats.length > 0
                ? dashboardStats.map((item) => (
                    <div className="w-[100%] lg:w-[30%] mt-4 lg:mt-0">
                      <DashboardCard title={item.title} value={item.count} />
                    </div>
                  ))
                : null}
            </div>
            <div className="mt-4 h-[59vh] overflow-auto">
              {categories.length > 0 ? (
                <KanbanBoard
                  categories={categories}
                  handleCreateNewContent={handleOpen}
                  viewContents={viewContents}
                  deleteContent={confirmDeleteContent}
                  updateContent={updateContent}
                  editCategory={editCategory}
                />
              ) : (
                <div className="flex items-center justify-center h-screen round ">
                  <button
                    className="absolute  m-4 bg-[#DCD427] w-[100px] h-[100px] rounded-full beacon-button"
                    onClick={() => handleOpenCategory()}
                  >
                    <AddIcon
                      style={{ fontSize: 36 }}
                      className="text-[#000] w-12 h-12"
                    />
                  </button>
                </div>
              )}
            </div>

            {categories.length > 0 ? (
              <div
                id="fabs"
                style={fabStyle}
                aria-label="add"
                className="bg-[#DCD427] relative flex flex-column h-[50px] justify-center rounded "
              >
                <div className="bg-[#000] absolute bottom-[15px] rounded-full h-[100px] w-[100px] flex  justify-center items-center ">
                  <Tooltip title="Create Category">
                    <AddCircleRoundedIcon
                      onClick={() => handleOpenCategory()}
                      className="text-[#DCD427] cursor-pointer "
                      style={{ fontSize: "60px" }}
                    />
                  </Tooltip>
                </div>
                <div className="mt-7 text-[#000] font-bold">
                  Create Category
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </main>
  );
}
