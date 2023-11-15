"use client";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import KanbanBoard from "@/components/Kanban/KanbanBoard";
import Sidebar from "@/components/SideBar/SideBar";
import { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AppModal from "@/components/modalcomponent/AppModal";
import { styled } from "@mui/system";
import ActionButton from "@/components/ActionButton";
import CategoryContent from "@/components/CategoryContent/CategoryContent";
import { useEffect } from "react";
import axios from "axios";
import DashboardHubs from "@/components/Dashboard/DashboardHubs";
import TextInput from "@/components/InputComponent/TextInput";
export default function Page() {
  const [selectedHub, setSelectedHub] = useState(false);
  const [hubs, setHubs] = useState([]);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [openCategory, setOpenCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState();

  useEffect(() => {
    bootstrap();
  }, []);

  const init = async () => {
    // there is no selected hub in the local storage , then get a list of all the hubs
    let getHub = localStorage.getItem("hub");
    if (getHub == undefined) {
      let userId = localStorage.getItem("userData");
      let response = await axios.get(
        `https://api.hubeei.skillzserver.com/api/usershub/${userId}`
      );

      if (response.data.status == "success") {
        // save state which would be used to display the list of hubs
        // set the dashboad to show modal and display the list of hubs for that user
        setHubs(response.data.data);
      } else {
        //handle the error here
      }
    } else {
      setLoader(true);
      let id = localStorage.getItem("hub");
      action(id);
      setSelectedHub(true);
      // fetch all hub details and display on the dashboard
    }
  };

  const bootstrap = () => {
    init();
  };

  const fabStyle = {
    position: "fixed",
    bottom: 150,
    right: 16,
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseCategory = () => {
    setOpenCategory(false);
  };

  const handleOpen = (id) => {
    setOpen(true);
    setCategoryId(id);
  };

  const handleOpenCategory = () => {
    setOpenCategory(true);
  };

  const createCategory = async () => {
    let data = {
      name: title,
      hub_id: localStorage.getItem("hub"),
    };
    setLoader(true);
    // after showing loader fetch every hub content
    let response = await axios.post(
      `https://api.hubeei.skillzserver.com/api/create-category`,
      data
    );
    console.log(response);
  };

  const action = async (id) => {
    setLoader(true);
    // after showing loader fetch every hub content
    let response = await axios.get(
      `https://api.hubeei.skillzserver.com/api/category-content/${id}`
    );

    if (response.data.status == "success") {
      // save state which would be used to display the list of hubs
      // set the dashboad to show modal and display the list of hubs for that user
      setCategories(response.data.data);
      setLoader(false);
      localStorage.setItem("hub", id);
      setSelectedHub(true);
      console.log(response.data.data);
    } else {
      setCategories([]);
    }
  };

  return (
    <main className="flex">
      <AppModal open={open} handleClose={handleClose}>
        <CategoryContent categoryId={categoryId} />
      </AppModal>

      <AppModal open={!selectedHub}>
        {!loader ? (
          <div>
            <div>
              <h1 className="text-[40px] mb-10 text-center">Select Your Hub</h1>
            </div>
            <div className="flex justify-between">
              {hubs.map((value) => (
                <DashboardHubs
                  title={value.name}
                  action={() => action(value.id)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>loading hub content </div>
        )}
      </AppModal>

      <AppModal open={openCategory} handleClose={handleCloseCategory}>
        <div className="flex justify-center ">
          <h1 className="text-[25px]">Create New Category</h1>
        </div>
        <div className="flex justify-center mt-6  ">
          <TextInput
            fullWidth
            id="outlined-multiline-flexible"
            label="Title"
            inputProps={{
              style: { fontFamily: "Arial", color: "white" },
            }}
            style={{ flex: 1, color: "white" }}
            onChange={(e) => setTitle(e.target.value)}
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

        <div className="flex justify-end mt-6 ">
          <ActionButton handleClick={createCategory} withBG={true}>
            {" "}
            Create
          </ActionButton>
        </div>
      </AppModal>
      {selectedHub ? (
        <div className="flex w-[100%]">
          <div className="w-[30%] h-[100vh] ">
            <Sidebar />
          </div>

          <div className="w-[100%] pl-[30px]">
            <div className="w-[100%] flex justify-between">
              <div className="w-[30%]">
                <DashboardCard
                  title="Total Category"
                  total="20"
                  completed="10"
                  ongoing="5"
                  completedtitle="Active"
                  ongoingtitle="Deleted"
                />
              </div>
              <div className="w-[30%]">
                <DashboardCard
                  title="Total Content"
                  total="20"
                  completed="10"
                  ongoing="5"
                  completedtitle="Liked"
                  ongoingtitle="Deleted"
                />
              </div>
              <div className="w-[30%]">
                <DashboardCard
                  title="Total Size"
                  total="20"
                  completed="10"
                  ongoing="5"
                  completedtitle="Used"
                  ongoingtitle="Available"
                />
              </div>
            </div>
            <div>
              {categories.length > 0 ? (
                <KanbanBoard
                  categories={categories}
                  handleCreateNewContent={handleOpen}
                />
              ) : null}
            </div>
          </div>
          <Fab
            id="fabs"
            sx={fabStyle}
            color="primary"
            aria-label="add"
            onClick={() => handleOpenCategory()}
          >
            <AddIcon />
          </Fab>
        </div>
      ) : null}
    </main>
  );
}
