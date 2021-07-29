import React, { Component } from "react";
import FormInput from "Components/Form/FormInput";
// import DialogRoot from "Components/Dialog/DialogRoot";
// import InputLabel from "@material-ui/core/InputLabel";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
import { Table } from "reactstrap";
import DialogRoot from 'Components/Dialog/DialogRoot'
import SkuList from 'Components/PopupPage/SkuList'
import { listOptions } from "Helpers/helpers";
// Icon
import { IconButton } from "@material-ui/core";
import { Icon } from "@iconify/react";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import updateIcon from '@iconify-icons/dashicons/update';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import fastReverseButton from '@iconify-icons/emojione-v1/fast-reverse-button';
import fastForwardButton from '@iconify-icons/emojione-v1/fast-forward-button';
// Redux imports
import { connect, useSelector } from 'react-redux';
import {
    setProduct,
    updateSkuProduct,
    getProductDetails,
    getFilterProduct,
    getProduct,
    getSingleSkuProductRequest,
    patchSingleSkuProductRequest,
    clearDuplicate,
} from 'Ducks/producttfes'
// Notification Manager import
import { NotificationManager } from 'react-notifications'
import { amountRounding } from "Helpers/helpers";

const PAGE_MAX = 5;
const options = Object.assign({}, listOptions);
class BillOfMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            salesNumber: 1,
            descriptionOne: this.props.description,
            targetSearch: "",
            // qtyOne: this.props.qty,
            // unitPrice: this.props.unitPrice,
            extPrice: 0,
            partNumber: "",
            grpOne: "",
            grpTwo: "",
            size: "",
            selOne: "",
            selTwo: "",
            brand: "",
            supp: "",
            uom: "",
            unitSgd: "",
            partNumberTwo: "",
            lines: [{
                index: 0,
                productId: "",
                partNumberOne: 1,
                descriptionTwo: "",
                grpOne: "",
                grpTwo: "",
                size: "",
                selOne: "",
                selTwo: "",
                brand: "",
                supp: "",
                uom: "",
                unitSgd: 0,
                qtyTwo: 0,
            }],
            num: 0,
            selThree: "",
            descriptionTwo: "",
            partNumberOne: "",
            qtyReq: 0,
            bomQty: 0,
            toggle: false,
            element: null,
            toggleFormSelection: true,
            edit: false,
            index: 0,
            errorMsg: "",
            hasProductId: "",
            page:1,

            // description: this.props.description,
            // quantity: this.props.qty,
            // unitPrice: this.props.unitPrice,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLineChange = this.handleLineChange.bind(this);
        this.getInfo = this.getInfo.bind(this)
    }

    componentDidMount() {
        let BomPrevList = this.props.Bom;

        if (this.props.Bom.length == 0) {
            this.setState({
                lines: [{
                    index: 1,
                    productId: "",
                    partNumberOne: "",
                    descriptionTwo: "",
                    grpOne: "",
                    grpTwo: "",
                    size: "",
                    selOne: "",
                    selTwo: "",
                    brand: "",
                    supp: "",
                    uom: "",
                    unitSgd: 0,
                    qtyTwo: 0,
                }]
            })
        } else {
            this.setState({
                lines: BomPrevList,
            })
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.description != this.props.description || prevProps.qty != this.props.qty || prevProps.unitPrice != this.props.unitPrice) {
            this.setState({
                descriptionOne: this.props.description,
                // qtyOne: this.props.qty,
                unitPrice: this.props.unitPrice,
            })
        }  
    }


    handleChange(field, value) {
        this.setState({ [field]: value });
    }

    handleLineChange(field, value, key) {
        let lines = [...this.state.lines];
        lines[key][field] = value;
        this.setState({
            lines: lines
        })
        console.log("handleLineChange",field)
    }

    buttonClick = (target, index) => {
        let targetSearch = "description:" + this.state.lines[index].descriptionTwo;
        if(this.state.lines[index].partNumber){
            targetSearch = "partNo:"+this.state.lines[index].partNumberOne;
        }
        this.setState({
            index: index + 1,
            toggle: true,
            element: target,
            targetSearch: targetSearch
        })
       
        
    }

    restartToggle = () => {
        // let lines =[...this.state.lines]

        console.log("STATE", this.state)
        this.setState({
            toggle: false,
        })
         
    }

    getInfo(productId, skuId) {
        const SKU = this.props.ProductFiltered.data;

        SKU.map((source) => {
            if (source.id == productId) {
                let skuPrice = source.listPrice;                
                
                this.setState(prevState => ({
                    lines: prevState.lines.map(eachItem =>
                        eachItem.index == this.state.index // eachItem.num
                            ? {
                                ...eachItem,
                                partNumberOne: source.partNumber,
                                sku: skuId,
                                product: productId,
                                descriptionTwo: source.description,
                                grpOne: source.grpOne && source.grpOne.name,
                                grpTwo: source.grpTwo && source.grpTwo.name,
                                size: source.size && source.size.name,
                                selOne: source.selOne && source.selOne,
                                selTwo: source.selTwo && source.selTwo,
                                brand: source.brand && source.brand.name,
                                uom: source.uom && source.uom.name,
                                // supp: source.supp.id
                                unitSgd: skuPrice,

                            }
                            : eachItem
                    )
                }));
                this.setState({
                    toggle: false,
                });
            } else if(source.id == null) {
                console.log("id is null here")
                NotificationManager.warning('SKU does not exist')
            }
        })
    }

    addNewLine = () => {
        let lines = [...this.state.lines];
        lines.push({
            index: lines.length + 1,
            product: "",
            partNumberOne: "",
            descriptionTwo: "",
            grpOne: "",
            grpTwo: "",
            size: "",
            selOne: "",
            selTwo: "",
            brand: "",
            supp: "",
            uom: "",
            unitSgd: 0,
            qtyTwo: 0,
        })
        let page = Math.ceil(lines.length/PAGE_MAX)
        this.setState({
            lines: lines,
            page:page
        })
        // this.state.lines.map ((line,index) => {
        //     // let page = this.state.page
        //     if(index>=(page-1)*PAGE_MAX && index < page* PAGE_MAX){
        //         this.state.lines.puch(line)
        //     }
        // })
    }

    deleteNewLine(index) {
        let lines = [...this.state.lines];
        lines.splice(index, 1);
        //resets the index to 0 otherwise it will bug out
        let number = 0;
        lines.forEach((item, index) => {
            // item.num = index + 1
            item.num = number + 1
            item.index = number + 1

        });

        const totalPages = Math.ceil(lines.length / PAGE_MAX)
        let page = this.state.page       
         if (this.state.page> totalPages){
            page--
        }
        this.setState({
            lines: lines,
            page:page
        })

    }
    forwardToNextQty=()=>{
        let totalPages = Math.ceil(this.state.lines.length / PAGE_MAX)

        if(totalPages!== this.state.page){
           this.setState({
               ...this.state,
               page:this.state.page+1
           })
        }

       


    }
    reverToPreQty=()=>{
        if (this.state.page!== 1){
            this.setState({
                ...this.state,
                page:this.state.page-1
            })
        }
        
    }
    
    saveBtn = () => {
        let description = this.state.descriptionOne;
        let quantity = true ;
        let unitPrice;
        let BomList = this.state.lines;
        let hasProductId = true
        let qty ;
        let extPrice;
        let error = false

        BomList.forEach((item, index) => {

            if (description === "") {
                this.setState({ errorMsg: "Error: BOM description cannot be empty!"})
                error = true
                return null
            } else if (item.descriptionTwo === "") {
                this.setState({ errorMsg: "Error: Product description cannot be empty!"})
                error = true
                return null
            } else if (item.qtyTwo <= 0) {
                this.setState({errorMsg : 'Error: Quantity can not be 0' })
                error = true
                return null
            }
        })

        // Passing the data back to the front end
        if (!error) {       
            this.props.passData(description,BomList,extPrice);
            this.props.saveToggle();
            options.onRowClick = (rowData) => this.props.getInfo(rowData[0])
            this.setState({ errorMsg : "" })
        }

    }

    render() {
        const { salesNumber, descriptionOne, qtyOne, unitPrice, partNumber, grpOne, grpTwo, selOne, selTwo, qtyTwo } = this.state;
        const { size, brand, supp, uom, unitSgd, partNumberTwo, num, selThree, extPrice, qtyReq, bomQty, descriptionTwo, partNumberOne ,page} = this.state;
        const totalPages = Math.ceil(this.state.lines.length/PAGE_MAX) 
        const pageData =  this.state.lines.slice((page-1)*PAGE_MAX,page*PAGE_MAX);
        
        return (
            <div className="Bill_Material">
                {this.state.errorMsg && (<h4 class="text-danger text-center">{this.state.errorMsg}</h4>)}
                <div class="row " style={{ display: "flex" }}>
                    <div class="col-sm-11 "></div>
                    <div class="col-sm-1 "><button
                        onClick={this.saveBtn}
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
                    </button></div>
                    {/* {console.log("kankan lines" ,this.state.lines)} */}
                </div>
                <div >
                    <form autoComplete="off" >
                        <div class="row" style={{ display: "flex" }}>
                            <div class="col-sm-1 ">
                                <FormInput label="S/N"
                                    value={salesNumber}
                                    target="salesNumber"
                                    handleChange={this.handleChange}
                                    readOnly={true} />
                            </div>

                            <div class="col-sm-8 ">
                                <FormInput label="Description"
                                    value={descriptionOne}
                                    target="descriptionOne"
                                    handleChange={this.handleChange}
                                />
                            </div>
                            {/* <div class="col-sm-1 ">
                                <FormInput label="Qty"
                                    value={qtyOne}
                                    target="qtyOne"
                                    handleChange={this.handleChange} />
                            </div>
                            <div class="col-sm-2 ">
                                <FormInput label="Unit Price"
                                    value={unitPrice}
                                    target="unitPrice"
                                    handleChange={this.handleChange} />
                            </div> */}
                        </div>
                        {
                            pageData.map((line, i) =>  { 
                                let index = i + (page-1) * PAGE_MAX;
                                return (
                                <div class="row material-skuList" style={{ display: "flex" }}>
                                    <div class="col-sm-5" style={{ display: "flex", paddingLeft: "0", paddingRight: "0" }}>
                                        <div class="col-sm-2 ">
                                            <FormInput label="P/N"
                                                value={line.partNumberOne}
                                                target="partNumberOne"
                                                keys={index}
                                                handleChange={this.handleLineChange}
                                                readOnly={true}
                                            />
                                        </div>
                                        <div class="col-sm-10 ">
                                            <FormInput label="Description"
                                                value={line.descriptionTwo}
                                                keys={index}
                                                target="descriptionTwo"
                                                handleChange={this.handleLineChange}
                                                readOnly={true} 
                                                hasButton={this.state.edit ? false : true}
                                                buttonClick={() => this.buttonClick("descriptionTwo", index)}
                                            />
                                        </div>
                                    </div>
                                    <div class="col-sm-7" style={{ display: "flex", paddingLeft: "0" }}>
                                        <div class="col-sm-1 ">
                                            <FormInput label="GRP1"
                                                value={line.grpOne}
                                                keys={index}
                                                target="grpOne"
                                                handleChange={this.handleLineChange}
                                                readOnly={true}
                                            />
                                        </div>
                                        <div class="col-sm-1 ">
                                            <FormInput label="GRP2"
                                                value={line.grpTwo}
                                                keys={index}
                                                target="grpTwo"
                                                handleChange={this.handleLineChange}
                                                readOnly={true}
                                            />
                                        </div>
                                        <div class="col-sm-1 ">
                                            <FormInput label="SIZE "
                                                value={line.size}
                                                keys={index}
                                                target="size"
                                                handleChange={this.handleLineChange}
                                                readOnly={true}
                                            />
                                        </div>
                                        <div class="col-sm-1 ">
                                            <FormInput label="SEL 1"
                                                value={line.selOne}
                                                keys={index}
                                                target="selOne"
                                                handleChange={this.handleLineChange}
                                                readOnly={true}
                                            />
                                        </div>
                                        <div class="col-sm-1 ">
                                            <FormInput label="SEL 2"
                                                value={line.selTwo}
                                                keys={index}
                                                target="selTwo"
                                                handleChange={this.handleLineChange}
                                                readOnly={true}
                                            />
                                        </div>
                                        <div class="col-sm-1 ">
                                            <FormInput label="Brand"
                                                value={line.brand}
                                                keys={index}
                                                target="brand"
                                                handleChange={this.handleLineChange}
                                                readOnly={true}
                                            />
                                        </div>
                                        <div class="col-sm-1 ">
                                            <FormInput label="Supp"
                                                value={line.supp}
                                                keys={index}
                                                target="supp"
                                                handleChange={this.handleLineChange}
                                                readOnly={true}
                                            />
                                        </div>
                                        <div class="col-sm-1 ">
                                            <FormInput label="UOM"
                                                value={line.uom}
                                                keys={index}
                                                target="uom"
                                                handleChange={this.handleLineChange}
                                                readOnly={true}
                                            />
                                        </div>
                                        <div class="col-sm-2 ">
                                            <FormInput label="Unit SGD"
                                                value={amountRounding(2,line.unitSgd)}
                                                keys={index}
                                                target="unitSgd"
                                                handleChange={this.handleLineChange}
                                                readOnly={true}
                                            />
                                        </div>
                                        <div class="col-sm-1 ">
                                            <FormInput label="QTY"
                                                value={line.qtyTwo}
                                                keys={index}
                                                target="qtyTwo"
                                                handleChange={this.handleLineChange}
                                            // readOnly={true}
                                            />
                                        </div>


                                        <div class="col-sm-1 quotation-btn" style={{ display: "flex", justifyContent: "space-between" }} >
                                            <HighlightOffIcon

                                                size="small"
                                                className="tableOffIcon"
                                                onClick={() => this.deleteNewLine(index)}
                                                style={{
                                                    verticalAlign: "middle",
                                                    justifyContent: "center", marginLeft: "30%"
                                                }}
                                            >
                                            </HighlightOffIcon>
                                        </div>
                                    </div>
                                </div>

                            ) }
                            )
                        }
                        <div class="row quotation-btn">
                            <AddCircleOutlineIcon
                                className="tableAddIcon"
                                onClick={this.addNewLine}
                            />
                        </div>
                        <div class=" preQty-nextQty"
                            style={{ display: "flex", justifyContent: "flex-end" }}>
                            <p>Pre Qty #</p>
                            <div>
                                <Icon icon={fastReverseButton}
                                    className="fastReverseButton"
                                    onClick={this.reverToPreQty}
                                />
                            </div>
                            <p>{page}of{totalPages}</p>
                            <div>
                                <Icon icon={fastForwardButton}
                                    className="fastForwardButton"
                                    onClick={this.forwardToNextQty}
                                />
                            </div>
                            <p>Next Qty #</p>
                        </div>

                        <div class="boundary-line"
                            style={{ height: "1px", margin: "5px auto " }}
                        ></div>
{/* 
                        <div class="row" style={{ display: "flex", paddingLeft: "0", paddingRight: "0" }}>
                            <div class="col-sm-9 material-table">
                                <Table size="sm">
                                    <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>P/N</th>
                                            <th style={{ width: "25%" }}>Description</th>
                                            <th>SEL 2</th>
                                            <th>Brand</th>
                                            <th>Supp</th>
                                            <th>UOM</th>
                                            <th>Qty</th>
                                            <th>Unit Price</th>
                                            <th>Ext Price</th>
                                            <th>Qty Req</th>
                                            <th>BOM Qty</th>
                                        </tr>
                                    </thead>
                                    <tbody>



                                    </tbody>

                                </Table>

                            </div>
                            <div class="col-sm-3 quoSummary" style={{ margin: "15px auto" }} >

                                <FormInput label="PART NUMBER
"                                        value={partNumberTwo}
                                    target="partNumberTwo"
                                    handleChange={this.handleLineChange}
                                />
                            </div>

                        </div> */}


                    </form>

                </div>
                <DialogRoot
                    show={this.state.toggle}
                    handleHide={this.restartToggle}
                    size={'lg'}
                >
                    <SkuList getInfo={this.getInfo} targetSearch={this.state.targetSearch} />
                </DialogRoot>

            </div>

        )


    }

}
const mapStateToProps = ({ producttfesState }) => {
    const { ProductFiltered, ProductDetails, SkuProduct } = producttfesState
    return { ProductFiltered, ProductDetails, SkuProduct }
}

export default connect(mapStateToProps, {
    setProduct,
    updateSkuProduct,
    getProductDetails,
    getFilterProduct,
    getSingleSkuProductRequest,
    patchSingleSkuProductRequest,
    clearDuplicate,
})(BillOfMaterial)