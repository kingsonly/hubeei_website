"use client";
import { useState } from "react";
import ActionButton from "../ActionButton";
import TextInput from "../InputComponent/TextInput";
import UploadButton from "../InputComponent/UploadButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { Typography } from "@mui/material";

export default function UpdateContent({ data }) {
  //const [step, setStep] = useState(0);
  const [loader, setLoader] = useState(false);

  const [content, setContent] = useState(data.content);
  const [type, setType] = useState(data.content_type);
  const [withEngagment, setWithEngagment] = useState(data.with_engagment);
  const [spotlight, setSpotlight] = useState(parseInt(data.sportlight));
  const [title, setTitle] = useState(data.name);
  const [description, setDescription] = useState(data.content_description);
  const [thumbnail, setThumbnail] = useState(data.thumbnail);

  const handleSubmit = async () => {
    if (!loader) {
      setLoader(true);

      const formData = new FormData();
      formData.append("content", content);
      formData.append("name", title);
      formData.append("content_type", type);
      formData.append("content_description", description);
      formData.append("thumbnail", thumbnail);
      formData.append("sportlight", spotlight);

      await axios
        .post(
          `${process.env.NEXT_PUBLIC_BACKEND_API}content/update/${data.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          setLoader(false);
          console.log("File uploaded successfully:", response.data);
          // Handle success, e.g., show a success message
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          setLoader(false);
          // Handle error, e.g., show an error message
        });
    }
  };

  const setExtraEngagment = (e) => {
    if (e.target.checked == false) {
      setWithEngagment(0);
    } else {
      setWithEngagment(1);
    }
  };

  const setSpotlightState = (e) => {
    if (e.target.checked == false) {
      setSpotlight(0);
    } else {
      setSpotlight(1);
    }
  };

  const option = [
    { label: "Video Link", value: "link" },
    { label: "PDF", value: "pdf" },
    { label: "Video", value: "video" },
    { label: "Audio", value: "audio" },
  ];

  const video = () => {
    return (
      <UploadButton
        accept="video/*"
        handleOnChange={(e) => setContent(e.target.files[0])}
      />
    );
  };

  const audio = () => {
    return (
      <UploadButton
        accept="audio/*"
        handleOnChange={(e) => setContent(e.target.files[0])}
      />
    );
  };

  const pdf = () => {
    return (
      <UploadButton
        text="Upload PDF"
        accept="application/pdf"
        handleOnChange={(e) => setContent(e.target.files[0])}
      />
    );
  };

  const link = () => {
    return (
      <TextInput
        label="Video Link"
        onChange={(e) => setContent(e.target.value)}
      />
    );
  };

  const displayContentTypes = (type) => {
    switch (type) {
      case "link":
        return link();
      case "video":
        return video();
      case "pdf":
        return pdf();
      case "engagment":
        return "engagement";
      case "audio":
        return audio();
    }
  };

  const selectOption = (e) => {
    setType(e.target.value);
  };

  const engagementCreator = (e) => {
    return (
      <div>
        <div>Contenttype</div>
        <div>next and previous</div>
      </div>
    );
  };

  const CustomSwitch = styled(Switch)(() => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#DCD427",
      "&:hover": {
        backgroundColor: "#DCD427",
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#DCD427",
    },
  }));

  const label = { inputProps: { "aria-label": "Color switch demo" } };

  return (
    <div className="">
      <div className="flex justify-between">
        <div className="w-[30%]">
          <TextInput
            label={"Title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="w-[30%]">
          <UploadButton
            handleOnChange={(e) => setThumbnail(e.target.files[0])}
          />
        </div>
        <div className="w-[30%]">{displayContentTypes(type)}</div>
      </div>
      <div className="mt-4">
        <div>
          <TextInput
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            inputProps={{ style: { fontFamily: "Arial", color: "white" } }}
            style={{ flex: 1, color: "white" }}
            maxRows={10}
            sx={{
              "& .MuiFormLabel-root": {
                color: "white",
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: "white",
              },
            }}
          />
        </div>
      </div>
      <div className="flex justify-between mt-4 mb-4">
        <div className="w-[50%]">
          <TextInput
            type="select"
            options={option}
            label="Content Type"
            defaultValue={type}
            onChange={(e) => selectOption(e)}
          />
        </div>
        <div className="w-[20%]  p-4">
          <div className="border-2 border-solid border-[#DCD427] rounded-full flex justify-center">
            <FormControlLabel
              control={
                <CustomSwitch
                  checked={spotlight}
                  onChange={(e) => setSpotlightState(e)}
                  name="Spotlight"
                />
              }
              label={
                <Typography style={{ fontSize: "10px" }}>Spotlight</Typography>
              }
            />
          </div>
        </div>
        <div className="w-[23%]  p-4">
          <div className="border-2 border-solid border-[#DCD427] rounded-full flex justify-around">
            <FormControlLabel
              className="text-[10px]"
              control={
                <CustomSwitch
                  checked={withEngagment}
                  onChange={(e) => setExtraEngagment(e)}
                  name="Engagement"
                />
              }
              label={
                <Typography style={{ fontSize: "10px" }}>Engagement</Typography>
              }
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <div>
          <ActionButton withBG={true} handleClick={handleSubmit}>
            <div className="flex justify-around w-[100%]">
              <div>Create</div>
              <div>
                {loader ? (
                  <CircularProgress
                    size={20}
                    sx={{
                      color: "green",
                      zIndex: 1,
                    }}
                  />
                ) : null}
              </div>
            </div>
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
