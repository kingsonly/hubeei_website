import React, { useRef } from "react";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
const CopyToClipboardButton = ({ text }) => {
  const textAreaRef = useRef(null);

  const copyToClipboard = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand("copy");
      // Optionally, you can show a message indicating that the text has been copied
      alert("Copied to clipboard!");
    }
  };

  return (
    <div className="flex justify-between">
      <div className="w-[100%] cursor-pointer">
        <a
          target="_blank"
          href={text}
          className="border-[red] focus:border-blue-500 outline-none"
        >
          <input
            className="cursor-pointer text-[#DCD427] bg-[#000] w-[100%]  focus:border-blue-500 outline-none"
            type="text"
            ref={textAreaRef}
            value={text}
            readOnly
          />
        </a>
      </div>
      <div className="flex justify-between">
        <div>
          <ContentCopyOutlinedIcon
            onClick={copyToClipboard}
            className="cursor-pointer lg:w-[30px] w-[20px] text-[#DCD427] lg:h-[30px] h-[20px]"
          />
        </div>
        <div>
          <a
            target="_blank"
            href={text}
            className="border-[red] focus:border-blue-500 outline-none"
          >
            <VisibilityIcon className="cursor-pointer lg:w-[30px] w-[20px] text-[red] lg:h-[30px] h-[20px]" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CopyToClipboardButton;
