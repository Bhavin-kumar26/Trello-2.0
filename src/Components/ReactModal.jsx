import React, { useContext, useEffect, useState } from "react";
import { BoardContext } from "../Context/BoardContext";
import ReactDOM from "react-dom";
import { IoMdClose } from "react-icons/io";
import Modal from "react-modal";
import Utils from "../Utils/Utils";

const ReactModal = ({ heading, image, listIndex, cardIndex }) => {
  const {
    modalIsOpen,
    setIsOpen,
    toggleEditDescription,
    setToggleEditDescription,
    allBoards,
    setAllBoards,
  } = useContext(BoardContext);
  const [editedDesc, setEditedDesc] = useState("");
  const [newDesc, setNewDesc] = useState("");
  let bData = allBoards.boards[allBoards.active];
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const handelValue = () => {
    let newList = [...bData.list];
    setNewDesc(newList[listIndex].items[cardIndex].description);
  };

  useEffect(() => {
    handelValue();
  }, []);

  const handleDesc = (listIndex, cardIndex, newDesc) => {
    let newList = [...bData.list];
    newList[listIndex].items[cardIndex].description = newDesc;
    let board_ = { ...allBoards };
    board_.boards[board_.active].list = newList;
    setNewDesc(newList[listIndex].items[cardIndex].description);
    setAllBoards(board_);
    setEditedDesc("");
    setToggleEditDescription(false);
  };
  // console.log(newDesc);
  return (
    <div className="w-full  relative ">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        contentLabel="Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className=" absolute inset-0 mx-auto my-auto w-[300px] sm:w-[350px] md:w-[400px] h-fit flex flex-col bg-[#2f2f2f] px-3 py-2  gap-3 ">
          <div className=" flex  flex-col justify-between items-start">
            <div className=" flex justify-between items-center w-full">
              <p className=" text-xl text-white font-bold">{heading}</p>
              <IoMdClose
                onClick={closeModal}
                className=" text-xl text-white font-bold cursor-pointer"
              />
            </div>
            <div className=" w-full h-44 mt-1  bg-blue-300">
              <img className=" w-full h-full object-cover" src={image} alt="" />
            </div>
          </div>
          <div>
            <div className=" w-full flex justify-between items-center ">
              <h1 className=" text-white font-bold text-xl mb-2">
                Description
              </h1>
              <button
                onClick={() => setToggleEditDescription(!toggleEditDescription)}
                className="text-white bg-slate-600 px-3 py-1 rounded-2xl"
              >
                Edit
              </button>
            </div>
            {toggleEditDescription ? (
              <div>
                <textarea
                  value={editedDesc}
                  onChange={(e) => setEditedDesc(e.target.value)}
                  cols="40"
                  placeholder="Enter Description..."
                  rows="8"
                  className=" mt-2 bg-transparent text-white"
                />
                <button
                  onClick={() => handleDesc(listIndex, cardIndex, editedDesc)}
                  className="text-white bg-slate-600 px-3 py-1 rounded-2xl"
                >
                  Create
                </button>
              </div>
            ) : (
              <p className=" text-white font-normal text-md mt-2">{newDesc}</p>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReactModal;
