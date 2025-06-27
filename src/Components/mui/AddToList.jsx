import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
const emails = ["username@gmail.com", "user02@gmail.com"];
import movieStore from "../../store/MovieStore";
import { useNavigate } from "react-router-dom";

function SimpleDialog(props) {
  const userId = localStorage.getItem("userId");

  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();

  const { listData, movieId, onClose, isLoggedIn, open } = props;

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
    onClose(null); // not returning anything to parent.
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
};

export default function AddToList(props) {
  const isLoggedIn = movieStore((state) => {
    state.loggedIn;
  });
  const { movieId } = props;
  const [listData, setListData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = async () => {
    if (!isLoggedIn) {
      alert("signup first");
      return;
    }
    setOpen(true);
    const userId = localStorage.getItem("userId");
    try {
      const res = await axios.get(`http://localhost:8080/api/list/${userId}`);
      console.log(res.data);
      setListData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div className="bg-black">
      <Button
        sx={{ bgcolor: "white", color: "black" }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Add to List
      </Button>

      <SimpleDialog
        listData={listData}
        open={open}
        onClose={handleClose}
        movieId={movieId}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}
