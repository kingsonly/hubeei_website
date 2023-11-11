"use client";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FlipCard from "@/components/FlipCard.jsx";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import step1 from "../../../public/images/step1.png";
import ActionButton from "../ActionButton";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

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

export default function KanbanBoard({ categories, handleCreateNewContent }) {
  const [state, setState] = useState(categories);

  const createNewContent = (id) => {
    handleCreateNewContent(id);
  };

  const setIsFlipped1Function = (value, index, index2) => {
    console.log(index);
    let newIsFlipped1 = [...state];
    newIsFlipped1[index].content[index2].display = value;
    setState(newIsFlipped1);
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
    } else {
      const result = move(state[sInd], state[dInd], source, destination);

      const newState = [...state];
      newState[sInd]["content"] = result[sInd];
      newState[dInd]["content"] = result[dInd];

      setState(newState);
    }
  }

  return (
    <div>
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => {
            return (
              <Droppable
                key={ind}
                droppableId={`${ind}`}
                direction="horizontal"
              >
                {(provided, snapshot) => {
                  return (
                    <div className="flex mt-10">
                      <div className="w-[20%] flex items-center justify-center">
                        <div>
                          <div className="">{el.name}</div>
                          <div
                            className="flex justify-center  mt-3"
                            onClick={() => createNewContent(el.id)}
                          >
                            <AddCircleRoundedIcon className="text-[40px] text-[#FDC435] cursor-pointer " />
                          </div>
                        </div>
                      </div>

                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                        className="mb-10 "
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
                                  <div>
                                    <FlipCard isFlipped={item.display}>
                                      <Card
                                        sx={{ width: 300, height: 300 }}
                                        onMouseEnter={() =>
                                          setIsFlipped1Function(
                                            true,
                                            ind,
                                            index
                                          )
                                        }
                                      >
                                        <CardMedia
                                          component="img"
                                          sx={{ height: 200 }}
                                          image={item.thumbnail}
                                        />
                                        <CardContent>
                                          <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                          >
                                            {item.name}
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            color="text.secondary"
                                          >
                                            {item.content_description}
                                          </Typography>
                                        </CardContent>
                                      </Card>
                                      <Card
                                        sx={{ width: 300 }}
                                        onMouseLeave={() =>
                                          setIsFlipped1Function(
                                            false,
                                            ind,
                                            index
                                          )
                                        }
                                      >
                                        <CardMedia
                                          component="img"
                                          sx={{ height: 200 }}
                                          image={item.thumbnail}
                                        />
                                        <CardContent>
                                          <Typography
                                            variant="h5"
                                            component="div"
                                          >
                                            {item.name}
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            component="div"
                                          >
                                            <div className="flex justify-between">
                                              <ActionButton withBG={true}>
                                                Updates
                                              </ActionButton>
                                              <ActionButton
                                                withText="text-[#bbb]"
                                                withBorder={true}
                                              >
                                                {" "}
                                                Delete
                                              </ActionButton>
                                            </div>
                                          </Typography>
                                        </CardContent>
                                      </Card>
                                    </FlipCard>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
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
