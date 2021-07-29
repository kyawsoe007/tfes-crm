import React from 'react';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

//components
import FormInput from 'Components/Form/FormInput';
import FormInputMultilines from 'Components/Form/FormInputMultilines';
// React Day Picker input
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';

const PAGE_MAX = 10;

function ExpenseClaimsLine(props) {
    const { lines, page, deleteLine, handleLineChange, toggleFormSelection, buttonClick, readOnly, buttonShow,  originalData, styleForDate, handleLineChangeDate, currency, status } = props;

    let data = [];
    let original = [];
    lines.map((line, index) => {
        if (index >= (page - 1) * PAGE_MAX && index < page * PAGE_MAX) {
            data.push(line);
            if(originalData && index < originalData.length){
                original.push(originalData[index]);
              }
        }
    });

    return (
        data.map((line, i) => {
            let index = i + (page - 1) * PAGE_MAX;
            return (
                <div className="row" key={i}>
                        <div className="col-sm-1 ">
                            <FormInput
                                label="S/N"
                                value={line.lineNum}
                                keys={index}
                                target="lineNum"
                                handleChange={handleLineChange}
                                readOnly={true}
                                original={ original[index]? original[index].lineNum : ""}
                            />
                        </div>
                        <div className="col-sm-1">
                        <p style={styleForDate}>Start Date</p>
                            <DayPickerInput
                                formatDate={formatDate}
                                parseDate={parseDate}
                                format="L"
                                value={`${formatDate(line.startDate,'L','en-SG')}`}
                                placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                                onDayChange={(date) => handleLineChangeDate(index, date)}
                                dayPickerProps={{
                                    locale: 'en-SG',
                                    localeUtils: MomentLocaleUtils,
                                }}
                                inputProps={{readOnly: true}}
                                isToggledEditForm={toggleFormSelection}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className="col-sm-1 ">
                            <FormInput
                                label="Claims Type"
                                value={line.claimType}
                                keys={index}
                                target="claimType"
                                handleChange={handleLineChange}
                                readOnly={readOnly}
                                selectValueName="name"
                                selectValues={[
                                    { name: "Transport", value: "transport" },
                                    { name: "Entertainment", value: "entertainment" },
                                    { name: "Correspondence", value: "correspondence" },
                                    { name: "Business Trip", value: "businessTrip" },
                                    { name: "Overseas Trip", value: "overseasTrip" },
                                    { name: "Others", value: "others" },
                                ]}
                                original={ original[index]? original[index].claimType : ""}
                                isToggledEditForm={toggleFormSelection}
                            />
                        </div>
                        <div className="col-sm-3">
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
                                readOnly={readOnly}
                                original={ original[index]? original[index].description : ""}
                            />
                        </div>

                        <div className="col-sm-1 ">
                            <FormInput
                                label="Currency"
                                value={line.currency}
                                keys={index}
                                target="currency"
                                readOnly={readOnly}
                                handleChange={handleLineChange}
                                isToggledEditForm={toggleFormSelection}
                                selectValueKey="id"
                                selectValueName="name"                                
                                selectValues={currency}
                                original={ original[index]? original[index].currency : ""}
                            />
                        </div>
                        
                        <div className="col-sm-1">
                            <FormInput
                                label="Amount"
                                value={line.amount}
                                keys={index}
                                target="amount"
                                readOnly={readOnly}
                                handleChange={handleLineChange}
                                isToggledEditForm={toggleFormSelection}
                                // original={1}
                                original={ original[index]? original[index].amount : ""}
                            />
                        </div>
                        <div className="col-sm-1">
                            <FormInput
                                label="GST"
                                value={line.gstAmt}
                                keys={index}
                                target="gstAmt"
                                readOnly={readOnly}
                                handleChange={handleLineChange}
                                isToggledEditForm={toggleFormSelection}
                                original={ original[index]? original[index].gstAmt : ""}
                            />
                        </div>

                        <div className="col-sm-2">
                            <FormInput
                                label="Admin Remarks"
                                value={line.remarks}
                                keys={index}
                                target="remarks"
                                readOnly={status === 'waiting-approval' ? false : true}
                                handleChange={handleLineChange}
                                isToggledEditForm={toggleFormSelection}
                                original={ original[index]? original[index].remarks : ""}
                            />
                        </div>
                    {
                        status === 'draft' &&
                        <div className="col-sm-1 invoice-delete-btn">
                            <HighlightOffIcon
                                className="tableOffIcon"
                                onClick={() => deleteLine(index)} />
                        </div>
                    }

                </div>
            )
        })
    )
}

export default ExpenseClaimsLine;
