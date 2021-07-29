import React from 'react';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

//components
import FormInput from 'Components/Form/FormInput';
import FormInputMultilines from 'Components/Form/FormInputMultilines';
import { red } from '@material-ui/core/colors';

const PAGE_MAX = 10;

function QuotationProductLine(props) {
    const { lines, page , deleteLine , handleLineChange, toggleFormSelection, buttonClick , secondButtonClick , disableEdit,buttonShow,isConverted,secondButtonShow,dataDetails, originalData, onBlur, onFocus} = props;
    let data = [];
    let original = [];
    lines.map((line, index) => {
        if (index >= (page-1) * PAGE_MAX && index < page * PAGE_MAX) {
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
            let index = i + (page-1) * PAGE_MAX; 
            return (
                <div class="row" key={"productrow"+index}>
                <div class="col-sm-7 left-cell" style={{ display: 'flex' }}>
                  <div class="col-sm-1 ">
                    <FormInput
                      label="S/N"
                      value={line.SN}
                      keys={index}
                      target="salesNumber"
                      handleChange={handleLineChange}
                      isToggledEditForm={toggleFormSelection}
                      readOnly={disableEdit==true}  
                      original={ original[i]? original[i].SN : ""}
                      onBlur={onBlur}
                      onFocus={onFocus}
                    />
                  </div>
                  {/* {console.log("lineItemOnEdit",line)} */}
                 
                  <div class="col-sm-3 ">
                    <FormInput
                      label="Cust Ref"
                      value={line.custRef}
                      keys={index}
                      target="custRef"
                      handleChange={handleLineChange}
                      isToggledEditForm={toggleFormSelection}
                      readOnly={(disableEdit==true || line.lineItemOnEdit == false)? true :false }
                      original={ original[i]? original[i].custRef : ""}
                    />
                  </div>
                  <div class="col-sm-8 ">
                  <FormInputMultilines
                      label="Description"
                      value={line.description}
                      keys={index}
                      target="description"
                      hasButton={ (buttonShow==false || line.lineItemOnEdit == false)?false:true}
                      secondButton={secondButtonShow && (line.lineItemOnEdit || line.lineItemOnEdit == undefined) }
                      secondButtonClick={() =>secondButtonClick('description', index)}
                      buttonClick={() =>buttonClick('description', index)}
                      handleChange={handleLineChange}
                      isToggledEditForm={toggleFormSelection}
                      readOnly={(disableEdit==true || line.lineItemOnEdit == false)? true :false }
                        
                      original={ original[i]? original[i].description : ""}
                    /> 

                  </div>
                  
                </div>
                <div
                  class="col-sm-4 right-cell"
                  style={{ display: 'flex' }}
                >
                  <div class="col-sm-2 ">
                    <FormInput
                      label="UOM"
                      keys={index}
                      value={line.uom}
                      target="uom"
                      selectValueKey="id"
                      // selectValueName="name"
                      selectValues={dataDetails ? dataDetails.uom:[]}
                      handleChange={handleLineChange}
                      isToggledEditForm={toggleFormSelection}
                      readOnly={(disableEdit==true || line.lineItemOnEdit == false)? true :false }
                      className={(disableEdit==true || line.lineItemOnEdit == false)&& 'uneditable'}                      
                      original={ original[i]? original[i].uom : ""}
                    />
                  </div>
                  <div class="col-sm-2 ">
                    <FormInput
                      label="Qty"
                      value={line.qty}
                      keys={index}
                      target="qty"
                      handleChange={handleLineChange}
                      isToggledEditForm={toggleFormSelection}
                      readOnly={(disableEdit==true || line.lineItemOnEdit == false)? true :false }
                      original={ original[i]? original[i].qty : ""}
                    />
                  </div>
                  <div class="col-sm-5 ">
                    <FormInput
                      label="Unit Price"
                      value={line.unitPrice}
                      keys={index}
                      target="unitPrice"
                      handleChange={handleLineChange}
                      isToggledEditForm={toggleFormSelection}
                      readOnly={(disableEdit==true || line.lineItemOnEdit == false)? true :false }
                      original={ original[i]? original[i].unitPrice : ""}
                    />
                  </div>
                  <div class="col-sm-5 ">
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
                {/* {this.state.isConverted === false
                  && <div class="col-sm-1 quotation-btn">
                    <HighlightOffIcon
                      className="tableOffIcon"
                      onClick={() => deleteNewLine(index)} />
                  </div>} */}
                  {(disableEdit!= true && line.lineItemOnEdit !=false ) && 
                      <div class="col-sm-1 quotation-btn">
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

export default QuotationProductLine;
