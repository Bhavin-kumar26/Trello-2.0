import React, { createContext, useState, useEffect } from "react";
import img1 from "../assets/image1.jpg";
import img2 from "../assets/image2.jpg";

export const BoardContext = createContext();

const initialBoardData = {
  active: 0,
  boards: [
    {
      name: "My Trello Board",
      bgcolor: "#2d8bf7",
      list: [
        {
          id: "1",
          title: "To do",
          items: [{ id: "cdrFt", title: "Go to Gym", image: img1, description: "Go to gym do cardio 15mins" }],
        },
        {
          id: "2",
          title: "In Progress",
          items: [{ id: "cdrFv", title: "Learn Coding", image: img2, description: "Learn react for 30mins" }],
        },
        {
          id: "3",
          title: "Done",
          items: [{ id: "cdrFb", title: "Project Description 3" }],
        },
      ],
    },
  ],
};

const BoardContextProvider = (props) => {
  const [allBoards, setAllBoards] = useState(() => {
    const savedBoards = localStorage.getItem('allBoards');
    return savedBoards ? JSON.parse(savedBoards) : initialBoardData;
  });

  const [file, setFile] = useState();
  const [descValue, setDescValue] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [toggleEditDescription, setToggleEditDescription] = useState(false);

  useEffect(() => {
    localStorage.setItem('allBoards', JSON.stringify(allBoards));
  }, [allBoards]);

  const contextValue = {
    allBoards,
    setAllBoards,
    file,
    setFile,
    modalIsOpen,
    setIsOpen,
    descValue,
    setDescValue,
    toggleEditDescription,
    setToggleEditDescription
  };

  return (
    <BoardContext.Provider value={contextValue}>
      {props.children}
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;
