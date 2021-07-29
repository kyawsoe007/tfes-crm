import React from 'react';

// MATERIAL UI COMPONENTS 
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// IMPORT COMPONENTS 
import StockLocations from './components/StockLocations';
import IncoTerms from './components/incoTerm/IncoTerms'

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

const WarehouseSettings = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
              }} > Warehouse Settings 
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
        <Tab label="Locations" {...a11yProps(0)} />
         <Tab label="IncoTerm" {...a11yProps(1)} />
        {/* <Tab label="Lorem Ipsum2" {...a11yProps(2)} /> */} 
      </Tabs>
      <TabPanel value={value} index={0}>
        <StockLocations />
      </TabPanel>
        <TabPanel value={value} index={1}>
        <h2  style={{paddingTop:"15px",paddingLeft:"25px"}}>IncoTerm</h2>
       <IncoTerms/>
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        Lorem Ipsum 2
      </TabPanel>  */}
    </div>
    </div>
    
  );
}

export default WarehouseSettings;


// https://material-ui.com/components/tabs/