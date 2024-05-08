import React, { useEffect, useState } from "react";
import Logo from "../../images/logo.jpeg";
import Logoempty from "../../images/logoplaceholder-removebg-preview.png";
import { Typography } from "@mui/material";
import ActionButton from "../ActionButton";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import { HexColorPicker } from "react-colorful";
import CopyToClipboardButton from "../CopyToClipboardButton/CopyToClipboardButton";

/**
 * SideBar is a component used to manage menu page navigation.
 * @function
 * @param {object}  props - keeps the links values.
 * @todo fix stability and ensure screen responsiveness
 * @return {HTMLElement}
 */

const Sidebar = ({
  SideBarLinks,
  hubList,
  showCreateHub,
  showRegistrationSettings,
  setting,
  updateLogo,
  showSubscribersSettings,
  showSubscribers,
  updateSettingsRefresh,
}) => {
  const [showHub, setShowHub] = useState(false);
  const [showHubSettings, setShowHubSettings] = useState(false);
  const [settings, setSettings] = useState(setting);
  const [spotlight, setSpotlight] = useState(
    parseInt(setting.sportlight.value)
  );
  const [menu, setMenu] = useState(parseInt(setting.menu.value));
  const [search, setSearch] = useState(parseInt(setting.search.value));
  const [bgColor, setBgColor] = useState(setting.background.value);
  const [bgPicker, setBgPicker] = useState(false);
  const [categoryPicker, setCategoryPicker] = useState(false);
  const [contentPicker, setContentPicker] = useState(false);
  const [contentColor, setContentColor] = useState(setting.content.value);
  const [categoryColor, setCategoryColor] = useState(setting.category.value);
  const [registration, setRegistration] = useState(
    parseInt(setting.registration.value)
  );
  const [topten, setTopten] = useState(parseInt(setting.topten.value));
  const [registrationData, setRegistrationData] = useState();
  const [url, setUrl] = useState("");

  const CustomSwitch = styled(Switch)(() => ({
    "& .MuiSwitch-track": {
      width: "100%", // or specify the width you want
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#DCD427",
      "&:hover": {
        backgroundColor: "#DCD427",
      },
    },
    "& .MuiSwitch-switchBase": {
      color: "#fff",

      "&:hover": {
        backgroundColor: "#fff",
      },
    },

    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#DCD427",
      color: "#DCD427",
    },
    "& .MuiSwitch-switchBase + .MuiSwitch-track": {
      backgroundColor: "#fff",
      color: "#fff",
    },
  }));

  useEffect(() => {
    let getHubDetails = JSON.parse(localStorage.getItem("hubDetails"));
    setUrl(getHubDetails.url);
    console.log("i am settings for real ", settings);
  }, []);

  const logout = () => {
    alert(1);
  };

  const updateSettings = async (e, type) => {
    switchAction(type, e);
    let value;
    if (type == "background" || type == "content" || type == "category") {
      if (type == "background") {
        setBgColor(e);
      }
      if (type == "content") {
        setContentColor(e);
      }

      if (type == "category") {
        setCategoryColor(e);
      }
      value = e;
    } else {
      if (e.target.checked == true) {
        value = 1;
      }
      if (e.target.checked == false) {
        value = 0;
      }
    }

    let hubId = localStorage.getItem("hub");
    let data = {
      hub_id: hubId,
      type: type,
      value: value,
    };

    if (type == "registration") {
      //setRegistrationData(data);
      // show setting modal
      if (e.target.checked == true) {
        showRegistrationSettings(data);
        return;
      }
    }

    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}dashboard/hubs/settings/update`,
      data
    );
    if (response.data.status == "success") {
      switchAction(type, e);
      updateSettingsRefresh(hubId);
    } else {
    }
  };

  const switchAction = (type, e) => {
    switch (type) {
      case "sportlight":
        setSpotlightState(e);
        break;
      case "menu":
        setMenuState(e);
        break;
      case "search":
        setSearchState(e);
        break;
      case "registration":
        setRegistrationState(e);
        break;
      case "topten":
        setTopten(e);
        break;
    }
  };

  const showHubListSettings = () => {
    if (showHubSettings) {
      setShowHubSettings(false);
    } else {
      setShowHubSettings(true);
    }
  };
  const showHubList = () => {
    if (showHub) {
      setShowHub(false);
    } else {
      setShowHub(true);
    }
  };

  const bgPickerToggle = () => {
    if (bgPicker == false) {
      setBgPicker(true);
    } else {
      setBgPicker(false);
    }
  };
  const categoryPickerToggle = () => {
    if (categoryPicker == false) {
      setCategoryPicker(true);
    } else {
      setCategoryPicker(false);
    }
  };
  const contentPickerToggle = () => {
    if (contentPicker == false) {
      setContentPicker(true);
    } else {
      setContentPicker(false);
    }
  };

  const showCreateHubModal = () => {
    showCreateHub();
  };

  const switchHub = (id, details) => {
    console.log("iam the details ", details);
    localStorage.setItem("hubDetails", JSON.stringify(details));
    localStorage.setItem("hub", id);
    window.location.reload();
  };
  const setSpotlightState = (e) => {
    let value;
    if (e.target.checked == true) {
      value = 1;
    }
    if (e.target.checked == false) {
      value = 0;
    }
    setSpotlight(value);
  };

  const setMenuState = (e) => {
    let value;
    if (e.target.checked == true) {
      value = 1;
    }
    if (e.target.checked == false) {
      value = 0;
    }
    setMenu(value);
  };

  const setSearchState = (e) => {
    let value;
    if (e.target.checked == true) {
      value = 1;
    }
    if (e.target.checked == false) {
      value = 0;
    }
    setSearch(value);
  };

  const setRegistrationState = (e) => {
    let value;
    if (e.target.checked == true) {
      value = 1;
    }
    if (e.target.checked == false) {
      value = 0;
    }
    setRegistration(value);
  };

  const showHubListDesign = () => {
    let hubID = localStorage.getItem("hub");

    if (hubList.length > 1) {
      return hubList.map((items) =>
        items.id != hubID ? (
          <div className="flex justify-center item-center pt-4   ">
            <div
              onClick={() => switchHub(items.id, items)}
              className="cursor-pointer w-[90%] py-[10px] text-center bg-[#DCD427] text-[#000] font-roboto text-[19px] capitalize"
            >
              {items.name}
            </div>
          </div>
        ) : null
      );
    }
  };
  return (
    <>
      <div data-testid="sidebarlinks">
        <div className=" shadow-[#DCD427] font-roboto shadow-2xl pb-[50px] overflow-auto flex flex-col h-screen fixed top-0 left-0 w-[273px] gap-y-[10px]">
          <div className="flex items-center justify-center bg-black ">
            <img src={Logo} alt="logo" width={200} className="mt-2" />
          </div>
          <div
            style={{
              background: "#FFFFFF",
              height: "100%",
            }}
          >
            <div
              key="100"
              className=" min-h-[64px]  nav-style  text-[#7E7E7E] bg-[#000]"
              style={{
                minHeight: "200px",
                borderTop: "solid #DCD427 2px",
                borderBottom: "solid #DCD427 3px",
                alignItems: "center",
              }}
            >
              {settings != null && Object.keys(settings).length > 0 ? (
                <>
                  <div className="show-inactive p-2 flex justify-center text-center ">
                    {settings.logo.value.trim().length != 0 ? (
                      <img
                        src={`${process.env.REACT_APP_DOCUMENTS}${settings.logo.value}`}
                        width={100}
                        height={100}
                      />
                    ) : (
                      <img
                        src={Logoempty}
                        alt="logo"
                        width="100"
                        className="rounded-full h-[100px] bg-[#DCD427]"
                      />
                    )}
                  </div>
                  <div className=" p-2 text-center ">
                    <Typography variant="h4" className="text-[#DCD427]">
                      {settings.title}
                    </Typography>
                  </div>
                  <div className=" p-2 max-h-[100px] ">
                    <Typography variant="h6" className="text-[#DCD427]">
                      {settings.description}
                    </Typography>
                  </div>
                  <div className=" p-2 max-h-[100px] ">
                    <CopyToClipboardButton
                      text={`https://${url}.${process.env.REACT_APP_ROUTE}`}
                    />
                    {/* <Typography variant="h6" className="text-[#DCD427]">
                      {`https://${url}.${process.env.REACT_APP_ROUTE}`}
                    </Typography> */}
                  </div>
                </>
              ) : null}
            </div>

            <div
              className=" text-[#7E7E7E]"
              style={{
                alignItems: "center",
              }}
            >
              <div
                style={{
                  height: "64px",
                  display: "flex",
                }}
              >
                <div
                  className="  cursor-pointer flex justify-center items-center  w-[100%] "
                  onClick={() => showHubList()}
                >
                  <span className=" ">Hubs</span>
                </div>
              </div>
              {showHub ? (
                <div className="bg-[#000] pb-4 ">
                  {showHubListDesign()}
                  <div>
                    <div>
                      {/* here we would put the button for subscription or for creating a new hub as the case may be  */}
                      <div className="flex justify-center mt-4">
                        <ActionButton
                          className="beacon-button "
                          withBG={true}
                          handleClick={showCreateHubModal}
                        >
                          Create Hub
                        </ActionButton>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div
              className=" text-[#7E7E7E]"
              style={{
                marginTop: "10px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  height: "64px",
                  display: "flex",
                  border: "solid 1px #fff",
                }}
              >
                <div
                  className=" ring ring-gray-300 cursor-pointer flex justify-center items-center  w-[100%] "
                  onClick={() => showHubListSettings()}
                >
                  <span className=" ">Hub Settings</span>
                </div>
              </div>
              {showHubSettings ? (
                <div className="bg-[#000] pb-4 px-2 ">
                  <div>
                    <FormControlLabel
                      control={
                        <CustomSwitch
                          checked={spotlight}
                          onChange={(e) => updateSettings(e, "sportlight")}
                          name="Spotlight"
                        />
                      }
                      label={
                        <Typography
                          variant="h6"
                          className={`${
                            spotlight == 0 ? "text-[#ccc]" : "text-[#DCD427]"
                          }`}
                        >
                          Spotlight
                        </Typography>
                      }
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      control={
                        <CustomSwitch
                          checked={topten}
                          onChange={(e) => updateSettings(e, "topten")}
                          name="Top Ten"
                        />
                      }
                      label={
                        <Typography
                          variant="h6"
                          className={`${
                            topten == 0 ? "text-[#ccc]" : "text-[#DCD427]"
                          }`}
                        >
                          Top Ten
                        </Typography>
                      }
                    />
                  </div>

                  <div>
                    <FormControlLabel
                      control={
                        <CustomSwitch
                          checked={registration}
                          onChange={(e) => updateSettings(e, "registration")}
                          name="registration"
                        />
                      }
                      label={
                        <Typography
                          variant="h6"
                          className={`${
                            registration == 0 ? "text-[#ccc]" : "text-[#DCD427]"
                          }`}
                        >
                          Registration
                        </Typography>
                      }
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      control={
                        <CustomSwitch
                          checked={menu}
                          onChange={(e) => updateSettings(e, "menu")}
                          name="Menu"
                        />
                      }
                      label={
                        <Typography
                          variant="h6"
                          className={`${
                            menu == 0 ? "text-[#ccc]" : "text-[#DCD427]"
                          }`}
                        >
                          Menu
                        </Typography>
                      }
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      control={
                        <CustomSwitch
                          checked={search}
                          onChange={(e) => updateSettings(e, "search")}
                          name="search"
                        />
                      }
                      label={
                        <Typography
                          variant="h6"
                          className={`${
                            search == 0 ? "text-[#ccc]" : "text-[#DCD427]"
                          }`}
                        >
                          Search Bar
                        </Typography>
                      }
                    />
                  </div>
                  {registration == 1 ? (
                    <div>
                      <div className="mt-2">
                        <ActionButton
                          handleClick={showSubscribers}
                          withBG={true}
                          className="w-[100%]"
                        >
                          Subscribers
                        </ActionButton>
                      </div>

                      <div className="mt-2">
                        <ActionButton
                          handleClick={showSubscribersSettings}
                          withBG={true}
                          className="w-[100%] "
                        >
                          <div className="text-[21px]">
                            Subscribers Settings
                          </div>
                        </ActionButton>
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-4">
                    <ActionButton
                      handleClick={updateLogo}
                      withBorder={true}
                      className={`w-[100%]`}
                    >
                      Update Logo
                    </ActionButton>
                  </div>
                  <div className="mt-4">
                    <ActionButton
                      className="w-[100%] "
                      withBorder={true}
                      handleClick={bgPickerToggle}
                      style={{ backgroundColor: bgColor }}
                    >
                      Background Color
                    </ActionButton>
                    {bgPicker ? (
                      <div className="mt-4 w-[100%] flex justify-center">
                        <HexColorPicker
                          color={bgColor}
                          onChange={(e) => updateSettings(e, "background")}
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-4">
                    <ActionButton
                      handleClick={contentPickerToggle}
                      withBorder={true}
                      className="w-[100%]"
                      style={{ backgroundColor: contentColor }}
                    >
                      Content Font Color
                    </ActionButton>
                    {contentPicker ? (
                      <div className="mt-4 w-[100%] flex justify-center">
                        <HexColorPicker
                          color={contentColor}
                          onChange={(e) => updateSettings(e, "content")}
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-4">
                    <ActionButton
                      handleClick={categoryPickerToggle}
                      withBorder={true}
                      className="w-[100%] "
                      style={{ backgroundColor: categoryColor }}
                    >
                      Category Font Color
                    </ActionButton>
                    {categoryPicker ? (
                      <div className="mt-4 w-[100%] flex justify-center">
                        <HexColorPicker
                          color={categoryColor}
                          onChange={(e) => updateSettings(e, "category")}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
            <div
              style={{
                height: "64px",
                display: "flex",
                border: "solid 1px #fff",
              }}
            >
              <div
                className=" ring ring-gray-300 text-[#7E7E7E] cursor-pointer flex justify-center items-center  w-[100%] "
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                <span className="">Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
