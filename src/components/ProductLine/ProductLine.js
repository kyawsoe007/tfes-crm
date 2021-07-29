import React from 'react';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

//components
import FormInput from 'Components/Form/FormInput';
import FormInputMultilines from 'Components/Form/FormInputMultilines';

const PAGE_MAX = 10;

function ProductLine(props) {
    const { lines, page, deleteLine, handleLineChange, toggleFormSelection, buttonClick, dataDetails ,disableEdit , originalData, onBlur, onFocus} = props;

    let data = [];
    let original = [];
    lines.map((line, index) => {
        if (index >= (page-1) * PAGE_MAX && index < page * PAGE_MAX) {
            data.push(line);
            // debugger
            if(originalData && index < originalData.length){
                original.push(originalData[index]);
              }
        }
    });

    return (
        data.map((line, i) => {
            let index = i + (page-1) * PAGE_MAX;                                                    //get real index of total data
            return (
                <div className="row">
                    <div className="col-sm-7 left-cell" style={{display: "flex"}}>
                        <div className="col-sm-1 ">
                            <FormInput
                                label="S/N"
                                value={line.SN}
                                keys={index}
                                target="SN"
                                handleChange={handleLineChange}
                                readOnly={disableEdit}
                                isToggledEditForm={toggleFormSelection}
                                original={ original[i]? original[i].SN : ""}
                                onBlur={onBlur}
                                onFocus={onFocus}
                            />
                        </div>
                        <div className="col-sm-3 ">
                            <FormInput
                                label="Supp Ref"
                                value={line.suppRef ? line.suppRef : ""}
                                keys={index}
                                target="suppRef"
                                handleChange={handleLineChange}
                                readOnly={disableEdit}
                                isToggledEditForm={toggleFormSelection}
                                original={ original[i]? original[i].suppRef : ""}
                            />
                        </div>
                        <div className="col-sm-8 ">
                        <FormInputMultilines
                               label="Description"
                               value={line.description}
                               keys={index}
                               target="description"
                               hasButton={true}
                               buttonClick={() => buttonClick("description", index)}
                               handleChange={handleLineChange}
                               readOnly={disableEdit}
                               isToggledEditForm={toggleFormSelection}
                               original={ original[i]? original[i].description : ""}
                            />
                        </div>
                    </div>
                    <div className="col-sm-4 right-cell" style={{display: "flex"}}>
                        <div className="col-sm-2 ">
                            <FormInput
                                label="UOM"
                                value={line.uom}
                                target="uom"
                                keys={index}
                                selectValueKey="id"
                                selectValues={dataDetails? dataDetails.uom : []}
                                handleChange={handleLineChange}
                                readOnly={disableEdit}
                                isToggledEditForm={toggleFormSelection}
                                original={ original[i]? original[i].uom : ""}
                            />
                        </div>
                        <div className="col-sm-2 ">
                            <FormInput
                                label="Qty"
                                value={line.qty}
                                keys={index}
                                target="qty"
                                handleChange={handleLineChange}
                                readOnly={disableEdit}
                                isToggledEditForm={toggleFormSelection}
                                original={ original[i]? original[i].qty : ""}
                            />
                        </div>
                        <div className="col-sm-5 ">
                            <FormInput
                                label="Unit Price"
                                value={line.unitPrice}
                                keys={index}
                                target="unitPrice"
                                handleChange={handleLineChange}
                                isToggledEditForm={toggleFormSelection}
                                readOnly={disableEdit}
                                original={ original[i]? original[i].unitPrice : ""}
                            />
                        </div>
                        <div className="col-sm-5 ">
                            <FormInput
                                label="Ext Price"
                                value={line.extPrice}
                                target="extPrice"
                                readOnly={true}
                                isToggledEditForm={toggleFormSelection}
                                original={ original[i]? original[i].extPrice : ""}
                            />
                        </div>
                    </div>
                    <div className="col-sm-1 quotation-btn">
                        <HighlightOffIcon
                            className="tableOffIcon"
                            onClick={() => deleteLine(index)}
                        />
                    </div>
                </div>
            )
        })
    )
}

export default ProductLine;
