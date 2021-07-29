import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { amountRounding } from "Helpers/helpers";

import FormInput from 'Components/Form/FormInput'

function StockMerging({ rowData, handleHide, ProductFiltered, rowIndex, patchStockMergeSku }) {

    const [SelectedProductId, setSelectedProductId] = useState(rowData.product);
    const [allProducts, setAllProducts] = useState(ProductFiltered.data);

    const [parentProduct, setParentProduct] = useState({});
    const [productsList, setProductsList] = useState([]);
    const [productsListDropdown, setProductsListDropdown] = useState([])
    const [mainProduct, setMainProduct] = useState(rowData);
    const [secondaryProduct, setSecondaryProduct] = useState({});
    const [secondaryProductLocation, setSecondaryProductLocation] = useState("")

    const [errorMsg, setErrorMsg] = useState("")

    useEffect(() => { 

        let productsList = []
        let parentProduct = {}
        let productsListDropdown = []
        for (let i = 0; i < allProducts.length; i++) {
            if (allProducts[i].id === SelectedProductId) {
                productsList = allProducts[i].skus
                parentProduct = allProducts[i]
                break;
            }
        };
        
        productsList = productsList.filter(x => x.id !== rowData.id);

        // creating an array for drop down menu 
        for (let i = 0; i < productsList.length; i++) {
            let dropDown = {}
            // 2 different supplierNo cannot merge, those that have reserved should not show in drop down
            if (!productsList[i].reserved) {
                if (typeof rowData.supplierNo === 'undefined' || productsList[i].supplierNo === rowData.supplierNo || productsList[i].supplierNo === '' || typeof productsList[i].supplierNo === 'undefined') {
                    dropDown.name = (productsList[i].location && productsList[i].location.name ? productsList[i].location.name : '') + `, ${amountRounding(2, productsList[i].quantity)}`;
                    dropDown.value = productsList[i].id
                    productsListDropdown.push(dropDown)
                }
            }

            // console.log("SUPP", productsList[i].supplierNo)
        }

        setProductsListDropdown(productsListDropdown);
        setProductsList(productsList)
        setParentProduct(parentProduct)
        // console.log("NOICE", productsList.location, rowData.id, mainProduct)


    }, [])

    const handleChange = (field, value) => {

        if (field === 'productsListDropdown') {
            let secondaryProduct = productsList.find(x => x.id === value) 
            setSecondaryProduct(secondaryProduct);
            setSecondaryProductLocation(value);
        }
        // debugger
    }

    const submitHandler = () => {

        let error = false;
        if (secondaryProductLocation === "") {
            setErrorMsg("Please select secondary product location")
            error = true;
        }
        if (error) { return null }

        let patchBody = {
            productId: parentProduct.id,
            skuIdMergeFrom: secondaryProduct.id,
            skuIdMergeTo: mainProduct.id
        }

        console.log("PATCH", patchBody)
        patchStockMergeSku(patchBody)
        setErrorMsg("")
        handleHide()
    }

    return (
        <React.Fragment>
        <div className="container" style={styles.all}>
            <div className="row"> 
                <div className="col-md-12">
                    <h2 style={styles.title}>Stock Merging </h2> 
                    <h4> {parentProduct.description} </h4>
                    <h4 style={styles.errorMsg}> {errorMsg}</h4>
                    <br />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6" style={styles.borderSplit}>
                    <div className="row">
                        <div className="col-md-12">
                            Parent SKU
                        </div>
                        <div className="col-md-8">
                            <FormInput 
                                label="Location"
                                readOnly={true}
                                value={mainProduct.location && mainProduct.location.name}
                            />
                        </div>
                        <div className="col-md-4">
                            <FormInput 
                                label="Quantity"
                                readOnly={true}
                                value={amountRounding(2, mainProduct.quantity)}
                            />
                        </div>                            
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-12">
                            Secondary SKU
                        </div>
                        <div className="col-md-8">
                            <FormInput 
                                // no need for value as all stored in upper state
                                label="Location"
                                value={secondaryProductLocation}
                                target="productsListDropdown"
                                selectValues={productsListDropdown}
                                handleChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4">
                            <FormInput 
                                label="Quantity"
                                readOnly={true}
                                value={secondaryProduct.quantity ? amountRounding(2, secondaryProduct.quantity) : ''}
                            />
                        </div>                            
                    </div>
                </div>

            </div>

            <div className="row"> 
                <div className="col-md-12">
                    <br />
                    <h4> Total Qty after Merge: {amountRounding(2, mainProduct.quantity + (secondaryProduct.quantity ? secondaryProduct.quantity : 0))} </h4>
                </div>
            </div>   
            
            <div className="row"> 
                <div className="col-md-12" style={styles.buttonDiv}>
                    <button style={styles.button} onClick={submitHandler}> Save </button>
                </div>
            </div>        

        </div>
        </React.Fragment>
    )
}

const styles = {

    all: {
        padding: '1rem',
        textAlign: 'center'
    },
    
    title: {
        margin: "0px auto", 
        color: "#254065 ", 
        letterSpacing: "2px"
    },

    errorMsg: {
        color: 'red'
    },

    borderSplit: {
        borderRight: '1px solid black'
    },

    buttonDiv: {
        margin: "20px 45%",
    },

    button: {
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
    }
}

StockMerging.propTypes = {
    rowData: PropTypes.object,
    handleHide: PropTypes.func,
    ProductFiltered: PropTypes.object,
    rowIndex: PropTypes.number,
    patchStockMergeSku: PropTypes.func 
}

export default StockMerging
  