import { Typography } from "@mui/material";
import React from "react";

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

export default function DashboardCard(props) {
  const neufunc = (valeu) => {
    alert(valeu);
  };
  const { title, value, type } = props;
  return (
    //data test id is the id used to get elements passed as arguments to the test files

    <div className=" rounded-xl border border-solid border-2 border-[#DCD427] shadow-lg shadow-[#333] w-[280px] bg-black pl-[13px] h-[150px] p-4   shadow-lg transform -skew-x-3">
      <div className="flex justify-center">
        <Typography variant="h5" className="uppercase font-roboto">
          {title}
        </Typography>
      </div>

      <div className="flex justify-center h-[90px] items-center">
        {type !== undefined ? (
          <div className="flex justify-between h-[100%] items-center w-[100%]">
            <div className=" h-[100%] w-[45%]">
              <div className="text-center">
                <Typography
                  variant="h6"
                  className="uppercase font-roboto  w-[100%] text-[#DCD427]"
                >
                  {type[0].title}
                </Typography>
              </div>
              <div className="text-center flex items-end h-[60%]">
                <Typography
                  variant="h4"
                  className="uppercase font-roboto text-[#DCD427] w-[100%]"
                >
                  {type[0].value}
                </Typography>
              </div>
            </div>
            <div className="border-2 border-solid border-[#DCD427] h-[30px]"></div>
            <div className=" h-[100%] w-[45%]">
              <div className="text-center">
                <Typography
                  variant="h6"
                  className="uppercase font-roboto  w-[100%] text-[#DCD427]"
                >
                  {type[1].title}
                </Typography>
              </div>
              <div className="text-center flex items-end h-[60%]">
                <Typography
                  variant="h4"
                  className="uppercase font-roboto text-[#DCD427] w-[100%] "
                >
                  {type[1].value}
                </Typography>
              </div>
            </div>
          </div>
        ) : (
          <Typography
            variant="h2"
            className="uppercase font-roboto text-[#DCD427]"
          >
            {value}
          </Typography>
        )}
      </div>
    </div>
  );
}
