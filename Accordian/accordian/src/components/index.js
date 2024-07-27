import { useState } from "react";
import data from "./data";
import "./style.css";

export default function Accordian() {
  const [selected, stateSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multipleSelected, setMultipleSelected] = useState([]);

  function handleSingleSelection(getCurrentId) {
    stateSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let copyMultiple = [...multipleSelected];
    const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId)
    if(findIndexOfCurrentId == -1) copyMultiple.push(getCurrentId)
        else copyMultiple.splice(findIndexOfCurrentId , 1)

    setMultipleSelected(copyMultiple);
  }

  return (
    <div className="wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Multi Selection
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item">
              <div
                onClick={
                    enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {selected === dataItem.id || multipleSelected.indexOf(dataItem.id) !== -1 ? (
                <div className="content">{dataItem.answer} </div>
              ) : null}
            </div>
          ))
        ) : (
          <div> NO DATA FOUND! </div>
        )}
      </div>
    </div>
  );
}
