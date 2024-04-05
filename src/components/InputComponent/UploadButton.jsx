"use client";
import React, { useRef, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CheckIcon from "@mui/icons-material/Check";
export default function UploadButton({
  error,
  handleOnChange,
  text,
  accept = "",
}) {
  const [selected, setSelected] = useState(false);
  const fileRef = useRef(null);
  const handleOnChangeLocal = (e) => {
    handleOnChange(e);
    setSelected(true);
  };
  return (
    <div className=" h-[58px] m-[8px] flex justify-between items-center  w-[100%]">
      <div
        onClick={() => {
          fileRef.current.click();
        }}
        className={`border-2   flex rounded-md h-[100%] w-[100%]`}
        style={{ borderColor: error == true ? "red" : "" }}
      >
        <div className="border-r-2 p-2 flex items-center ">
          <AttachFileIcon />
        </div>
        <div className="w-[100%] text-center flex items-center font-medium text-[15px] p-2 gap-4 cursor-pointer">
          <div className="w-[80%]">
            <input
              type="file"
              onChange={handleOnChangeLocal}
              style={{ display: "none" }}
              ref={fileRef}
              accept={accept}
            />
            {text}
          </div>
          <div className="w-[20%] text-right">
            {selected ? (
              <CheckIcon className="text-[green] " />
            ) : (
              <FileUploadIcon />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
