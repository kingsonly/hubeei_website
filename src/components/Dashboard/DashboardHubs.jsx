import Image from "next/image";
import React from "react";
import step1 from "../../../public/images/step1.png";

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

export default function DashboardHubs(props) {
  const { title, image, action } = props;
  return (
    //data test id is the id used to get elements passed as arguments to the test files

    <div
      className="  shadow-lg shadow-[#333] w-[280px] bg-black  rounded cursor-pointer"
      onClick={action}
    >
      <div>
        <Image src={step1} width="100%" />
      </div>
      <h3 className=" justify-start font-bold text-[#fff] text-[20px] font-semibold mb-[20px] text-center w-[100%]  ">
        {title}
      </h3>
    </div>
  );
}
