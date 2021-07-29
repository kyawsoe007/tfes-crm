import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from '@material-ui/core';


// icon
// npm install --save-dev @iconify/react @iconify-icons/ri
import { Icon, InlineIcon } from '@iconify/react';
import contactsFill from '@iconify-icons/ri/contacts-fill';
import { OutlinedFlag } from "@material-ui/icons";
import { connectModal } from "redux-modal";
import { getAllCurrences } from "Ducks/finance-settings/currences";

class DashboardRates extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            
        }
    }

    componentDidMount(){
        this.props.getAllCurrences();
    }
   
    render() {
        let usdConversion = "-";
        let rmbConversion = "-";
        let euroConversion = "-";
        let usd = 0;
        let sgd = 0;
        let rmb = 0;
        let euro = 0;

        
        for(let i=0; i < this.props.currencesAll.data.length; i++){
            if(this.props.currencesAll.data[i].symbol == "USD" && this.props.currencesAll.data[i].latestRate){
                usd = this.props.currencesAll.data[i].latestRate;
            }
            else if(this.props.currencesAll.data[i].symbol == "SGD" && this.props.currencesAll.data[i].latestRate){
                sgd = this.props.currencesAll.data[i].latestRate;
            }
            else if(this.props.currencesAll.data[i].symbol == "EUR" && this.props.currencesAll.data[i].latestRate){
                euro = this.props.currencesAll.data[i].latestRate;
            }
            else if(this.props.currencesAll.data[i].symbol == "RMB" && this.props.currencesAll.data[i].latestRate){
                rmb = this.props.currencesAll.data[i].latestRate;
            }
        }
        if(usd > 0 && sgd > 0){
            let conversion = Math.round((sgd / usd) * 100) / 100;
            usdConversion = "1.00 \u00a0 =  \u00a0 "+ conversion;

        }
        if(rmb > 0 && sgd > 0){
            rmbConversion = "1.00 \u00a0 =  \u00a0 "+ rmb;
        }
        if(usd > 0 && euro > 0){
            let conversion = Math.round((1 / usd) * 100 * euro) / 100;
            euroConversion = "1.00 \u00a0 =  \u00a0 "+ conversion;
        }

        return (
            <Grid className="dashboardGrid_top_container" container spacing={2}>
                 <Grid item sm={12}>
                    <h3>Rates</h3>  
                </Grid>
                <Grid item sm={4} >
                    <div   className="dashbord_gird_container" >
                        <div  className="row" style={{ flexGrow: "1",textAlign:"center", alignItems:"center"}}>
                            <div className="col-6" style={{}}> <h4 >USD   &nbsp;  &gt;   &nbsp;  SGD</h4 ></div>
                            <div className="col-6" style={{}}> <h4>{ usdConversion }</h4></div>
                        </div>
                        {/* <div  className="row" style={{ flexGrow: "1",textAlign:"center",alignItems:"center"}}>
                            <div className="col-6" style={{}}></div>
                            <div className="col-6"></div>
                        </div> */}
                        
                    </div>
                </Grid>
                <Grid item sm={4} >
                    <div   className="dashbord_gird_container" >
                        <div  className="row" style={{ flexGrow: "1",textAlign:"center", alignItems:"center"}}>
                            <div className="col-6" style={{}}> <h4 style={{margin:0 }}>SGD   &nbsp;  &gt;   &nbsp;  RMB</h4></div>
                            <div className="col-6" style={{}}> <h4 style={{margin:0 }}>{ rmbConversion }</h4></div>
                           
                        </div>
                         {/* <div  className="row" style={{ flexGrow: "1",textAlign:"center",alignItems:"center"}}>
                            <div className="col-6" style={{}}></div>
                            <div className="col-6"></div>
                        </div> */}
                        
                    </div>
                </Grid>
                <Grid item sm={4} >
                    <div   className="dashbord_gird_container" >
                        <div  className="row" style={{ flexGrow: "1",textAlign:"center", alignItems:"center"}}>
                            <div className="col-6" style={{}}> <h4 style={{margin:0 }}>USD   &nbsp; &gt;  &nbsp;  EUR</h4></div>
                            <div className="col-6" style={{}}> <h4 style={{margin:0 }}>{ euroConversion }</h4></div>
                            
                        </div>
                         {/* <div  className="row" style={{ flexGrow: "1",textAlign:"center",alignItems:"center"}}>
                            <div className="col-6" style={{}}></div>
                            <div className="col-6"></div>
                        </div> */}
                        
                    </div>
                </Grid>
                
               
                
             
            </Grid>
           
           
        );
    }




}

const mapStateToProps=({financeState})=>{
    const {CurrencesState} =financeState
        return CurrencesState
    }
export default connect(mapStateToProps,{
    getAllCurrences
})(DashboardRates)