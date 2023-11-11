export default function ActionButton({
  children,
  withBG,
  withBorder,
  handleClick,
  withText = "",
}) {
  return (
    <div
      onClick={handleClick}
      className={`grid justify-items-center  content-center  rounded pl-2 pr-2 h-12 ${
        withBorder == true
          ? "border-2 border-solid shadow-md shadow-[#FDC435]  border-[#FDC435]"
          : ""
      }
        ${withBG == true ? "bg-[#FDC435]" : ""}
        ${
          withBG == true ? (withText.length > 0 ? withText : "text-[#000]") : ""
        }
        ${
          withBorder == true
            ? withText.length > 0
              ? withText
              : "text-[#FFF]"
            : ""
        }
        w-[160px] text-[25px]
        cursor-pointer
        `}
    >
      {children}
    </div>
  );
}
