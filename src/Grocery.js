import React, { useState, useEffect } from "react";
import Message from "./Message";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function Grocery() {
  const [isEdit, setIsEdit] = useState(false);
  const [IsMsg, setIsMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const [idForEdit, setIdForEdit] = useState();
  const [item, setItem] = useState();
  const [list, setList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit && idForEdit && item) {
      const editedItem = list.find((item) => item.id === idForEdit);
      editedItem.item = item;
      setItem("");
      setIsMsg(true);
      setMsg("Value Changed");
      setIsEdit(false);
    }
    if (item && isEdit === false) {
      const newItem = { id: new Date().getTime().toString(), item };
      setList([...list, newItem]);
      setItem("");
      setIsMsg(true);
      setMsg("Item added to the list");
    }
  };

  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    setIsMsg(true);
    setMsg("Item removed");
  };

  const editItem = (id) => {
    setIsEdit(true);
    setIdForEdit(id);
  };

  return (
    <>
      <article className="container">
        <div className="msgBox">{IsMsg && <Message msg={msg} setIsMsg={setIsMsg} />}</div>
        <h4 className="heading">Grocery Bud</h4>
        <div className="underline"></div>
        <form onSubmit={handleSubmit}>
          <div className="inputBox">
            <input
              type="text"
              id="item"
              name="item"
              placeholder="e.g. eggs"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
            <button type="submit" className="submitButton">
              {isEdit ? "Edit" : "Submit"}
            </button>
          </div>
        </form>
        {list.map((item) => {
          return (
            <div key={item.id} className="item">
              <span className="itemName">{item.item}</span>
              <div className="itemButtons">
                <button
                  onClick={() => {
                    editItem(item.id);
                  }}
                  className="editButton"
                >
                  <AiFillEdit />
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="deleteButton"
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          );
        })}
        {list.length > 0 && (
          <button
            onClick={() => {
              setList([]);
              setIsMsg(true);
              setMsg("Empty List");
            }}
            className="clearButton"
          >
            Clear Items
          </button>
        )}
      </article>
    </>
  );
}

export default Grocery;
