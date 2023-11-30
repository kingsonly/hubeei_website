import React, { useState } from "react";
import Logo from "../../../public/images/logo.jpeg";
import Image from "next/image";
import { Typography } from "@mui/material";
import SouthIcon from "@mui/icons-material/South";
import ActionButton from "../ActionButton";

/**
 * SideBar is a component used to manage menu page navigation.
 * @function
 * @param {object}  props - keeps the links values.
 * @todo fix stability and ensure screen responsiveness
 * @return {HTMLElement}
 */

const Sidebar = ({ SideBarLinks, hubList, showCreateHub }) => {
  const [showHub, setShowHub] = useState(false);
  const [showHubSettings, setShowHubSettings] = useState(false);

  const logout = () => {
    alert(1);
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

  const showCreateHubModal = () => {
    showCreateHub();
  };

  const switchHub = (id, details) => {
    localStorage.setItem("hubDetails", JSON.stringify(details));
    localStorage.setItem("hub", id);
    window.location.reload();
  };

  const showHubListDesign = () => {
    let hubID = localStorage.getItem("hub");

    if (hubList.length > 1) {
      //setHubLenght(true);
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
        <div className="pb-[50px] overflow-auto flex flex-col h-screen fixed top-0 left-0 w-[273px] gap-y-[10px]">
          <div className="flex items-center justify-center bg-white h-[145px]">
            <Image src={Logo} alt="logo" />
          </div>
          <div
            style={{
              background: "#FFFFFF",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              onClick={() => logout()}
              key="100"
              className="flex flex-row border-l-[10px] border-[#FFFFFF] h-[64px] mt-[10px] nav-style gap-x-[24px] text-[#7E7E7E] nav-inactive"
              style={{
                height: "64px",
                display: "flex",
                columnGap: "40px",
                textDecoration: "none",
                marginTop: "10px",
                alignItems: "center",
              }}
            >
              <div className="show-inactive pl-2">icons</div>
              <span>Logout</span>
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
                          className="beacon-button"
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
                <div className="bg-[#000] pb-4 ">
                  <div>Update Logo</div>
                  <div>Registration</div>
                  <div>Subscribers</div>
                  <div>sportlight</div>
                  <div>menu</div>
                  <div>Search Bar</div>
                  <div>Background Color</div>
                  <div>Content Font Color</div>
                  <div>Category Font Color</div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
