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
  const { title, total, completed, ongoing, completedtitle, ongoingtitle } =
    props;
  return (
    //data test id is the id used to get elements passed as arguments to the test files

    <div
      className=" border border-solid border-2 border-[#FDC435] shadow-lg shadow-[#333] w-[280px] bg-black pl-[13px]"
      data-testid="dashboard-card"
    >
      <h3
        className="flex justify-start font-bold text-[20px] font-semibold mb-[20px]"
        data-testid="dashboard-card-title"
      >
        {title}
      </h3>
      <div className="flex justify-between">
        <div className="  before:absolute before:ml-[80px] before:mt-[-20px] before:h-[60px] before:w-[5px] before:bg-gray-200">
          <h1
            className="font-bold text-[40px] font-black text-zinc-500 "
            data-testid="Dashboard-card-project-total"
          >
            {total}
          </h1>
        </div>
        <div className="mt-[-15px] w-[60%]">
          <div className="flex">
            <p
              className="font-medium text-amber-600"
              data-testid="Dashboard-card-completed-project"
            >
              {completed}
            </p>
            <p className="ml-[5px] text-[13px] font-normal pt-[3px]">
              {completedtitle ? completedtitle : "Completed"}
            </p>
          </div>
          <div className="flex mt-[10px]">
            <p
              className="font-medium text-amber-600"
              data-testid="Dashboard-card-ongoing-project"
            >
              {ongoing}
            </p>
            <p className="ml-[5px] text-[13px] font-normal pt-[3px]">
              {ongoingtitle ? ongoingtitle : "Ongoing"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
