import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const userId = localStorage.getItem("userId");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { listData, movieId } = props;

  const { onClose, selectedValue, open } = props;

  const onSubmit = async (userlistData) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/list/${userId}/add`,
        {
          userId: userId,
          movieId: movieId,
          ["lists"]: userlistData.checkbox,
        }
      );
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select lists to add movie</DialogTitle>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <ul className="container">
          {" "}
          {listData.map((el, idx) => {
            return (
              <li className="flex" key={idx}>
                {el.name}
                <input
                  {...register("checkbox")}
                  type="checkbox"
                  value={el.name}
                />
              </li>
            );
          })}
        </ul>

        <input type="submit" />
      </form>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function BasicModal(props) {
  const { movieId } = props;
  const [listData, setListData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
    const userId = localStorage.getItem("userId");
    axios
      .get(`http://localhost:8080/api/list/${userId}`)
      .then((res) => {
        console.log(res.data);
        setListData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>

      <SimpleDialog
        listData={listData}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        movieId={movieId}
      />
    </div>
  );
}
