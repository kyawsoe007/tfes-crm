import React from 'react';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

//components
import FormInput from 'Components/Form/FormInput';
import FormInputMultilines from 'Components/Form/FormInputMultilines';
const PAGE_MAX = 10;
function PurchaseItemLine(props) {
    const {  page, deleteLine, handleLineChange, toggleFormSelection, buttonClick, dataDetails ,supplierItems,state} = props;
    
    let lines = props.state.data.salesOrderItems
        console.log("lines",lines)
    return (
                        
            lines.map((line, index) => {
             return(
                    <div className="row" style={{display: "flex"}}>
                        <div className="col-sm-1 ">
                            <FormInput
                                label="S/N"
                                value={line.SN}
                                key={index}
                                target="SN"
                                readOnly={true}
                            />
                        </div> 
                        <div className="col-sm-6 ">
                            <FormInputMultilines
                               label="Description"
                               value={line.description}
                               key={index}
                               target="description"
                               readOnly={true}
                            />
                        </div>
                       
                        <div className="col-sm-1 ">
                            <FormInput
                                label="Qty"
                                value={line.qty}
                                key={index}
                                target="qty"
                                // handleChange={handleLineChange}
                                readOnly={true}
                            />
                        </div>
                        <div className="col-sm-4 ">
                            <FormInputMultilines
                                label="Suppliier"
                                // value={supplier}
                                // key={index}
                                target="supplier"
                                selectValueKey="id"
                                selectValues={supplierItems? supplierItems.supplier : []}
                            />
                        </div>  
                    </div>
                   )
                    
                    
               })
                    
               
           
     
    )}
export default PurchaseItemLine;
