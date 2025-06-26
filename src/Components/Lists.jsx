import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";
import ListCard from "./ListCard";

import axios from "axios";
function Lists() {
  const [lists, setLists] = useState([]);
  const id = localStorage.getItem("userId");

  const [renderForm, setRenderForm] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/list/${id}`)
      .then((res) => {
        console.log(res.data);
        setLists(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function onSubmit(data) {
    const obj = { ...data, id: id };
    console.log(obj);

    axios
      .post("http://localhost:8080/api/list/add-new", obj)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    console.log(data);
    setLists([...lists, data]);
  }

  function handleAdd() {
    setRenderForm(true);
  }
  return (
    <div>
      <div className="header flex justify-evenly">
        <h1>My List</h1>
        <button
          onClick={handleAdd}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
        >
          Add new
        </button>
      </div>
      {renderForm ? (
        <div className="form-container max-w-2xl mx-auto my-6 p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Create New List</h2>
            <button
              onClick={() => setRenderForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          {/* rhk validates the input details through handle submit it's like spring aop. */}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                List Name
              </label>
              <input
                placeholder="Enter list name"
                {...register("name", { required: "List name is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                placeholder="Optional description"
                {...register("description")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setRenderForm(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Create List
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <div className="list-container flex bg-amber-400 w-dvw h-dvh p-5 rounded-2xl">
        {lists.length > 0 ? (
          lists.map((el, idx) => {
            return (
              <ListCard
                key={idx}
                id={idx}
                name={el.name}
                description={el.description}
              />
            );
          })
        ) : (
          <p>create lists</p>
        )}
      </div>
    </div>
  );
}

export default Lists;
