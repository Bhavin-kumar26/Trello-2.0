import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const AddList = ({ getList }) => {
  const [show, setShow] = useState(false);
  const [list, setList] = useState("");

  const saveData = () => {
    if (!list) {
      return;
    }
    getList(list);
    setList("");
    setShow(!setShow);
  };
  return (
    <div className=" my-3 bg-black h-fit w-60 p-1 rounded-md flex-shrink-0">
      {show && (
        <div>
          <textarea
            value={list}
            onChange={(e) => setList(e.target.value)}
            className=" w-full bg-slate-600"
            rows="2"
          ></textarea>
          <div className=" flex justify-start items-center gap-4 my-1">
            <button
              onClick={saveData}
              className=" bg-sky-400 p-1 rounded-md font-semibold"
            >
              Add List
            </button>
            <button
              onClick={() => setShow(!show)}
              className=" hover:bg-slate-500"
            >
              <IoClose />
            </button>
          </div>
        </div>
      )}
      {!show && (
        <div className=" flex justify-center font-bold">
          <button
            onClick={() => setShow(!show)}
            className=" font-light text-[#ede9e9]"
          >
            Add a list
          </button>
        </div>
      )}
    </div>
  );
};

export default AddList;
