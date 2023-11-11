import React from "react";
import Logo from "../../../public/images/logo.jpeg";
import Image from "next/image";

/**
 * SideBar is a component used to manage menu page navigation.
 * @function
 * @param {object}  props - keeps the links values.
 * @todo fix stability and ensure screen responsiveness
 * @return {HTMLElement}
 */

const Sidebar = ({ SideBarLinks }) => {
  const logout = () => {
    alert(1)
  }
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
                alignItems: 'center'
              }}
            >
              <div className="show-inactive pl-2">
                regular
              </div>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
