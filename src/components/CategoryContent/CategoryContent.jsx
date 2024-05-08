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

export default function CategoryContent({ categoryId, created }) {
  const [loader, setLoader] = useState(false);
  const [engTypeError, setEngTypeError] = useState(false);

  const [content, setContent] = useState("");
  const [contentEvent, setContentEvent] = useState("");
  const [type, setType] = useState("");
  const [withEngagment, setWithEngagment] = useState(0);
  const [spotlight, setSpotlight] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [engagmentData, setEngagmentData] = useState([]);
  const [changeData, setChangeData] = useState([]);
  const [error, setError] = useState({
    content: false,
    type: false,
    title: false,
    description: false,
  });

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
  const setThumbnailState = (e) => {
    setThumbnail(e);
  };

  const handleSubmit = async () => {
    // if (
    //   (type !== "engagement" &&
    //     type.length < 1 &&
    //     type !== "video link" &&
    //     content?.name?.length < 1) ||
    //   (type !== "engagement" && type !== "video link" && content?.length < 1)
    // ) {
    //   setError((previous) => ({ ...previous, content: true }));
    // }

    setError({
      content: false,
      type: false,
      title: false,
      description: false,
    });

    let hasError = false;
    let canCreate = true;

    if (title.length < 1) {
      canCreate = false;
      setError((previous) => ({ ...previous, title: true }));
    }
    if (type.length < 1) {
      canCreate = false;
      setError((previous) => ({ ...previous, type: true }));
    }

    if (type == "link" && content.trim().length == 0) {
      canCreate = false;
      setError((previous) => ({ ...previous, content: true }));
    }

    if (description.trim().length == 0) {
      canCreate = false;
      setError((previous) => ({ ...previous, description: true }));
    }

    if (
      (type == "video" || type == "pdf" || type == "audio") &&
      typeof content === "string"
    ) {
      canCreate = false;
      setError((previous) => ({ ...previous, content: true }));
    }

    // check if it engagement and if selected engagement type is empty
    if (type == "engagement" && engagmentData.length == 0) {
      canCreate = false;
      setEngTypeError(true);
    }

    if (type == "engagement" && engagmentData.length > 0) {
      engagmentData.map((data, index) => {
        console.log("should work " + index, data);
        if (data.question.trim().length < 1) {
          hasError = true;
          engagmentData[index].error = true;
        }

        data.answers.map((answerData, answerIndex) => {
          if (answerData.answer.trim().length < 1) {
            hasError = true;
            engagmentData[index].answers[answerIndex].error = true;
          }
        });
      });

      if (hasError) {
        setChangeData(engagmentData);
      }
    }

    if (!loader && canCreate && !hasError) {
      setLoader(true);
      if (type === "engagement") {
        setWithEngagment(false);
      }

      const formData = new FormData();
      formData.append("hub_id", localStorage.getItem("hub"));
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
        .post(`${process.env.REACT_APP_BACKEND_API}content/create`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setLoader(false);
          created();
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
  const setContentEventState = (e) => {
    switch (e.target.checked) {
      case true:
        setContentEvent(1);
        break;
      default:
        setContentEvent(0);
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
        error={error.content}
      />
    );
  };

  const audio = () => {
    return (
      <UploadButton
        accept="audio/*"
        handleOnChange={(e) => setContent(e.target.files[0])}
        error={error.content}
      />
    );
  };

  const pdf = () => {
    return (
      <UploadButton
        text="Upload PDF"
        accept="application/pdf"
        handleOnChange={(e) => setContent(e.target.files[0])}
        error={error.content}
      />
    );
  };

  const link = () => {
    //setWithEngagment(false);
    return (
      <TextInput
        label="Video Link"
        onChange={(e) => setContent(e.target.value)}
        error={error.content}
      />
    );
  };
  const engagement = () => {
    return (
      <div className="my-4">
        <Engagement
          data={updateEngagmentData}
          error={engTypeError}
          updateError={(e) => {
            setEngTypeError(e);
          }}
          updateEngError={changeData}
        />
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
    setContent("");
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
      onChange={(e) => {
        //updateSettings(e, "sportlight")
      }}
      name="Spotlight"
    />;
    return (
      <div>
        <div className="flex justify-between">
          <div className="w-[48%]">
            <TextInput
              label={"Title"}
              inputProps={{ style: { fontFamily: "Arial", color: "white" } }}
              onChange={(e) => setTitle(e.target.value)}
              error={error.title}
            />
          </div>
          <div className="w-[48%]">
            <UploadButton
              text="Thumbnail"
              handleOnChange={(e) => setThumbnailState(e.target.files[0])}
            />
          </div>
        </div>
        <div>
          <TextInput
            id="outlined-multiline-flexible"
            label="Description"
            error={error.description}
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
              error={error.type}
              label="Content Type"
              onChange={(e) => selectOption(e)}
            />
          </div>
          {thumbnail?.name?.length > 0 ? (
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
          ) : null}
          {type !== "engagement" ? (
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
                    <Typography style={{ fontSize: "10px" }}>
                      Engagement
                    </Typography>
                  }
                />
              </div>
            </div>
          ) : null}
          <div className="w-[20%]  p-4">
            <div className="border-2 border-solid border-[#DCD427] rounded-full flex justify-center">
              <FormControlLabel
                control={
                  <CustomSwitch
                    checked={contentEvent}
                    onChange={(e) => setContentEventState(e)}
                    name="Event"
                  />
                }
                label={
                  <Typography style={{ fontSize: "10px" }}>Event</Typography>
                }
              />
            </div>
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
