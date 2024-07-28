import React, { useContext, useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { RiContactsLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import Card from "./Card";
import { BoardContext } from "../Context/BoardContext";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import AddList from "./AddList";
import { Popover } from "react-tiny-popover";
import { MdDelete } from "react-icons/md";
import Utils from "../Utils/Utils";
import ReactModal from "./ReactModal";

const Main = () => {
  const {
    allBoards,
    setAllBoards,
    file,
    setFile,
    modalIsOpen,
    setIsOpen,
    descValue,
    setDescValue,
  } = useContext(BoardContext);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [currentListId, setCurrentListId] = useState(null);
  const [currentCardId, setCurrentCardId] = useState(null);
  const [editMode, setEditMode] = useState({
    listIndex: null,
    cardIndex: null,
    listCardIndex: null,
  });
  const [editedText, setEditedText] = useState("");
  const [modalData, setModalData] = useState({
    modalText: null,
    modalImage: null,
  });
  const [modalDescIndex, setModalDescIndex] = useState({
    ListIndex: null,
    CardIndex: null,
  });

  let bData = allBoards.boards[allBoards.active];

  const cardData = (e, ind) => {
    let newList = [...bData.list];
    newList[ind].items.push({
      id: Utils.makeid(5),
      title: e,
      image: file,
      description: descValue,
    });
    let board_ = { ...allBoards };
    board_.boards[board_.active].list = newList;
    setAllBoards(board_);
    setFile("");
    setDescValue("");
  };

  const ListData = (e) => {
    let newList = [...bData.list];
    newList.push({ id: newList.length + 1 + "", title: e, items: [] });
    let board_ = { ...allBoards };
    board_.boards[board_.active].list = newList;
    setAllBoards(board_);
  };

  function onDragEnd(res) {
    if (!res.destination) {
      console.log("No Destination");
      return;
    }
    const newList = [...bData.list];
    const s_id = parseInt(res.source.droppableId);
    const d_id = parseInt(res.destination.droppableId);
    const [removed] = newList[s_id - 1].items.splice(res.source.index, 1);
    newList[d_id - 1].items.splice(res.destination.index, 0, removed);
    let board_ = { ...allBoards };
    board_.boards[board_.active].list = newList;
    setAllBoards(board_);
  }

  const deleteList = (listId) => {
    let newList = bData.list.filter((list) => list.id !== listId);
    let board_ = { ...allBoards };
    board_.boards[board_.active].list = newList;
    setAllBoards(board_);
  };

  const deleteCard = (listId, cardId) => {
    let newList = bData.list.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.filter((item) => item.id !== cardId),
        };
      }
      return list;
    });
    let board_ = { ...allBoards };
    board_.boards[board_.active].list = newList;
    setAllBoards(board_);
  };

  const handleEdit = (cardId, newTitle) => {
    let newList = [...bData.list];
    newList[cardId].title = newTitle;
    let board_ = { ...allBoards };
    board_.boards[board_.active].list = newList;
    setAllBoards(board_);
    setEditedText("");
    setEditMode({ listIndex: null, cardIndex: null, listCardIndex: null });
  };

  const handleCardEdit = (listId, cardId, newTitle) => {
    let newList = [...bData.list];
    newList[listId].items[cardId].title = newTitle;
    let board_ = { ...allBoards };
    board_.boards[board_.active].list = newList;
    setAllBoards(board_);
    setEditedText("");
    setEditMode({ listIndex: null, cardIndex: null, listCardIndex: null });
  };

  const handleModal = (listIndex, cardIndex) => {
    let newList = [...bData.list];
    setModalData({
      TextModal: newList[listIndex].items[cardIndex].title,
      ImageModal: newList[listIndex].items[cardIndex].image,
      DescModal: newList[listIndex].items[cardIndex].description,
    });
    setModalDescIndex({
      ListIndex: listIndex,
      CardIndex: cardIndex,
    });
  };

  return (
    <div className="w-full h-screen">
      <div
        style={{ backgroundColor: `${bData.bgcolor}` }}
        className={`color-BG absolute top-0 bottom-0 left-0 right-0 w-full h-[100vh] rounded-md filter blur-xl opacity-60 -z-50`}
      />
      <div className="py-5 flex justify-between items-center px-5">
        <h3 className="font-bold text-2xl title">{bData.name}</h3>
        <div className="flex items-center justify-center gap-8">
          <div className="flex items-center justify-center gap-3 bg-white px-2 py-1 rounded font-bold">
            <span>
              <RiContactsLine />
            </span>
            <span>Share</span>
          </div>
          <BiDotsHorizontalRounded />
        </div>
      </div>
      <div className="w-full flex flex-grow flex-col relative h-[90vh]">
        <div className="absolute ml-5 mt-5 pb-2 top-0 bottom-0 right-0 left-0 flex gap-10 overflow-x-auto">
          <DragDropContext onDragEnd={onDragEnd}>
            {bData.list &&
              bData.list.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-64 h-fit shadow-2xl bg-white text-black px-4 py-2 rounded flex-shrink-0"
                  >
                    <div className="list-body">
                      <div className="flex justify-between items-center p-1">
                        {editMode.listIndex === index ? (
                          <input
                            onBlur={() => handleEdit(index, editedText)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter")
                                handleEdit(index, editedText);
                            }}
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            type="text"
                            placeholder="Enter edit.."
                          />
                        ) : (
                          <span className="font-extrabold tracking-wider text-[20px]">
                            {item.title}
                          </span>
                        )}
                        <Popover
                          isOpen={isPopoverOpen && currentListId === item.id}
                          onClickOutside={() => setIsPopoverOpen(false)}
                          positions={["bottom"]}
                          content={
                            <div className="flex flex-col">
                              <button
                                onClick={() => {
                                  deleteList(item.id);
                                  setIsPopoverOpen(false);
                                }}
                                className="px-4 py-2 bg-black text-white font-semibold"
                              >
                                Delete List
                              </button>
                              <button
                                onClick={() => {
                                  setIsPopoverOpen(false);
                                  setEditMode({
                                    listIndex: index,
                                    cardIndex: null,
                                    listCardIndex: null,
                                  });
                                }}
                                className="px-4 py-2 bg-black text-white font-semibold"
                              >
                                Edit List
                              </button>
                            </div>
                          }
                        >
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              setIsPopoverOpen(!isPopoverOpen);
                              setCurrentListId(item.id);
                            }}
                          >
                            <BiDotsHorizontalRounded />
                          </div>
                        </Popover>
                      </div>
                      <Droppable droppableId={item.id}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            style={{
                              backgroundColor: snapshot.isDraggingOver
                                ? "#222"
                                : "transparent",
                            }}
                            {...provided.droppableProps}
                          >
                            {item.items &&
                              item.items.map((i, inx) => {
                                return (
                                  <Draggable
                                    key={i.id}
                                    draggableId={i.id}
                                    index={inx}
                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <div
                                          key={inx}
                                          className="mb-4 flex justify-between items-center p-1 bg-white text-black rounded-md hover:bg-[#0000001a] cursor-pointer"
                                        >
                                          {editMode.listCardIndex === index &&
                                          editMode.cardIndex === inx ? (
                                            <input
                                              value={editedText}
                                              onChange={(e) =>
                                                setEditedText(e.target.value)
                                              }
                                              type="text"
                                              name=""
                                              id=""
                                              onKeyDown={(e) => {
                                                if (e.key === "Enter")
                                                  handleCardEdit(
                                                    index,
                                                    inx,
                                                    editedText
                                                  );
                                              }}
                                            />
                                          ) : (
                                            <div className="flex flex-col justify-between w-full">
                                              <div className="flex justify-between items-center mb-2">
                                                <span
                                                  onClick={() => {
                                                    setIsOpen(!modalIsOpen);
                                                    handleModal(index, inx);
                                                  }}
                                                  className="font-bold tracking-tight text-[15px]"
                                                >
                                                  {i.title}
                                                </span>
                                                <div className="flex gap-1 justify-center">
                                                  <Popover
                                                    isOpen={
                                                      isPopoverOpen &&
                                                      currentCardId === i.id
                                                    }
                                                    onClickOutside={() =>
                                                      setIsPopoverOpen(false)
                                                    }
                                                    positions={["bottom"]}
                                                    content={
                                                      <button
                                                        onClick={() => {
                                                          deleteCard(
                                                            item.id,
                                                            i.id
                                                          );
                                                          setIsPopoverOpen(
                                                            false
                                                          );
                                                        }}
                                                        className="px-4 py-2 bg-black text-white font-semibold"
                                                      >
                                                        Delete Card
                                                      </button>
                                                    }
                                                  >
                                                    <div
                                                      className="cursor-pointer"
                                                      onClick={() => {
                                                        setIsPopoverOpen(
                                                          !isPopoverOpen
                                                        );
                                                        setCurrentCardId(i.id);
                                                      }}
                                                    >
                                                      <MdDelete />
                                                    </div>
                                                  </Popover>
                                                  <div
                                                    onClick={() => {
                                                      setEditMode({
                                                        listIndex: null,
                                                        cardIndex: inx,
                                                        listCardIndex: index,
                                                      });
                                                    }}
                                                  >
                                                    <FaRegEdit />
                                                  </div>
                                                </div>
                                              </div>
                                              {i.image ? (
                                                <div className="w-full h-40">
                                                  <img
                                                    className="w-full h-full object-cover"
                                                    src={i?.image}
                                                    alt=""
                                                  />
                                                </div>
                                              ) : null}
                                              <div className="">
                                                {modalIsOpen && (
                                                  <ReactModal
                                                    heading={
                                                      modalData.TextModal
                                                    }
                                                    image={modalData.ImageModal}
                                                    listIndex={
                                                      modalDescIndex.ListIndex
                                                    }
                                                    cardIndex={
                                                      modalDescIndex.CardIndex
                                                    }
                                                  />
                                                )}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                );
                              })}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                      <Card getCard={(e) => cardData(e, index)} />
                    </div>
                  </div>
                );
              })}
          </DragDropContext>
          <AddList getList={(e) => ListData(e)} />
        </div>
      </div>
    </div>
  );
};

export default Main;
