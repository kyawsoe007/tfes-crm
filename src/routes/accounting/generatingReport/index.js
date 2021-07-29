import React, { useState ,useEffect } from "react";
// material-ui components
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useSelector } from 'react-redux'

//sub components
import GeneralReportsList from"./components/GeneralReportsList"
//icon
// Actions
function TabPanel(props){
    const {children ,value ,index , ...other }=props
    return(
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}   
            {...other}     
            >
            {value ===index &&(
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: "85vh",
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  }));
const GeneratingReportList =()=>{
    const userLogin = useSelector((state) => state.sessionState.authState.user)
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const[generalTabData,setGeneralTabData] =useState([])
    const[customerTabData,setCustomerTabData] =useState([])
    const[stockTabData,setStockTabData] =useState([])
    const[commercialTabData,setCommercialTabData] =useState([])
    const[financeTabData, setFinanceTabData] = useState([])
    useEffect(() => { 
    // General Report  
    if(userLogin.access.includes("finance_setting")){
        setGeneralTabData([{name:"General Ledger"},{ name: "Trial Balance" }, {name:"Profit & Loss"},{name:"Balance Sheet"},{name:"GST Report"}, { name: "Journal Item Report" }, { name: "Account Journal Report" }])
    }
    // Customer Report
    if(userLogin.access.includes("finance_setting")){
        setCustomerTabData([{name:"Customer Aging"},{name:"All Customer Aging"},{name: "Customer Statement of Accounts"}])
    }
    // Stock Report
    if(userLogin.access.includes("finance_setting")&&userLogin.access.includes("stock_management")&&userLogin.access.includes("commercial_setting")){
        setStockTabData([{name:"Stock Valuation Report"}, {name:"Stock Movement Report"}])
    }
    else if( (userLogin.access.includes("finance_setting" )||userLogin.access.includes("commercial_setting")) && !userLogin.access.includes("stock_management")){
        setStockTabData([{name:"Stock Valuation Report"}])
    }
    else if (userLogin.access.includes("finance_setting")||userLogin.access.includes("stock_management")){
        setStockTabData([ {name:"Stock Movement Report"}])  
    }
    // Commercial report
    if(userLogin.access.includes("finance_setting")){
        setCommercialTabData([{name:"Sales Report"}, {name:"Sales Order Report"}, {name:"Back Order Report"}, {name:"Purchase Order Report"}])
    } 
    else if(userLogin.access.includes("sales_order")&&userLogin.access.includes("purchase_order")){
        setCommercialTabData([{name:"Sales Order Report"}, {name:"Back Order Report"}, {name:"Purchase Order Report"}])
    }
    else if (userLogin.access.includes("purchase_order") && !userLogin.access.includes("sales_order")){
        setCommercialTabData([{name:"Purchase Order Report"}])  
    }
    else if (userLogin.access.includes("sales_order" ) && !userLogin.access.includes("purchase_order")){
      setCommercialTabData([{name:"Sales Order Report"}, {name:"Back Order Report"}])
    }  
    

    }, [])

  
 
  
  
    return(
        <div>
            <div  
                style={{
                    width:"50%",
                    margin:"10px auto",
                    minWidth:"400px",
                    color:"#2b4da0",
                    fontWeight:"bolder",
                    fontSize:"18px",
                    textAlign:"center", 
                    }} >Reports
            </div>
            <div className={classes.root}>

            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="General" {...a11yProps(0)} />
                <Tab label="Customer" {...a11yProps(1)} />
                <Tab label="Stock" {...a11yProps(2)} />
                <Tab label="Commercial" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <GeneralReportsList
                data={generalTabData}
                title={"General Report"}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <GeneralReportsList
                data={customerTabData}
                title={"Customer Report"}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <GeneralReportsList
                data={stockTabData}
                title={"Stock Report"}
                />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <GeneralReportsList
                data={commercialTabData}
                title={"Commercial Report"}
                />
            </TabPanel>
            </div>
        </div>

    )



}

export default GeneratingReportList;