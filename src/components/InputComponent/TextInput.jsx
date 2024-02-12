// import { Select } from "antd";
import React, { Children } from "react";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { styled } from "@mui/system";
// const useStyles = makeStyles({
//   fullWidth: {
//     width: '100%',
//     border: '1px solid gray',
//     borderRadius: '4px',
//     padding: '8px',
//   },
//   datePicker: {
//     '& .MuiOutlinedInput-notchedOutline': {
//       borderColor: 'red', // Default border color
//     },
//   },
//   error: {
//     '& .MuiOutlinedInput-notchedOutline': {
//       borderColor: 'red', // Error border color
//     },
//   },
// });

const MainInpute = styled(TextField)(({}) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
}));

const DatePickers = styled(DatePicker)(({ theme, error }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: error ? "red" : "gray",
    },
    "&:hover fieldset": {
      borderColor: error ? "red" : "gray",
    },
    "&.Mui-focused fieldset": {
      borderColor: error ? "red" : "gray",
    },
  },
}));

const Selects = styled(Select)(({ theme, error }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: error ? "red" : "gray",
    },
    "&:hover fieldset": {
      borderColor: error ? "red" : "gray",
    },
    "&.Mui-focused fieldset": {
      borderColor: error ? "red" : "gray",
    },
  },
}));

export default function TextInput(props) {
  let {
    type,
    label,
    textArea,
    isSelect,
    onChange,
    value,
    options,
    error,
    defaultValue,
  } = props;
  //const classes = useStyles();
  const inputClasses =
    "w-full px-4 py-2 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const errorClasses = "border-red-500 focus:ring-red-500";

  const render = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            {...props}
            autoComplete="none"
            label={label}
            className={`text_area ${props.className} ${
              error ? errorClasses : ""
            }`}
          ></textarea>
        );

      case "select":
        return (
          <FormControl fullWidth className="ml-[10px]">
            <InputLabel
              id="demo-simple-select-label"
              sx={{
                color: "white",

                ".MuiOutlinedInput-notchedOutline": {
                  color: "white",
                  borderColor: "white",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  color: "white",
                  borderColor: "white",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  color: "white",
                  borderColor: "white",
                },
                ".MuiSvgIcon-root ": {
                  color: "white",
                  fill: "white !important",
                },
              }}
            >
              {" "}
              {label}
            </InputLabel>
            <Selects
              error={error}
              labelId="demo-simple-select-label"
              // id="demo-simple-select"
              label={label}
              value={value}
              defaultValue={defaultValue}
              className={`${
                error ? errorClasses : "border-red-500 focus:ring-red-500"
              }`}
              onChange={onChange}
              sx={{
                color: "white",
                ".MuiOutlinedInput-notchedOutline": {
                  color: "white",
                  borderColor: "white",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  color: "white",
                  borderColor: "white",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  color: "white",
                  borderColor: "white",
                },
                ".MuiSvgIcon-root ": {
                  color: "white",
                  fill: "white !important",
                },
              }}
              inputProps={{ style: { fontFamily: "Arial", color: "white" } }}
              style={{ flex: 1, color: "white" }}
            >
              {options?.map((option) => (
                <MenuItem value={option.value}>{option.label}</MenuItem>
              ))}
            </Selects>
          </FormControl>
        );

      case "date":
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePickers
              error={error}
              label={label}
              value={value}
              onChange={onChange}
              className={`h-[70px] w-[100%]  ${error ? errorClasses : ""}`}
              renderInput={(params) => (
                <TextField
                  className={`  ${error ? errorClasses : ""}`}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        );

      default:
        return (
          <MainInpute
            {...props}
            autoComplete="none"
            fullWidth
            sx={{
              m: 1,
              maxWidth: "100%",
              "& .MuiFormLabel-root": {
                color: "white",
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: "white",
              },
            }}
            inputProps={{ style: { fontFamily: "Arial", color: "white" } }}
            style={{ flex: 1, color: "white" }}
            className={`flex justify-center ${error ? errorClasses : ""}`}
            required
          />
        );
    }
  };

  return <div className="input_container">{render()}</div>;
}
