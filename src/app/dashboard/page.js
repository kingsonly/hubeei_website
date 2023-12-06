"use client";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import KanbanBoard from "@/components/Kanban/KanbanBoard";
import Sidebar from "@/components/SideBar/SideBar";
import { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AppModal from "@/components/modalcomponent/AppModal";
import { styled } from "@mui/system";
import ActionButton from "@/components/ActionButton";
import CategoryContent from "@/components/CategoryContent/CategoryContent";
import { useEffect } from "react";
import axios from "axios";
import DashboardHubs from "@/components/Dashboard/DashboardHubs";
import TextInput from "@/components/InputComponent/TextInput";
import ReactPlayer from "react-player";
import StarRateIcon from "@mui/icons-material/StarRate";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UpdateContent from "@/components/UpdateContentComponent/UpdateContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import { CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import Tooltip from "@mui/material/Tooltip";
import UploadButton from "@/components/InputComponent/UploadButton";
import Engagement from "@/components/Engagement/Engagement";
export default function Page() {
  const router = useRouter();
  const [selectedHub, setSelectedHub] = useState(false);
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
  const [logoModalLoader, setLogoModalLoader] = useState(false);
  const [logoValue, setLogoValue] = useState();

  useEffect(() => {
    bootstrap();
  }, []);

  const init = async () => {
    // there is no selected hub in the local storage , then get a list of all the hubs
    let getHub = localStorage.getItem("hub");
    if (getHub == undefined) {
      let userData = JSON.parse(localStorage.getItem("userData"));
      if (userData != undefined) {
        let userId = userData.id;
        let response = await axios.get(
          `https://api.hubeei.skillzserver.com/api/usershub/${userId}`
        );

        if (response.data.status == "success") {
          // save state which would be used to display the list of hubs
          // set the dashboad to show modal and display the list of hubs for that user
          setHubs(response.data.data);

          localStorage.setItem("hubList", JSON.stringify(response.data.data));
          let id = localStorage.getItem("hub");
          let hubDetails = JSON.parse(localStorage.getItem("hubDetails"));
          action(id, hubDetails);
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
      // fetch all hub details and display on the dashboard
    }
  };

  const updateLogo = async () => {
    setLogoModalLoader(true);
    let data = new FormData();
    let hubId = localStorage.getItem("hub");

    data.append("hub_id", hubId);
    data.append("type", "logo");
    data.append("value", logoValue);
    let response = await axios.post(
      "https://api.hubeei.skillzserver.com/api/dashboard/hubs/settings/update",
      data
    );

    if (response.data.status == "success") {
      setLogoModalLoader(false);
      setLogoModal(false);
    } else {
      setLogoModalLoader(false);
    }
  };
  const updateLogoModal = () => {
    setLogoModal(true);
  };

  const getDashboardStats = async () => {
    let getHub = localStorage.getItem("hub");
    let response = await axios.get(
      `https://api.hubeei.skillzserver.com/api/dashboard/stats/${getHub}`
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
    let localSettings = JSON.parse(localStorage.getItem("hubDetails"));
    localSettings.settings["title"] = localSettings.name;
    localSettings.settings["description"] = localSettings.description;
    setSettings(localSettings.settings);
  };

  const isLoggedIn = () => {
    // check if a user is logged in and redirect the user to the dashboard page
    let token = localStorage.getItem("token");
    if (token == undefined) {
      router.push("/");
    }
  };

  const fabStyle = {
    position: "fixed",
    bottom: 150,
    right: 16,
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createNewHub = async () => {
    // validation is done here
    // handle inpute data
    setHubLoader(true);
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
      `https://api.hubeei.skillzserver.com/api/hub/create`,
      data,
      { headers }
    );

    response
      .then((response) => {
        setHubLoader(false);
        if (response.data.status == "sucess") {
          // save new hub id in local storage
          localStorage.setItem("hub", response.data.data.id);
          // move user to new hub.
          setRefreshLoader(true);
          window.location.reload();
        }
      })
      .catch((error) => {
        // Handle errors
        setHubLoader(false);
        console.error("Error fetching data:", error);
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
    setCreateCategoryLoader(true);
    let data = {
      name: title,
      hub_id: localStorage.getItem("hub"),
    };
    setLoader(true);
    // after showing loader fetch every hub content
    let response = await axios.post(
      `https://api.hubeei.skillzserver.com/api/create-category`,
      data
    );

    if (response.data.status == "success") {
      setCreateCategoryLoader(false);
      window.location.reload();
    }
  };

  const action = async (id, details) => {
    setLoader(true);

    if (details) {
      let newHubDetails = {};
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
          if (item.name == "category") {
            newHubDetails["category"] = item;
          }
          if (item.name == "category") {
            newHubDetails["category"] = item;
          }
          if (item.name == "backgound") {
            newHubDetails["backgound"] = item;
          }
          if (item.name == "backgound") {
            newHubDetails["backgound"] = item;
          }
          if (item.name == "registration") {
            newHubDetails["registration"] = item;
          }
          console.log(newHubDetails);
        });
        details.settings = newHubDetails;

        localStorage.setItem("hubDetails", JSON.stringify(details));
      }
    }

    // after showing loader fetch every hub content
    let response = await axios.get(
      `https://api.hubeei.skillzserver.com/api/category-content/${id}`
    );

    if (response.data.status == "success") {
      // save state which would be used to display the list of hubs
      // set the dashboad to show modal and display the list of hubs for that user
      setCategories(response.data.data);
      setLoader(false);
      localStorage.setItem("hub", id);

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
            src={`https://api.hubeei.skillzserver.com/public${content}`}
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
              url={`https://api.hubeei.skillzserver.com/public${content}`}
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
        `https://api.hubeei.skillzserver.com/api/content/delete/${viewSelectedContents.id}`,
        {}
      );
      if (response.data.satus == "success") {
        console.log("item hase being removed");
        let hub = localStorage.getItem("hub");
        action(parseInt(hub));
        setDeleteLoader(false);
        setOpenDeleteContent(false);
      } else {
        setDeleteLoader(false);
        setOpenDeleteContent(false);
        console.log("something went wrong");
      }
    } catch (e) {
      setDeleteLoader(false);
      setOpenDeleteContent(false);
      console.log("sorry no internet");
    }

    //response.catch()
  };

  return (
    <main className="flex">
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
                <TextInput
                  id="outlined-multiline-flexible"
                  label="Hub Name"
                  onChange={(e) => setHubTitle(e.target.value)}
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
              <div className="w-[45%] flex ">
                <div className="w-[65%]">
                  <TextInput
                    id="outlined-multiline-flexible"
                    label="Hub Url"
                    onChange={(e) => setHubUrl(e.target.value)}
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
                <div className="grid justify-center content-center w-[35%] border-l-[0px] border-[1px] rounded mt-2 h-[55px] border-solid border-[#fff]">
                  <div>.Hubeei.com</div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <TextInput
                  id="outlined-multiline-flexible"
                  label="Description"
                  onChange={(e) => setHubDescription(e.target.value)}
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
        <CategoryContent categoryId={categoryId} />
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
          <div className="mt-4">
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
            <div className="flex justify-between">
              {hubs.map((value) => (
                <DashboardHubs
                  title={value.name}
                  action={() => action(value.id, value)}
                />
              ))}
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
          <div className="w-[30%] h-[100vh] ">
            {Object.keys(settings).length > 0 ? (
              <Sidebar
                hubList={hubs}
                showCreateHub={showCreateHub}
                setting={settings}
                updateLogo={updateLogoModal}
              />
            ) : null}
          </div>
          <div className="w-[100%] pl-[30px] mt-4">
            <div className="w-[100%] flex justify-between">
              {dashboardStats.map((item) => (
                <div className="w-[30%]">
                  <DashboardCard title={item.title} value={item.count} />
                </div>
              ))}
            </div>
            <div>
              {categories.length > 0 ? (
                <KanbanBoard
                  categories={categories}
                  handleCreateNewContent={handleOpen}
                  viewContents={viewContents}
                  deleteContent={confirmDeleteContent}
                  updateContent={updateContent}
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
          </div>
          {categories.length > 0 ? (
            <div
              id="fabs"
              style={fabStyle}
              aria-label="add"
              onClick={() => handleOpenCategory()}
            >
              <Tooltip title="Create Category" className="bg-[#000]">
                <AddCircleRoundedIcon className="text-[50px] text-[#DCD427] cursor-pointer " />
              </Tooltip>
            </div>
          ) : null}
        </div>
      ) : null}
    </main>
  );
}
