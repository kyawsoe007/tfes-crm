import React from 'react';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

//components
import FormInput from 'Components/Form/FormInput';
import FormInputMultilines from 'Components/Form/FormInputMultilines';

const PAGE_MAX = 10;

function InvoiceProductLine(props) {
    const { lines, page, deleteLine, handleLineChange, toggleFormSelection, buttonClick, secondButtonClick, disableEdit, buttonShow, isConverted, originalData } = props;

    let data = [];
    let original=[];
    lines.map((line, index) => {
        if (index >= (page - 1) * PAGE_MAX && index < page * PAGE_MAX) {
            data.push(line);
            if(originalData && index < originalData.length){
                original.push(originalData[index]);
              }
        }
    });
    // console.log("data: ", data);
    // console.log("original: ", original);
    return (
        data.map((line, i) => {
            let index = i + (page - 1) * PAGE_MAX;
            return (
                <div class="row InvoiceProductLine">
                    <div class="col-sm-7 left-cell" style={{ display: 'flex' }}>
                        <div className="col-sm-1 ">
                            <FormInput
                                label="S/N"
                                value={line.SN}
                                keys={index}
                                target="SN"
                                handleChange={handleLineChange}
                                isToggledEditForm={toggleFormSelection}
                                original={ original[i]? original[i].SN : ""}
                            />
                        </div>
                        <div className="col-sm-2">
                            <FormInput
                                label="Account"
                                value={line.account_name}
                                keys={index}
                                target="account_name"
                                hasButton={buttonShow}
                                secondButtonClick={() => secondButtonClick('account', index)}
                                buttonClick={() => buttonClick('account', index)}
                                handleChange={handleLineChange}
                                isToggledEditForm={toggleFormSelection}
                                readOnly={disableEdit}
                                original={ original[i]? original[i].account_name : ""}
                            />
                        </div>
                        <div class="col-sm-9">
                            <FormInputMultilines
                                label="Description"
                                value={line.description}
                                keys={index}
                                target="description"
                                hasButton={buttonShow}
                                secondButtonClick={() => secondButtonClick('description', index)}
                                buttonClick={() => buttonClick('description', index)}
                                handleChange={handleLineChange}
                                isToggledEditForm={toggleFormSelection}
                                readOnly={disableEdit}
                                original={ original[i]? original[i].description : ""}
                            />
                        </div>
                    </div>
                    <div
                        class="col-sm-4 right-cell"
                        style={{ display: 'flex' }}
                    >
                        <div class="col-sm-4 ">
                            <FormInput
                                label="Qty"
                                value={line.qty}
                                keys={index}
                                target="qty"
                                handleChange={handleLineChange}
                                isToggledEditForm={toggleFormSelection}
                                readOnly={disableEdit}
                                original={ original[i]? original[i].qty : ""}
                            />
                        </div>
                        <div class="col-sm-4 ">
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
                        <div class="col-sm-4 ">
                            <FormInput
                                label="Amount"
                                value={line.extPrice}
                                target="amount"
                                readOnly={true}
                                isToggledEditForm={toggleFormSelection}
                                original={ original[i]? original[i].extPrice : ""}
                            />
                        </div>
                    </div>
                    <div class="col-sm-1 invoice-delete-btn">
                        <HighlightOffIcon
                            className="tableOffIcon"
                            onClick={() => deleteLine(index)} />
                    </div>
                </div>
            )
        })
    )
}

export default InvoiceProductLine;
