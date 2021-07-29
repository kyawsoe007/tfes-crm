import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
//components
import FormInput from 'Components/Form/FormInput';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import SupplierList from '../../supplier/new/components/supplierList'
import DialogRoot from 'Components/Dialog/DialogRoot'

// helper functions
import { amountRounding } from 'Helpers/helpers'

function TempList({ supplierFiltered, tempList, salesOrderId, postPurchaseTempList }) {

    // const [purchaseTempList, setPurchaseTempList] = useState([tempList && tempList.data ? tempList.data : []])
    const [purchaseTempList, setPurchaseTempList] = useState([])
    const [supplierToggle, setSupplierToggle] = useState(false);
    const [supplierId, setSupplierId] = useState("");
    const [checked, setChecked] = useState({});
    const [checkedIds, setCheckedIds] = useState([])
    const [id] = useState(salesOrderId)
    const [errorMsg, setErrorMsg] = useState("")

    useEffect(() => {

        setPurchaseTempList(tempList.data ? tempList.data : []);
        // gives checkboxes ID of items
        const checkboxObj = {};
        if (tempList.data) {
            for (let i = 0; i < tempList.data.length; i++) {
                checkboxObj[tempList.data[i].id] = false
            }
            setChecked(checkboxObj);
        }

    }, [tempList])

    const getInfoSupplier = (id) => {
        const Supplier = supplierFiltered.data

        // console.log("SUPPLIER", Supplier, id)

        let supplierName = "";
        let supplierId = ""

        for (let i = 0; i < Supplier.length; i++) {
            if (id == Supplier[i].id) {
                // setSupplierName(Supplier[i].name)
                // setSupplierId(Supplier[i].id)
                supplierName = Supplier[i].name;
                supplierId = Supplier[i].id
            }
        }

        let updatedPurchaseTempList = [...purchaseTempList];

        for (let i = 0; i < checkedIds.length; i++) {
            for (let j = 0; j < updatedPurchaseTempList.length; j++) {
                if (updatedPurchaseTempList[j]._id === checkedIds[i]) {

                    updatedPurchaseTempList[j].suppName = supplierName;
                    updatedPurchaseTempList[j].suppId = supplierId;
                    updatedPurchaseTempList[j].isChecked = true;
                }
            }
        }

        let resetCheckboxes = {...checked};
        for (const key in resetCheckboxes) {
            resetCheckboxes[key] = false
        }

        // debugger

        setPurchaseTempList(updatedPurchaseTempList);
        setChecked(resetCheckboxes) // reset checkbox after selecting supplier
        setCheckedIds([]) // reset checkedArr after selecing supplier
        setSupplierToggle(!supplierToggle);
    }

    const checkboxHandler = (e) => {

        setChecked({ ...checked, [e.target.name]: e.target.checked })

        // saved the checked items for getInfoSupplierHandler 
        let checkedIdArr = [...checkedIds];
        if (!e.target.checked) {
            // debugger
            checkedIdArr = checkedIdArr.filter( item => item !== e.target.name )

            console.log(checkedIdArr)
        } else {
            checkedIdArr.push(e.target.name);
        }
        setCheckedIds(checkedIdArr);
    }

    const submitPurchaseTempListHandler = () => {

        let error = false;
        let errorMsg = ""
        let supplierCount = 0;
        for (let i = 0; i < purchaseTempList.length; i++) {
            if (purchaseTempList[i].suppName) {
                supplierCount++
            }

            debugger;
        }

        if (supplierCount === 0 ) { error = true, errorMsg = "Please select a supplier!" }

        if (error) {
            setErrorMsg(errorMsg)
            return null
        }

        let postBody = {
            salesOrderId: id,
            suppId: supplierId,
            purchaseOrderItems: purchaseTempList,
            // purchaseOrderItems: checkedItems
        };

        console.log("POSTBODY", postBody)
        postPurchaseTempList(postBody)
        setErrorMsg("")
    }


    return (
        <React.Fragment>

                <div className="row">
                    <h1 style={styles.errorMsg}> {errorMsg} </h1>
                </div>

                <Button 
                    variant="contained" 
                    color="primary" 
                    style={{...styles.buttonMargin}}
                    onClick={() => setSupplierToggle(!supplierToggle)}
                >
                    Select Supplier
                </Button>   
                {
                    purchaseTempList.map( (item, index) => {
                        return (
                            <div className="row" key={item ? item.id : index}>
                                <div className="col-sm-6" style={styles.verticalAlign}> <FormInput label="Item Name" value={item ? item.description : ''} readOnly/></div>
                                <div className="col-sm-1" style={styles.verticalAlign}> <FormInput label="QTY" value={item ? amountRounding(2,item.qty) : ''} readOnly/></div>
                                {/* <div className="col-sm-4" style={styles.verticalAlign}> <FormInput label="Supplier Name" value={checked[item.id] && supplierName ? supplierName : item.suppName } readOnly/></div> */}
                                <div className="col-sm-4" style={styles.verticalAlign}> <FormInput label="Supplier Name" value={item.suppName ? item.suppName : ""} readOnly/></div>
                                <Checkbox 
                                    checked={checked[item.id]} 
                                    onChange={checkboxHandler} 
                                    name={item.id} 
                                    disabled={item.isPoSubmitted ? true : false}
                                />
                            </div>
                        )
                    }) 
                }

                <Button 
                    variant="contained" 
                    color="secondary" 
                    style={{...styles.buttonMargin, ...styles.btnBackground}}
                    onClick={submitPurchaseTempListHandler}
                >
                    Save Temp List
                </Button>   
            
            {
                supplierToggle &&
                <DialogRoot
                    show={supplierToggle}
                    handleHide={() => setSupplierToggle(!supplierToggle)}
                    size={'lg'}
                >
                    <SupplierList getInfo={getInfoSupplier} />
                </DialogRoot>            
            }
     
      </React.Fragment>
    )
  }

export default TempList

const styles = {
    buttonMargin: {
        marginLeft: '90%',
        marginBottom: '0.5rem',
        marginTop: '0.5rem'
    },

    verticalAlign: {
        margin: 'auto 0'
    },

    btnBackground: {
        background: 'red'
    },

    errorMsg: {
        color: 'red',
        margin: '0 auto'
    },

    debugBorder: {
        border: '1px solid red'
    }
}

TempList.propTypes = {
    supplierFiltered: PropTypes.object,
    tempList: PropTypes.array,
    salesOrderId: PropTypes.string,
    postPurchaseTempList: PropTypes.func
}