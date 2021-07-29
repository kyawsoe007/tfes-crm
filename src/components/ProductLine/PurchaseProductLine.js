import React from 'react';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

//components
import FormInput from 'Components/Form/FormInput';
import FormInputMultilines from 'Components/Form/FormInputMultilines';

const PAGE_MAX = 10;

function PurchaseProductLine(props) {
    const { lines, page , deleteLine , handleLineChange, toggleFormSelection, buttonClick , secondButtonClick , editable,buttonShow,isConverted} = props;

    let data = [];
    lines.map((line, index) => {
        if (index >= (page-1) * PAGE_MAX && index < page * PAGE_MAX) {
            data.push(line);
        }
    });

    return (
        data.map((line, i) => {
            let index = i + (page-1) * PAGE_MAX;
            return (
                <div class="row">
                    <div class="col-sm-7 left-cell" style={{ display: 'flex' }}>
                        <div className="col-sm-1 ">
                            <FormInput
                                label="S/N"
                                value={line.SN}
                                keys={index}
                                target="SN"
                                handleChange={handleLineChange}
                            />
                        </div>
                        <div className="col-sm-2">
                        <FormInput
                                label="Expense Type"
                                value={line.expenseType}
                                keys={index}
                                target="expenseType"                                                            
                                handleChange={handleLineChange}
                                isToggledEditForm={toggleFormSelection}
                                readOnly={editable}
                                selectValues={[
                                    {name: "Trading", value: "Trading"},
                                    {name: "Stocks", value: "Stocks"},
                                    {name: "Expenses", value: "Expenses"},
                                    {name: "Fixed Assets", value: "Fixed Assets"}
                                ]}
                            />
                        </div>
                        <div class="col-sm-9">
                        <FormInputMultilines
                                label="Description"
                                value={line.description}
                                keys={index}
                                target="description"
                                hasButton={buttonShow}
                                secondButtonClick={() =>secondButtonClick('description', index)}
                                buttonClick={() =>buttonClick('description', index)}
                                handleChange={handleLineChange}
                                isToggledEditForm={toggleFormSelection}
                                readOnly={editable}
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
                                readOnly={editable}
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
                                readOnly={editable}
                            />
                        </div>
                        <div class="col-sm-4 ">
                            <FormInput
                                label="Amount"
                                value={line.extPrice}
                                target="amount"
                                readOnly={true}
                                isToggledEditForm={toggleFormSelection}
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

export default PurchaseProductLine;
