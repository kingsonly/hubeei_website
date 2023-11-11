"use client";
import React, { useRef } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FileUploadIcon from "@mui/icons-material/FileUpload";
export default function UploadButton({ handleOnChange, text, accept = "" }) {
  const fileRef = useRef(null);
  return (
    <div className=" h-[58px] m-[8px] flex justify-between items-center  w-[100%]">
      <div
        onClick={() => {
          fileRef.current.click();
        }}
        className="border-2 flex rounded-md h-[100%] w-[100%]"
      >
        <div className="border-r-2 p-2 flex items-center ">
          <AttachFileIcon />
        </div>
        <div className="w-[100%] text-center flex items-center font-medium text-[15px] p-2 gap-4 cursor-pointer">
          <div className="w-[80%]">
            <input
              type="file"
              onChange={handleOnChange}
              style={{ display: "none" }}
              ref={fileRef}
              accept={accept}
            />
            {text}
          </div>
          <div className="w-[20%] text-right">
            <FileUploadIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
