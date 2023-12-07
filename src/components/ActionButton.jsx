export default function ActionButton({
  children,
  withBG,
  withBorder,
  handleClick,
  withText = "",
  className,
  style,
}) {
  return (
    <div
      style={style}
      onClick={handleClick}
      className={` grid justify-items-center  content-center  rounded pl-2 pr-2 h-12 ${
        withBorder == true
          ? "border-2 border-solid shadow-md shadow-[#DCD427]  border-[#DCD427]"
          : ""
      }
        ${withBG == true ? "bg-[#DCD427]" : ""}
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
        min-w-[160px] text-[25px]
        cursor-pointer
        ${className}
        `}
    >
      {children}
    </div>
  );
}
