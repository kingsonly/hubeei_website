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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ClearIcon from "@mui/icons-material/Clear";
/**
 * Moves an item from one list to another list.
 */

export default function KanBanCard({
  item,
  viewContents,
  updateContent,
  deleteContent,
}) {
  const [iconStatus, setIconStatus] = useState(false);

  const showIcon = () => {
    setIconStatus(true);
  };

  const removeIcon = () => {
    setIconStatus(false);
  };
  const viewContent = (item) => {
    viewContents(item);
  };
  const handleContentUpdate = (item) => {
    updateContent(item);
  };
  const handleContentDelete = (item) => {
    deleteContent(item);
  };

  return (
    <div>
      <Card sx={{ width: 300 }}>
        <CardMedia
          component="img"
          sx={{ height: 200 }}
          image={`${process.env.NEXT_PUBLIC_DOCUMENTS}public${item.thumbnail}`}
        />
        <CardContent
          style={{
            height: "50px",
          }}
        >
          {!iconStatus ? (
            <div className="flex">
              <div className="w-[80%]">{item.name}</div>
              <div className="grid justify-items-end w-[20%]">
                <div className="cursor-default" onClick={() => showIcon()}>
                  <MoreVertIcon />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-between">
              <div className="flex justify-between w-[80%]">
                <div
                  onClick={() => viewContent(item)}
                  className={"cursor-pointer"}
                >
                  <VisibilityIcon />
                </div>
                <div
                  onClick={() => handleContentUpdate(item)}
                  className={"cursor-pointer"}
                >
                  <EditIcon />
                </div>
                <div
                  onClick={() => handleContentDelete(item)}
                  className={"cursor-pointer"}
                >
                  <DeleteOutlineIcon />
                </div>
              </div>
              <div onClick={() => removeIcon()}>
                <ClearIcon className="text-[red] cursor-default" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
