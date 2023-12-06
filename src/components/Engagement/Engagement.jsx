"use client";
import { Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import TextInput from "../InputComponent/TextInput";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

export default function Engagement({ className, style, data }) {
  const [questions, setQuestions] = useState([]);

  const CustomSwitch = styled(Switch)(() => ({
    "& .MuiSwitch-track": {
      width: "100%", // or specify the width you want
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#DCD427",
      "&:hover": {
        backgroundColor: "#DCD427",
      },
    },
    "& .MuiSwitch-switchBase": {
      color: "#fff",

      "&:hover": {
        backgroundColor: "#fff",
      },
    },

    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#DCD427",
      color: "#DCD427",
    },
    "& .MuiSwitch-switchBase + .MuiSwitch-track": {
      backgroundColor: "#fff",
      color: "#fff",
    },
  }));

  const addQuestion = () => {
    let newQuestion = [...questions];
    newQuestion.push({
      question: "",
      engagementType: "pool",
      optionType: "single",
      display: "hide",
      answers: [{ answer: "", status: false }],
    });
    setQuestions(newQuestion);
  };

  const removeQuestion = (indexToDelete) => {
    let newQuestion = [...questions];
    const questionAfterDelete = [
      ...newQuestion.slice(0, indexToDelete),
      ...newQuestion.slice(indexToDelete + 1),
    ];
    setQuestions(questionAfterDelete);
  };

  const changQuestionEntities = (index, type, e) => {
    let newQuestion = [...questions];
    switch (type) {
      case "question":
        newQuestion[index].question = e.target.value;
        break;
      case "engagement type":
        newQuestion[index].engagementType = e.target.value;
        break;
      case "option type":
        newQuestion[index].optionType = e.target.value;
        break;
      case "option type":
        newQuestion[index].optionType = e.target.value;
        break;
      case "display":
        newQuestion[index].display = e.target.value;
        break;
    }
    setQuestions(newQuestion);
    data(newQuestion);
  };

  const removeAnswer = (index, optionIndex) => {
    let newAnswer = [...questions];

    const answerAfterDelete = [
      ...newAnswer[index].answers.slice(0, optionIndex),
      ...newAnswer[index].answers.slice(optionIndex + 1),
    ];
    newAnswer[index].answers = answerAfterDelete;
    setQuestions(newAnswer);
    data(newAnswer);
  };

  const setSingleAnswer = (index, optionIndex, e) => {
    let newAnswer = [...questions];
    newAnswer[index].answers.map((item) => {
      item.status = false;
    });
    newAnswer[index].answers[optionIndex].status = true;
    setQuestions(newAnswer);
    data(newAnswer);
  };
  const setMultipleAnswer = (index, optionIndex, e) => {
    let newAnswer = [...questions];
    newAnswer[index].answers[optionIndex].status = e.target.value;
    setQuestions(newAnswer);
    data(newAnswer);
  };

  const addAnswer = (index) => {
    let option = { answer: "", status: false };
    let newAnswer = [...questions];
    if (newAnswer[index].answers.length < 4) {
      newAnswer[index].answers.push(option);
      setQuestions(newAnswer);
      data(newAnswer);
    } else {
      //show a message letting them know they cant create more than 4 options
    }
  };
  const changQuestionAnswerEntities = (index, optionIndex, e) => {
    let value = e.target.value;
    let question = [...questions];
    // update the answer key
    question[index].answers[optionIndex].answer = value;
    setQuestions(question);
    data(question);
    console.log("lets investigate", question);
  };

  return (
    <div>
      {questions.length > 0 ? (
        <div>
          {questions.map((item, index) => (
            <div
              className={`bg-[${
                index % 2 == 0 ? "#000" : "pink"
              }] mt-4 rounded`}
            >
              <div className="flex justify-between">
                <div className="w-[85%]">
                  <div className="flex justify-between">
                    <div className="w-[100%]">
                      <TextInput
                        id="outlined-multiline-flexible"
                        onChange={(e) =>
                          changQuestionEntities(index, "question", e)
                        }
                        label="Question"
                        inputProps={{
                          style: { fontFamily: "Arial", color: "white" },
                        }}
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
                  <div className="pl-[8px]">
                    <div className="flex justify-between">
                      <div className="w-[30%] ">
                        <FormControl>
                          <FormLabel
                            id="demo-row-radio-buttons-group-label"
                            className="text-white"
                          >
                            Engagment Type
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={item.engagementType}
                            onChange={(e) =>
                              changQuestionEntities(index, "engagement type", e)
                            }
                          >
                            <FormControlLabel
                              value="pool"
                              control={<Radio sx={{ color: "white" }} />}
                              label={
                                <span
                                  style={{ fontSize: "14px", color: "white" }}
                                >
                                  Pool
                                </span>
                              }
                              sx={{ color: "white" }}
                            />

                            <FormControlLabel
                              value="survey"
                              control={<Radio sx={{ color: "white" }} />}
                              label={
                                <span
                                  style={{ fontSize: "14px", color: "white" }}
                                >
                                  Survey
                                </span>
                              }
                              sx={{ color: "white" }}
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                      <div className="w-[30%]">
                        <FormControl>
                          <FormLabel
                            id="demo-row-radio-buttons-group-label"
                            className="text-white"
                          >
                            Option Type
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={item.optionType}
                            onChange={(e) =>
                              changQuestionEntities(index, "option type", e)
                            }
                          >
                            <FormControlLabel
                              value="single"
                              control={<Radio sx={{ color: "white" }} />}
                              label={
                                <span
                                  style={{ fontSize: "14px", color: "white" }}
                                >
                                  Single
                                </span>
                              }
                              sx={{ color: "white" }}
                            />

                            <FormControlLabel
                              value="multiple"
                              control={<Radio sx={{ color: "white" }} />}
                              label={
                                <span
                                  style={{ fontSize: "14px", color: "white" }}
                                >
                                  Multiple
                                </span>
                              }
                              sx={{ color: "white" }}
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                      <div className="w-[30%]">
                        <FormControl>
                          <FormLabel
                            id="demo-row-radio-buttons-group-label"
                            className="text-white"
                          >
                            Result Display
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={item.display}
                            onChange={(e) =>
                              changQuestionEntities(index, "display", e)
                            }
                          >
                            <FormControlLabel
                              value="hide"
                              control={<Radio sx={{ color: "white" }} />}
                              label={
                                <span
                                  style={{ fontSize: "14px", color: "white" }}
                                >
                                  Hide
                                </span>
                              }
                              sx={{ color: "white" }}
                            />
                            <FormControlLabel
                              value="show"
                              control={<Radio sx={{ color: "white" }} />}
                              label={
                                <span
                                  style={{ fontSize: "14px", color: "white" }}
                                >
                                  Show
                                </span>
                              }
                              sx={{ color: "white" }}
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div>
                          <Typography variant="h5">Options</Typography>
                        </div>
                        <div>
                          {item.answers.map((option, optionIndex) => (
                            <div className="flex justify-between">
                              <div className="w-[50%]">
                                <TextInput
                                  id="outlined-multiline-flexible"
                                  onChange={(e) =>
                                    changQuestionAnswerEntities(
                                      index,
                                      optionIndex,
                                      e
                                    )
                                  }
                                  label="Answer"
                                  inputProps={{
                                    style: {
                                      fontFamily: "Arial",
                                      color: "white",
                                    },
                                  }}
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
                              <div className="">
                                {item.optionType == "single" ? (
                                  <div>
                                    <CustomSwitch
                                      checked={option.status}
                                      onChange={(e) =>
                                        setSingleAnswer(index, optionIndex, e)
                                      }
                                      name="Spotlight"
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    <FormControl>
                                      <FormLabel
                                        id="demo-row-radio-buttons-group-label"
                                        className="text-white"
                                      >
                                        Correct / Wrong
                                      </FormLabel>
                                      <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={option.status}
                                        onChange={(e) =>
                                          setMultipleAnswer(
                                            index,
                                            optionIndex,
                                            e
                                          )
                                        }
                                      >
                                        <FormControlLabel
                                          value="false"
                                          control={
                                            <Radio sx={{ color: "white" }} />
                                          }
                                          label={
                                            <span
                                              style={{
                                                fontSize: "10px",
                                                color: "white",
                                              }}
                                            >
                                              Wrong
                                            </span>
                                          }
                                          sx={{ color: "white" }}
                                        />
                                        <FormControlLabel
                                          value="true"
                                          control={
                                            <Radio sx={{ color: "white" }} />
                                          }
                                          label={
                                            <span
                                              style={{
                                                fontSize: "10px",
                                                color: "white",
                                              }}
                                            >
                                              Correct
                                            </span>
                                          }
                                          sx={{ color: "white" }}
                                        />
                                      </RadioGroup>
                                    </FormControl>
                                  </div>
                                )}
                              </div>
                              <div className="flex justify-between items-center">
                                {item.answers.length - 1 == optionIndex ? (
                                  <div onClick={() => addAnswer(index)}>
                                    <Tooltip title="Add A New Answer">
                                      <AddIcon className="text-[30px] text-[green] cursor-pointer " />
                                    </Tooltip>
                                  </div>
                                ) : null}
                                <div>
                                  {item.answers.length - 1 != 0 ? (
                                    <Tooltip title="Remove This Answer">
                                      <CloseIcon
                                        className="text-[30px] text-[red] cursor-pointer "
                                        onClick={() =>
                                          removeAnswer(index, optionIndex)
                                        }
                                      />
                                    </Tooltip>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between  items-center">
                  {questions.length - 1 == index ? (
                    <div onClick={addQuestion}>
                      <Tooltip title="Add A New Question">
                        <AddIcon className="text-[30px] text-[green] cursor-pointer " />
                      </Tooltip>
                    </div>
                  ) : null}
                  <div onClick={() => removeQuestion(index)}>
                    {questions.length - 1 == 0 ? null : (
                      <Tooltip title="Remove This Question">
                        <CloseIcon className="text-[30px] text-[red] cursor-pointer " />
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center w-[100%]">
          <div className="" onClick={addQuestion}>
            <Tooltip title="Add New Question">
              <AddCircleRoundedIcon className="text-[60px] text-[#DCD427] cursor-pointer " />
            </Tooltip>
          </div>
        </div>
      )}
    </div>
  );
}
