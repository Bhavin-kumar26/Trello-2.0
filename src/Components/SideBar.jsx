import React, { useContext, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaPlus } from "react-icons/fa";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Popover } from "react-tiny-popover";
import { BoardContext } from "../Context/BoardContext";

const SideBar = () => {
  const blankBoard = {
    name: "",
    bgcolor: "#ff3232",
    list: [],
  };
  const {allBoards, setAllBoards} = useContext(BoardContext)
  const [boardsData, setBoardsData] = useState(blankBoard);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [currentBoardIndex, setCurrentBoardIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [boardId, setBoardId] = useState(null);
  const [newEditedBoard, setNewEditedBoard] = useState("");

  const setActiveBoard = (index) => {
    let newBoard = { ...allBoards };
    newBoard.active = index;
    setAllBoards(newBoard);
  };

  const addData = () => {
    let newb = { ...allBoards };
    newb.boards.push(boardsData);
    setAllBoards(newb);
    setBoardsData(blankBoard);
    setIsPopoverOpen(false);
  };

  const deleteBoard = (index) => {
    if (index < 1) {
      alert("You can't delete the final Board Too");
    } else {
      const newBoards = allBoards.boards.filter((_, i) => i !== index);
      let newBoard = { ...allBoards };
      newBoard.boards = newBoards;
      newBoard.active =
        newBoards.length > 0 ? Math.max(0, newBoard.active - 1) : null;
      setAllBoards(newBoard);
      setIsOpen(false);
    }
  };

  const handleEditBoard = (index, newBoardTitle) => {
    let board_ = { ...allBoards };
    board_.boards[index].name = newBoardTitle;
    setAllBoards(board_);
    setBoardId(null);
  };

  return (
    <div
      className={` ${
        showSidebar ? " w-[300px] shadow-2xl" : "w-[3.3rem]"
      } transition-all ease-linear duration-200 h-screen z-10  bg-transparent  text-black py-3 flex-shrink-0`}
    >
      {!showSidebar && (
        <div className=" border-b-2 p-3 border-b-slate-600 flex items-center justify-between gap-4">
          <div
            onClick={() => setShowSidebar(!showSidebar)}
            className=" hover:bg-gray-500 p-1 cursor-pointer"
          >
            <FaAngleRight />
          </div>
        </div>
      )}
      {showSidebar && (
        <div>
          <div className=" border-b-2 p-3 border-b-slate-600 flex items-center justify-between gap-4">
            <h2 className=" text-[20px] font-extrabold tracking-wide">
              BHAVIN KUMAR WORKSPACE
            </h2>
            <div
              onClick={() => setShowSidebar(!showSidebar)}
              className=" hover:bg-gray-200 p-1 cursor-pointer"
            >
              <FaAngleLeft />
            </div>
          </div>
          <div className=" flex items-center justify-between px-3 py-2">
            <h3 className=" font-bold text-[20px]">Your Boards</h3>
            <Popover
              isOpen={isPopoverOpen}
              onClickOutside={() => setIsPopoverOpen(false)}
              align="start"
              positions={["right", "bottom", "left", "top"]} // preferred positions by priority
              content={
                <div className=" w-60 h-auto flex flex-col items-center justify-center gap-2 bg-blue-950 text-white">
                  <h1 className=" font-bold text-[20px]">Create Board</h1>
                  <img src="https://placehold.co/200x120/png" alt="" />
                  <div className=" flex flex-col items-start justify-center">
                    <label>Board title *</label>
                    <input
                      value={boardsData.name}
                      onChange={(e) =>
                        setBoardsData({ ...boardsData, name: e.target.value })
                      }
                      className=" w-full bg-transparent"
                      placeholder="Enter Board name"
                      type="text"
                    />
                    <label>Board Color</label>
                    <input
                      value={boardsData.bgcolor}
                      onChange={(e) =>
                        setBoardsData({
                          ...boardsData,
                          bgcolor: e.target.value,
                        })
                      }
                      className=" w-full  bg-transparent outline-none border-none"
                      type="color"
                    />
                  </div>
                  <button
                    onClick={addData}
                    className=" px-4 py-1 rounded-lg bg-blue-800"
                  >
                    Create
                  </button>
                  <div></div>
                </div>
              }
            >
              <div
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                className=" text-[14px] hover:bg-gray-500 p-1 cursor-pointer"
              >
                <FaPlus />
              </div>
            </Popover>
          </div>
          <ul>
            {allBoards.boards &&
              allBoards.boards.map((item, index) => (
                <li key={index} className=" w-full">
                  <div className=" flex justify-between items-center w-full p-3 hover:bg-[#ffffffab]">
                    <button
                      onClick={() => setActiveBoard(index)}
                      className=" flex items-center gap-4 w-full text-left"
                    >
                      <span
                        style={{ backgroundColor: item.bgcolor }}
                        className=" w-6"
                      >
                        &nbsp;
                      </span>
                      {boardId === index ? (
                        <input
                          value={newEditedBoard}
                          onChange={(e) => setNewEditedBoard(e.target.value)}
                          onBlur={() => handleEditBoard(index, newEditedBoard)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter")
                              handleEditBoard(index, newEditedBoard);
                          }}
                          className=" bg-transparent text-black"
                          placeholder="Enter Board Name"
                          type="text"
                          name=""
                          id=""
                        />
                      ) : (
                        <p className=" font-semibold text-[18px]">
                          {item.name}
                        </p>
                      )}
                    </button>
                    <Popover
                      isOpen={isOpen && currentBoardIndex === index}
                      onClickOutside={() => setIsOpen(false)}
                      align="start"
                      positions={["right", "bottom", "left", "top"]}
                      content={
                        <div className=" flex flex-col gap-1">
                          <button
                            onClick={() => {
                              deleteBoard(index);
                              setIsOpen(false);
                            }}
                            className=" px-4 py-2 bg-black text-white rounded-xl font-semibold"
                          >
                            Delete Board
                          </button>
                          <button
                            onClick={() => {
                              setBoardId(index);
                              setIsOpen(false);
                            }}
                            className=" px-4 py-2 bg-black text-white rounded-xl font-semibold"
                          >
                            Edit Board
                          </button>
                        </div>
                      }
                    >
                      <div
                        className=" cursor-pointer"
                        onClick={() => {
                          setIsOpen(!isOpen);
                          setCurrentBoardIndex(index);
                        }}
                      >
                        <BiDotsHorizontalRounded />
                      </div>
                    </Popover>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SideBar;
