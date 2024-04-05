"use client";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FlipCard from "../../components/FlipCard.jsx";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
//import step1 from "../../../public/images/step1.png";
import ActionButton from "../ActionButton";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KanBanCard from "./KanbanCard";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Tooltip } from "@mui/material";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list["content"]);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  list.content = result;

  return list;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source["content"]);
  const destClone = Array.from(destination["content"]);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  //source.cards = sourceClone
  //destination.cards = destClone
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 10;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  ...draggableStyle,
  background: isDragging ? "lightgreen" : "",

  // styles we need to apply on draggables
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "",
  padding: grid,
  width: "100%",
  display: "flex",
});

export default function KanbanBoard({
  categories,
  handleCreateNewContent,
  viewContents,
  updateContent,
  deleteContent,
}) {
  const [state, setState] = useState(categories);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const createNewContent = (id) => {
    handleCreateNewContent(id);
  };

  const viewContent = (item) => {
    viewContents(item);
  };

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
      console.log("i am data", newState);
      changeContentPosition(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd]["content"] = result[sInd];
      newState[dInd]["content"] = result[dInd];

      setState(newState);
      // post data to saver from here
      console.log("i am data", newState);
      changeContentPosition(newState);
    }
  }

  const changeContentPosition = async (data) => {
    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}content/change-content-position`,
      { data: data }
    );

    if (response.data.status == "success") {
      console.log("done");
    } else {
      console.log("error");
    }
  };

  return (
    <div>
      <div className="">
        <DragDropContext onDragEnd={onDragEnd}>
          {console.log("contents", state)}
          {state.map((el, ind) => {
            return (
              <Droppable
                key={ind}
                droppableId={`${ind}`}
                direction="horizontal"
              >
                {(provided, snapshot) => {
                  return (
                    <div className="min-h-[300px] ">
                      <div className="w-[100%] ">
                        <Typography
                          variant="h4"
                          className="font-roboto uppercase"
                        >
                          {el.name}
                        </Typography>
                      </div>

                      <div className="flex ">
                        <div className="w-[20%] flex items-center justify-center">
                          <div>
                            <div
                              className="flex justify-center  mt-3"
                              onClick={() => createNewContent(el.id)}
                            >
                              <Tooltip
                                className="capitalize"
                                title={`Create A New ${el.name} Content`}
                              >
                                <AddCircleRoundedIcon className="text-[40px] text-[#DCD427] cursor-pointer " />
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                        {el.content.length > 0 ? (
                          <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                            className="mb-10 overflow-x-auto bg-[transparent]  min-h-[250px] "
                          >
                            {el.content.map((item, index) => {
                              return (
                                <Draggable
                                  key={`${item.id}`}
                                  draggableId={`${item.id}`}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                      )}
                                    >
                                      <KanBanCard
                                        item={item}
                                        viewContents={() => viewContent(item)}
                                        updateContent={() =>
                                          updateContent(item)
                                        }
                                        deleteContent={() =>
                                          deleteContent(item)
                                        }
                                      />
                                    </div>
                                  )}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        ) : (
                          <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                            className="mb-10 overflow-x-auto bg-[transparent]  min-h-[250px] "
                            onClick={() => createNewContent(el.id)}
                          >
                            <div class="relative w-full h-full">
                              <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span class="text-gray-300 text-2xl font-bold italic opacity-50">
                                  Drag Content Here{" "}
                                  <span className="bg-[]"> OR </span>
                                  <span>Click button</span>
                                  <div className="flex justify-center  mt-3">
                                    <Tooltip
                                      className="capitalize"
                                      title={`Create A New ${el.name} Content`}
                                    >
                                      <AddCircleRoundedIcon className="text-[40px] text-[#DCD427] cursor-pointer " />
                                    </Tooltip>
                                  </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }}
              </Droppable>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}
