"use client";
import Image from "next/image";
import AppButtons from "../components/AppButtons.js";
import bg from "../../public/images/headerimage.png";
import footer from "../../public/images/footer.png";
import step1 from "../../public/images/step1.png";
import step2 from "../../public/images/step2.png";
import step3 from "../../public/images/step3.png";
import logo from "../../public/images/logo.jpeg";
import ActionButton from "@/components/ActionButton.jsx";
import FlipCard from "@/components/FlipCard.jsx";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import Button from "@mui/joy/Button";
import CardActions from "@mui/joy/CardActions";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Check from "@mui/icons-material/Check";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import AppModal from "@/components/modalcomponent/AppModal.js";
import TextInput from "@/components/InputComponent/TextInput.jsx";
import Axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import CheckIcon from "@mui/icons-material/Check";
import { useRouter } from "next/navigation";
export default function Home() {
  const [isFlipped1, setIsFlipped1] = useState(false);
  const [isFlipped2, setIsFlipped2] = useState(false);
  const [isFlipped3, setIsFlipped3] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [openLogin, setOpenLogin] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hubName, setHubName] = useState("");
  const [hubUrl, setHubUrl] = useState("");
  const [hubDescription, setHubDescription] = useState("");

  useEffect(() => {
    bootstrap();
  }, []);

  const bootstrap = () => {
    isLoggedIn();
  };

  const isLoggedIn = () => {
    // check if a user is logged in and redirect the user to the dashboard page
    let token = localStorage.getItem("token");
    if (token != undefined) {
      router.push("/dashboard");
    }
  };

  const headerStyle = {
    backgroundImage: `url('${bg.src}') `,
    backgroundSize: "100% 90%",
  };
  const footerStyle = {
    backgroundImage: `url('${footer.src}') `,
    backgroundSize: "100% 90%",
  };

  const handleInputes = (e, name) => {
    switch (name) {
      case "firstname":
        setFirstName(e.target.value);
        break;
      case "lastname":
        setLastName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "hubname":
        setHubName(e.target.value);
        break;
      case "huburl":
        setHubUrl(e.target.value);
        break;
      case "description":
        setHubDescription(e.target.value);
        break;
    }
  };

  const register = async () => {
    if (!loader) {
      setLoader(true);
      let data = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        name: hubName,
        url: hubUrl,
        hubDescription: hubDescription,
      };
      try {
        const response = await Axios.post(
          "https://api.hubeei.skillzserver.com/api/register",
          data
        );
        if (response.data.status == "success") {
          setSuccess(true);
        } else {
          //handle the error here
        }
        setLoader(false);
      } catch (error) {}
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleOpenLoginAfterRegistration = () => {
    setSuccess(false);
    setOpen(false);
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenCategory = () => {
    setOpenCategory(true);
  };

  const handleLogin = async () => {
    // validate data and then perform login

    if (!loader || loader) {
      setLoader(true);
      let data = {
        email: loginEmail,
        password: loginPassword,
      };
      try {
        const response = await Axios.post(
          "https://api.hubeei.skillzserver.com/api/login",
          data
        );
        if (response.data.status == "success") {
          // save token and redirect to dashboard page
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("userData", JSON.stringify(response.data.data));
          console.log("abc", response.data.data.token);

          router.push("/dashboard");
        } else {
          //handle the error here
        }
        setLoader(false);
      } catch (error) {}
    }
  };
  return (
    <main>
      <AppModal open={openLogin} handleClose={handleCloseLogin}>
        <div>
          <div className="flex justify-center">
            <div>
              <Image src={logo.src} width={200} height={200} />
            </div>
          </div>
          <div className="mt-4">
            <TextInput
              id="outlined-multiline-flexible"
              label="Email"
              inputProps={{
                style: { fontFamily: "Arial", color: "white" },
              }}
              style={{ flex: 1, color: "white" }}
              maxRows={10}
              onChange={(e) => setLoginEmail(e.target.value)}
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
          <div className="mt-4">
            <TextInput
              id="outlined-multiline-flexible"
              label="Password"
              type="password"
              inputProps={{
                style: { fontFamily: "Arial", color: "white" },
              }}
              style={{ flex: 1, color: "white" }}
              maxRows={10}
              onChange={(e) => setLoginPassword(e.target.value)}
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
          <div className="flex justify-end">
            <div>
              <div>forgoten password</div>
              <ActionButton handleClick={handleLogin} withBG={true}>
                Login
              </ActionButton>
            </div>
          </div>
        </div>
      </AppModal>

      <AppModal open={open} handleClose={handleClose}>
        {!success ? (
          <div>
            <div className="flex justify-between">
              <div className="w-[45%]">
                <TextInput
                  id="outlined-multiline-flexible"
                  label="Firstname"
                  inputProps={{
                    style: { fontFamily: "Arial", color: "white" },
                  }}
                  style={{ flex: 1, color: "white" }}
                  maxRows={10}
                  onChange={(e) => handleInputes(e, "firstname")}
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
              <div className="w-[45%]">
                <TextInput
                  id="outlined-multiline-flexible"
                  label="Lastname"
                  onChange={(e) => handleInputes(e, "lastname")}
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
            <div className="flex justify-between">
              <div className="w-[45%]">
                <TextInput
                  id="outlined-multiline-flexible"
                  label="Email"
                  onChange={(e) => handleInputes(e, "email")}
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
              <div className="w-[45%]">
                <TextInput
                  id="outlined-multiline-flexible"
                  label="Password"
                  onChange={(e) => handleInputes(e, "password")}
                  type="password"
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
            <div className="flex justify-between">
              <div className="w-[45%]">
                <TextInput
                  id="outlined-multiline-flexible"
                  label="Hub Name"
                  onChange={(e) => handleInputes(e, "hubname")}
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
              <div className="w-[45%] flex ">
                <div className="w-[65%]">
                  <TextInput
                    id="outlined-multiline-flexible"
                    label="Hub Url"
                    onChange={(e) => handleInputes(e, "huburl")}
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
                <div className="grid justify-center content-center w-[35%] border-l-[0px] border-[1px] rounded mt-2 h-[55px] border-solid border-[#fff]">
                  <div>.Hubeei.com</div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <TextInput
                  id="outlined-multiline-flexible"
                  label="Description"
                  onChange={(e) => handleInputes(e, "description")}
                  multiline
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
            <div className="flex justify-end">
              <div>
                <ActionButton handleClick={register} withBG={true}>
                  <div className="flex justify-between">
                    <div>Register</div>
                    {loader ? (
                      <div>
                        <CircularProgress className="text-[#000]" size={20} />
                      </div>
                    ) : null}
                  </div>
                </ActionButton>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <div>
                <Typography gutterBottom variant="h3" component="div">
                  Account was created successfully
                </Typography>
              </div>
              <div className="text-center">
                <CheckIcon className="text-[green] text-[100px]" />
              </div>
            </div>
            <div className="flex justify-center">
              <ActionButton
                handleClick={handleOpenLoginAfterRegistration}
                withBG={true}
              >
                Go To Login
              </ActionButton>
            </div>
          </div>
        )}
      </AppModal>
      <div className="flex h-[90vh]">
        <div className="w-[50%]">
          <div>
            <Image src={logo.src} width={200} height={200} />
          </div>
          <div className="grid justify-items-center  content-center h-[80%]  ">
            <div className="w-[60%]">
              <h1 className="text-[35px] text-bold text-[#ccc]">
                HELP PEOPLE FIND YOUR CONTENT
              </h1>
              <h2 className="text-[25px] text-bold text-[#DCD427] mt-4">
                Seamlessly white-label your Netflix-style content hub as part of
                your brand. Boost audience engagement and brand awareness
                instantly.
              </h2>
              <em className="mt-4 block text-[25px]">
                <strong>
                  Grow your business by increasing traffic to your most valuable
                  content.
                </strong>
                <div className="flex justify-between text-[14px] mt-4">
                  <AppButtons>SEO</AppButtons>
                  <AppButtons>Engagement</AppButtons>
                  <AppButtons>Content Authority</AppButtons>
                  <AppButtons>Collect Data</AppButtons>
                </div>
              </em>
            </div>
            <div className="mt-10 w-[60%]">
              <div className="flex justify-between w-[90%]">
                <ActionButton handleClick={handleOpen} withBG={true}>
                  Try It Free
                </ActionButton>
                <ActionButton handleClick={handleOpenLogin} withBorder={true}>
                  {" "}
                  Login
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[50%] bg-no-repeat" style={headerStyle}></div>
      </div>
      <div className="w-[100%] text-center grid justify-items-center  content-center after:content-[''] after:block after:bg-[#DCD427] after:rounded after:mt-2  after:h-[5px] after:w-[200px]">
        <h1 className="text-[45px] text-bold text-[#fff]">
          Three easy
          <span class="before:block before:absolute before:-inset-1 before:ml-2  before:mr-2  before:bg-[#DCD427] relative ">
            <span class="relative text-black"> steps </span>
          </span>
          to get started
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8 justify-items-center  content-center">
        <FlipCard isFlipped={isFlipped1}>
          <Card sx={{ maxWidth: 400 }} onMouseEnter={() => setIsFlipped1(true)}>
            <CardMedia
              component="img"
              height="140"
              image={step1.src}
              classes="h-[500px]"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Personalise your hub
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{ maxWidth: 400 }}
            onMouseLeave={() => setIsFlipped1(false)}
          >
            <CardMedia component="img" height="140" image={step1.src} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Personalise your hub
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Easily tweak the look and feel of your hub using the control
                panel.
              </Typography>
            </CardContent>
          </Card>
        </FlipCard>

        <FlipCard isFlipped={isFlipped2}>
          <Card sx={{ maxWidth: 400 }} onMouseEnter={() => setIsFlipped2(true)}>
            <CardMedia component="img" height="140" image={step1.src} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Upload your content
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{ maxWidth: 400 }}
            onMouseLeave={() => setIsFlipped2(false)}
          >
            <CardMedia component="img" height="140" image={step1.src} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Upload your content
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upload all the different types of content and create all the
                categories required.
              </Typography>
            </CardContent>
          </Card>
        </FlipCard>

        <FlipCard isFlipped={isFlipped3}>
          <Card sx={{ maxWidth: 400 }} onMouseEnter={() => setIsFlipped3(true)}>
            <CardMedia component="img" height="140" image={step1.src} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Share
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{ maxWidth: 400 }}
            onMouseLeave={() => setIsFlipped3(false)}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={step1.src}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Share
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Share the link or embed directly into your website
              </Typography>
            </CardContent>
          </Card>
        </FlipCard>
      </div>

      <div className=" mt-36 w-[100%] text-center grid justify-items-center  content-center after:content-[''] after:block after:bg-[#DCD427] after:rounded after:mt-2  after:h-[5px] after:w-[100px]">
        <h1 className="text-[45px] text-bold text-[#fff]">Pricing</h1>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8 justify-items-center  content-center">
        <div className="w-[400px]">
          <Card sx={{ maxWidth: 400 }}>
            <Chip size="sm" variant="outlined" color="neutral">
              BASIC
            </Chip>
            <Typography level="h2">Professional</Typography>

            <List size="sm" sx={{ mx: "calc(-1 * var(--ListItem-paddingX))" }}>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Virtual Credit Cards
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Financial Analytics
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Checking Account
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                API Integration
              </ListItem>
            </List>
            <Divider inset="none" />
            <CardActions>
              <Typography level="title-lg" sx={{ mr: "auto" }}>
                3.990€{" "}
              </Typography>
              <Button
                variant="soft"
                color="neutral"
                endDecorator={<KeyboardArrowRight />}
              >
                Start now
              </Button>
            </CardActions>
          </Card>
        </div>

        <div className="w-[400px]">
          <Card sx={{ maxWidth: 400 }}>
            <Chip size="sm" variant="outlined" color="neutral">
              BASIC
            </Chip>
            <Typography level="h2">Professional</Typography>

            <List size="sm" sx={{ mx: "calc(-1 * var(--ListItem-paddingX))" }}>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Virtual Credit Cards
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Financial Analytics
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Checking Account
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                API Integration
              </ListItem>
            </List>
            <Divider inset="none" />
            <CardActions>
              <Typography level="title-lg" sx={{ mr: "auto" }}>
                3.990€{" "}
              </Typography>
              <Button
                variant="soft"
                color="neutral"
                endDecorator={<KeyboardArrowRight />}
              >
                Start now
              </Button>
            </CardActions>
          </Card>
        </div>

        <div className="w-[400px]">
          <Card sx={{ maxWidth: 400 }}>
            <Chip size="sm" variant="outlined" color="neutral">
              BASIC
            </Chip>
            <Typography level="h2">Professional</Typography>

            <List size="sm" sx={{ mx: "calc(-1 * var(--ListItem-paddingX))" }}>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Virtual Credit Cards
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Financial Analytics
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Checking Account
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                API Integration
              </ListItem>
            </List>
            <Divider inset="none" />
            <CardActions>
              <Typography level="title-lg" sx={{ mr: "auto" }}>
                3.990€{" "}
              </Typography>
              <Button
                variant="soft"
                color="neutral"
                endDecorator={<KeyboardArrowRight />}
              >
                Start now
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
      <div id="p" className="bg-no-repeat h-[200px] mt-10" style={footerStyle}>
        hjujbjb
      </div>
    </main>
  );
}
