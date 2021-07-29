import React, { Fragment, useEffect, useState } from "react";
import FormInput from "Components/Form/FormInput";


const SplitDeliveryOrderModal = ({ splitQty, splitQtyRowIndex, data, setData, modalState, closeModalHandler, }) => {

    const [newQty, setNewQty] = useState(0)
    const [linesData, setLinesData] = useState(data)

    const setQtyHandler = (e) => {
        let selectedQty = parseInt(e.target.value);

        if (selectedQty >= splitQty.balanceQty) {
            // prevents splitting into 0 qty situation
            selectedQty = splitQty.balanceQty - 1;
            setNewQty(selectedQty);
        } else if (selectedQty === 0) {
            selectedQty = 1;
            setNewQty(selectedQty)
        } else {
            setNewQty(selectedQty)
        }
    }

    const setNewLinesData = () => {
        // need to use spread operator to clone 
        let newLine = {...splitQty};
        let currentLines = [...linesData];


        newLine.balanceQty = newQty;
        newLine.split = true;
        // need to delete the _id as will be creating new id 
        delete newLine._id;
        // needs an unique Id otherwise it will have issues with checkbox on modal 
        newLine._id = Date.now().toString()
        currentLines[splitQtyRowIndex].balanceQty -= newQty;

        currentLines.splice(splitQtyRowIndex + 1, 0, newLine)

        // console.log("LINES", currentLines[splitQtyRowIndex].qty)
        // console.log("LINES", currentLines)
        // console.log("currentQty", newLine);

        for (let i = 0; i < currentLines.length; i ++) {
            // reorders the runningNum sequence when splitting 
            currentLines[i].runningNum = i+1;
        }

        setData(currentLines);
        closeModalHandler(!modalState)
    }

    return (
        <Fragment>
            <div className="container">

                <div class="row">
                    <h2 style={{ margin: "20px auto", color: "#254065 ", letterSpacing: "2px"}}>
                        Split Qty
                    </h2>
                </div>

                <div className="row">
                    <div className="col-sm-2">
                        <h3>Current Qty</h3>
                    </div>
                    <div className="col-sm-10">
                        <FormInput value={splitQty.balanceQty} readOnly={true} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-2">
                        <h3>Split Amount</h3>
                    </div>
                    <div className="col-sm-10">
                        <FormInput value={newQty} type="number" onChange={(e) => setQtyHandler(e)}/>
                    </div>
                </div>

                <div className="row" style={{margin: "20px 45%"}}>
                    <button
                        type="button"
                        onClick={setNewLinesData}
                        style={{
                        width: 64,
                        height: 36,
                        color: "white",
                        border: 0,
                        cursor: "pointer",
                        display: "inline-flex",
                        outline: 0,
                        padding: 0,
                        position: "relative",
                        alignItems: "center",
                        borderRadius: 4,
                        verticalAlign: "middle",
                        justifyContent: "center",
                        backgroundColor: "#DF0021",
                        float: "right"
                        }}>
                        Save
                    </button>
                </div>
            </div>
        </Fragment>
    )
}

export default SplitDeliveryOrderModal;


