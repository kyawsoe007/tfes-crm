import React from 'react';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

//components
import FormInput from 'Components/Form/FormInput';
import FormInputMultilines from 'Components/Form/FormInputMultilines';

const PAGE_MAX = 10;

function ItemsLine(props) {
    const { lines, page , deleteLine , handleLineChange, toggleFormSelection, buttonClick , disableEdit,buttonShow, originalData} = props;

    let data = [];
    let original=[];
    lines.map((line, index) => {
        if (index >= (page-1) * PAGE_MAX && index < page * PAGE_MAX) {
            data.push(line);
            if(originalData && index < originalData.length){
                original.push(originalData[index]);
              }
        }
    });
console.log('data',data)
    return (
        data.map((line, i) => {
            let index = i + (page-1) * PAGE_MAX; 
            return (
                <div class="row">
                    <div class="col-sm-1 ">
                        <FormInput
                        label="S/N"
                        value={line.SN}
                        keys={index}
                        target="salesNumber"
                        handleChange={handleLineChange}
                        isToggledEditForm={toggleFormSelection}
                        readOnly={disableEdit}
                        original={original[i] && original[i].SN ? original[i].SN : ""}
                        />
                    </div>

                    <div class="col-sm-6 ">
                        <FormInputMultilines
                            label="Description"
                            value={line.description}
                            keys={index}
                            target="description"
                            hasButton={buttonShow}
                            buttonClick={() =>buttonClick('sku', index)}
                            handleChange={handleLineChange}
                            isToggledEditForm={toggleFormSelection}
                            readOnly={disableEdit}
                            original={original[i] && original[i].description ? original[i].description : ""}
                        />
                    </div>  
                  
                    <div class="col-sm-1 ">
                        <FormInput
                            label="Qty"
                            value={line.qty}
                            keys={index}
                            target="qty"
                            handleChange={handleLineChange}
                            isToggledEditForm={toggleFormSelection}
                            readOnly={disableEdit}
                            original={original[i] && original[i].qty ? original[i].qty : ""}
                        />
                    </div>
                    <div class="col-sm-3 ">
                        <FormInput
                            label="Reason"
                            value={line.reason}
                            keys={index}
                            target="reason"
                            handleChange={handleLineChange}
                            isToggledEditForm={toggleFormSelection}
                            readOnly={disableEdit}
                            original={original[i] && original[i].reason ? original[i].reason : ""}
                        />
                    </div>
                   
                    <div class="col-sm-1 quotation-btn">
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

export default ItemsLine;
