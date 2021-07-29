import React, { useState } from 'react';

// MATERIAL UI COMPONENTS 
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import StockLocations from '../../warehouse/warehouseSettings/components/StockLocations';
import PaymentTerm from './components/paymentTerm/PaymentTerm'
import DownPayment from './components/downPayment/DownPayment'
import CreditTerm from './components/creditTerm/creditTerm'
import CreditLimit from './components/creditLimit/creditLimit'
import CurrencyList from './components/currency/CurrencyList.js'
import EditCurrency from './components/currency/EditCurrency.js'
import FiscalYearList from './components/fiscalYear/FiscalYear'
import EditFiscalYear from './components/fiscalYear/EditFiscalYear'
import AccountJournal from './components/accountJournal/accountJournal';
import EditAccountJournal from './components/accountJournal/EditAccountJournal'
import PurchaseSetting from './components/purchaseSetting/PurchaseSetting';
import PaymentMethod from './components/paymentMethod/PaymentMethod';
import ProfitAndLossSetting from './components/profitAndLoss/ProfitAndLossSetting';
import BalanceSheetSetting from './components/balanceSheet/BalanceSheetSetting';
// IMPORT COMPONENTS 
// import StockLocations from './warehouseSettings/components/StockLocations';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
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

const FinanceSettings = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [editData, setEditData] = React.useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [onEditToggle,setOnEditToggle]= useState(true);
  
  const onEdit = (mode,value) =>{
    setOnEditToggle(mode)
    console.log(value);
    setEditData(value)
  } 

  return (
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
              }} > Finance Settings 
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
        <Tab label="Payment Term" {...a11yProps(0)} />
        <Tab label="Down Payment" {...a11yProps(1)} />
          <Tab label="Credit Term" {...a11yProps(2)} />
          <Tab label="Credit Limit" {...a11yProps(3)} />
          <Tab label="Currency" {...a11yProps(3)} />
          <Tab label="Fiscal Year" {...a11yProps(4)}/>
          <Tab label='Account Journal' {...a11yProps(5)}/>
          <Tab label='Purchase Setting' {...a11yProps(6)}/>
          <Tab label='Payment Method' {...a11yProps(7)}/>
          <Tab label='Profit & Loss' {...a11yProps(8)}/>
        <Tab label='Balance Sheet' {...a11yProps(9)}/>
      </Tabs>
      <TabPanel value={value} index={0}>
        <h2  style={{paddingTop:"15px",paddingLeft:"25px"}}>Payment Term</h2>
        <PaymentTerm />
      </TabPanel>
      <TabPanel value={value} index={1}>
          <h2 style={{ paddingTop: "15px", paddingLeft: "25px" }}> DownPayment</h2>
          <DownPayment/>
      </TabPanel>
      <TabPanel value={value} index={2}>
          <h2 style={{ paddingTop: "15px", paddingLeft: "25px" }}>Credit Term</h2>
          <CreditTerm/>
      </TabPanel>
      <TabPanel value={value} index={3}>
          <h2 style={{ paddingTop: "15px", paddingLeft: "25px" }}>Credit Limit</h2>
          <CreditLimit/>
      </TabPanel>
      <TabPanel value={value} index={4} style={{ padding:"15px 25px" ,width:"100%"}} >
          <h2 style={{ paddingTop: "15px", paddingLeft: "25px" }}>Currency</h2>
              {
                onEditToggle ? (<CurrencyList
           
                  onEdit={onEdit}
                
                  />) : (
                <EditCurrency onEdit={onEdit} editData={editData}/>
                  )
              }             
      </TabPanel>
      <TabPanel value={value} index={5} style={{ padding:"15px 25px" ,width:"100%"}} >
          <h2 style={{ paddingTop: "15px", paddingLeft: "25px" }}>Fiscal Year</h2>
              {
                onEditToggle ? (<FiscalYearList
           
                  onEdit={onEdit}
                
                  />) : (
                <EditFiscalYear onEdit={onEdit} editData={editData}/>
                  )
              }             
      </TabPanel>
      <TabPanel value={value} index={6} style={{ padding:"15px 25px" ,width:"100%"}} >
          <h2 style={{ paddingTop: "15px", paddingLeft: "25px" }}>Account Journal</h2>
              {
                onEditToggle ? (<AccountJournal
           
                  onEdit={onEdit}
                
                  />) : (
                <EditAccountJournal onEdit={onEdit} editData={editData}/>
                  )
              }             
      </TabPanel>
      <TabPanel value={value} index={7}>
      <h2 style={{ paddingTop: "15px", paddingLeft: "25px" }}>Purchase Setting</h2>
        <PurchaseSetting/>
      </TabPanel>
      <TabPanel value={value} index={8}>
      <h2 style={{ paddingTop: "15px", paddingLeft: "25px" }}>Payment Method</h2>
        <PaymentMethod/>
      </TabPanel>
      <TabPanel value={value} index={9}>
        <h2 style={{ paddingTop: "15px", paddingLeft: "25px" }}>Profit & Loss</h2>
        <ProfitAndLossSetting />
      </TabPanel>
      <TabPanel value={value} index={10}>
        <h2 style={{ paddingTop: "15px", paddingLeft: "25px" }}>Balance Sheet</h2>
        <BalanceSheetSetting />
      </TabPanel>
    </div>
    </div>
    
  );
}

export default FinanceSettings;


// https://material-ui.com/components/tabs/