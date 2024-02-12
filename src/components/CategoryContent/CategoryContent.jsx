"use client";
import { useState } from "react";
import ActionButton from "../ActionButton";
import TextInput from "../InputComponent/TextInput";
import UploadButton from "../InputComponent/UploadButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Engagement from "../Engagement/Engagement";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { Typography } from "@mui/material";

export default function CategoryContent({ categoryId }) {
  const [loader, setLoader] = useState(false);

  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [withEngagment, setWithEngagment] = useState(false);
  const [spotlight, setSpotlight] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [engagmentData, setEngagmentData] = useState([]);

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

  const updateEngagmentData = (data) => {
    setEngagmentData(data);
  };

  const handleSubmit = async () => {
    if (!loader) {
      setLoader(true);
      if (type === "engagement") {
        setWithEngagment(false);
      }

      const formData = new FormData();
      formData.append("content", content);
      formData.append("name", title);
      formData.append("content_type", type);
      formData.append("content_description", description);
      formData.append("thumbnail", thumbnail);
      formData.append("sportlight", spotlight);
      formData.append("hub_category_id", categoryId);
      formData.append("with_engagement", withEngagment);
      formData.append("engagment_data", JSON.stringify(engagmentData));

      await axios
        .post(
          `${process.env.NEXT_PUBLIC_BACKEND_API}content/create`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
        });
    }
  };

  const setExtraEngagment = (e) => {
    switch (e.target.checked) {
      case true:
        setWithEngagment(1);
        break;
      default:
        setWithEngagment(0);
        break;
    }
  };

  const setSpotlightState = (e) => {
    switch (e.target.checked) {
      case true:
        setSpotlight(1);
        break;
      default:
        setSpotlight(0);
        break;
    }
  };

  const option = [
    { label: "Video Link", value: "link" },
    { label: "PDF", value: "pdf" },
    { label: "Video", value: "video" },
    { label: "Audio", value: "audio" },
    { label: "Engagement", value: "engagement" },
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
    //setWithEngagment(false);
    return (
      <TextInput
        label="Video Link"
        onChange={(e) => setContent(e.target.value)}
      />
    );
  };
  const engagement = () => {
    return (
      <div className="my-4">
        <Engagement data={updateEngagmentData} />
      </div>
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
      case "engagement":
        return engagement();
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
  const steps = () => {
    <div>{withEngagment == "yes" ? engagementCreator() : null}</div>;
    <CustomSwitch
      checked={spotlight}
      onChange={(e) => updateSettings(e, "sportlight")}
      name="Spotlight"
    />;
    return (
      <div>
        <div className="flex justify-between">
          <div className="w-[48%]">
            <TextInput
              label={"Title"}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="w-[48%]">
            <UploadButton
              text="Thumbnail"
              handleOnChange={(e) => setThumbnail(e.target.files[0])}
            />
          </div>
        </div>
        <div>
          <TextInput
            id="outlined-multiline-flexible"
            label="Description"
            multiline
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

        <div className="flex justify-between">
          <div className="w-[60%]">
            <TextInput
              type="select"
              options={option}
              label="Content Type"
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
                  <Typography style={{ fontSize: "10px" }}>
                    Spotlight
                  </Typography>
                }
              />
            </div>
          </div>
          <div className="w-[23%]  p-4">
            {type !== "engagement" ? (
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
                    <Typography style={{ fontSize: "10px" }}>
                      Engagement
                    </Typography>
                  }
                />
              </div>
            ) : null}
          </div>
        </div>

        <div>{displayContentTypes(type)}</div>

        <div>
          {type !== "engagement" && withEngagment === 1 ? engagement() : null}
        </div>

        <div className="flex justify-end">
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
    );
  };

  return <div className="">{steps()}</div>;
}
