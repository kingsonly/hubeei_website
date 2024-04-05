import React from "react";
import hubeeiLogo from "../../images/logo.jpeg";

/**
 * Represents the dashboard card container.
 * @function
 * @param {object} props - stores all the value of the dashboard card.
 * @Description - this component displays the dasboard card which includes title(projects)
 * total(number of total projects), and a list that stores the value of both completed
 * projects and ongoing projects.
 *
 * to use this component, take out the first <div> and dont forget the closing tag </div>
 * @returns {JSX}
 */
//Paskilo2015##99 info@skillzsystems.com.ng
export default function DashboardHubs(props) {
  const { title, image, action } = props;
  return (
    //data test id is the id used to get elements passed as arguments to the test files

    <div
      className="   shadow-lg shadow-[#333] w-[280px] h-[200px]  bg-black  rounded cursor-pointer"
      onClick={action}
    >
      <div className="w-[100%] h-[70%] overflow-hidden">
        <img
          src={
            image.length < 1
              ? hubeeiLogo
              : process.env.REACT_APP_DOCUMENTS + "/public" + image
          }
          width="280"
          height="100"
        />
      </div>
      <div className="h-[25%] flex justify-center items-center ">
        <h3 className="  font-bold text-[#fff] text-[20px] font-semibold  text-center w-[100%]  ">
          {title}
        </h3>
      </div>
    </div>
  );
}
