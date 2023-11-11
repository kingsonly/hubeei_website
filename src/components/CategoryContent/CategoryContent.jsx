"use client";
import { useState } from "react";
import ActionButton from "../ActionButton";
import TextInput from "../InputComponent/TextInput";
import UploadButton from "../InputComponent/UploadButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

export default function CategoryContent({ categoryId }) {
  const [step, setStep] = useState(0);
  const [loader, setLoader] = useState(false);

  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [withEngagment, setWithEngagment] = useState("no");
  const [spotlight, setSpotlight] = useState("no");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const handleNext = () => {
    let currentstep = step;
    setStep(currentstep + 1);
  };
  const handleSubmit = async () => {
    if (!loader) {
      setLoader(true);

      const formData = new FormData();
      formData.append("content", content);
      formData.append("name", title);
      formData.append("content_type", type);
      formData.append("content_description", description);
      formData.append("thumbnail", thumbnail);
      formData.append("hub_category_id", categoryId);

      await axios
        .post(
          "https://api.hubeei.skillzserver.com/api/content/create",
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
    console.log(e.target.value);
    setWithEngagment(e.target.value);
  };

  const setSpotlightState = (e) => {
    setSpotlight(e.target.value);
  };

  const handlePrevious = () => {
    let currentstep = step;
    if (currentstep != 0) {
      setStep(currentstep - 1);
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
  const steps = (step) => {
    switch (step) {
      case 1:
        return (
          <div>
            <div className="flex justify-between">
              <div className="w-[48%]">
                <FormControl onChange={setSpotlightState}>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Spotlight
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue="no"
                    onChange={(e) => setSpotlightState(e.target.value)}
                  >
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />

                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="w-[48%]">
                <FormControl onChange={setExtraEngagment}>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    With Engagement
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue="no"
                    onChange={(e) => setExtraEngagment(e.target.value)}
                  >
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />

                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>

            <div>{withEngagment == "yes" ? engagementCreator() : null}</div>
            <div className="flex justify-between w-[100%]">
              <ActionButton withBG={true} handleClick={handlePrevious}>
                Previous
              </ActionButton>
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

      default:
        return (
          <div>
            <div>
              <TextInput
                label={"Title"}
                onChange={(e) => setTitle(e.target.value)}
              />
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
            <div>
              <UploadButton
                handleOnChange={(e) => setThumbnail(e.target.files[0])}
              />
            </div>
            <div>
              <TextInput
                type="select"
                options={option}
                label="Content Type"
                onChange={(e) => selectOption(e)}
              />
            </div>
            <div>{displayContentTypes(type)}</div>
            <div className="flex justify-end">
              <ActionButton withBG={true} handleClick={handleNext}>
                Next
              </ActionButton>
            </div>
          </div>
        );
    }
  };

  return <div className="">{steps(step)}</div>;
}
