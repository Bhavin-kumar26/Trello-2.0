import React, { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { BoardContext } from "../Context/BoardContext";
const Card = ({ getCard }) => {
  const [show, setShow] = useState(false);
  const [card, setCard] = useState("");
  const { file, setFile, descValue, setDescValue } = useContext(BoardContext);
  const saveData = () => {
    if (!card) {
      return;
    }
    getCard(card);
    setCard("");
    setShow(!setShow);
  };

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className=" my-3">
      {show && (
        <div>
          <textarea
            onKeyDown={(e) => {
              if (e.key === "Enter") saveData();
            }}
            value={card}
            onChange={(e) => setCard(e.target.value)}
            className=" w-full bg-transparent"
            placeholder="Enter Task.."
            rows="2"
          ></textarea>
          <div>
            <textarea
              value={descValue}
              onChange={(e) => setDescValue(e.target.value)}
              cols="25"
              placeholder="Enter Description..."
              rows="8"
            />
          </div>
          <div className="mb-3">
            <h2>Add Image:</h2>
            <input type="file" onChange={handleChange} />
            <img src={file} />
          </div>

          <div className=" flex justify-start items-center gap-4 my-1">
            <button
              onClick={saveData}
              className="  text-[#ffffff] rounded-lg text-[16px] font-bold px-4 py-2 bg-blue-500"
            >
              Add Card
            </button>
            <button onClick={() => setShow(!show)}>
              <IoClose />
            </button>
          </div>
        </div>
      )}
      {!show && (
        <div>
          <button
            onClick={() => setShow(!show)}
            className=" text-[#ffffff] rounded-lg text-[16px] font-bold px-4 py-2 bg-blue-500"
          >
            Add a Card
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
