import React, { useState, useEffect } from "react";
import SERVER from "../config/config";
import axios from "axios";
import SpecialButton from "../components/SpecialButton";

const Main = () => {
  const [task, setTask] = useState("");
  const [list, updateList] = useState([]);

  const loadList = () => {
    axios.get(SERVER).then((res) => {
      updateList(res.data);
    });
  };

  useEffect(loadList, []);

  const postTask = () => {
    axios.post(SERVER, { task }).then((res) => updateList(res.data));
    setTask("");
  };

  const updateTask = (event, index) => {
    let value = event.target.value;

    axios
      .put(SERVER + String(index + 1), { value })
      .then((res) => updateList(res.data));
  };

  const deleteTask = (index) => {
    axios
      .delete(SERVER + String(index + 1))
      .then((res) => updateList(res.data));
  };

  const adjustTask = (event, index) => {
    let temp = [...list];
    temp[index] = event.target.value;
    updateList(temp);
  };

  return (
    <div className="container">
      <p className="header">TO-DO LIST</p>
      <div className="neat">
        <input
          value={task}
          className="input add"
          onChange={(event) => setTask(event.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              postTask();
            }
          }}
        />
        <SpecialButton onClick={postTask} className="button-add" value="ADD" />
      </div>
      <ul className="list">
        {list.map((_, index) => {
          return (
            <li className="neat">
              <input
                className="input delete"
                value={list[index]}
                style={{
                  backgroundColor: index % 2 === 0 ? "white" : "#f0eff1",
                }}
                onChange={(event) => adjustTask(event, index)}
                onBlur={(event) => updateTask(event, index)}
              />
              <SpecialButton
                onClick={() => deleteTask(index)}
                className="button-delete"
                value="x"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Main;
