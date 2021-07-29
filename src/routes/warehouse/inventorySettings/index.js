import React from 'react';

// MATERIAL UI COMPONENTS 
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// IMPORT COMPONENTS 
import GrpOne from './components/grpOneTab/GrpOne';
import GrpTwo from './components/grpTwoTab/GrpTwo';
import Size from './components/sizeTab/Size';
import Material from "./components/materialTab/Material";
import Brand from "./components/brandTab/Brand";
import Uom from "./components/uomTab/Uom";

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

const InventorySettings = () => {
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
              }} > Inventory Settings 
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
        <Tab label="Grp1" {...a11yProps(0)} />
        <Tab label="Grp2" {...a11yProps(1)} />
        <Tab label="Size" {...a11yProps(2)} />
        <Tab label="Materials" {...a11yProps(3)} />
        <Tab label="Brands" {...a11yProps(4)} />
        <Tab label="UOM" {...a11yProps(5)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <GrpOne />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GrpTwo />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Size />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Material />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Brand />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Uom />
      </TabPanel>
    </div>
    </div>
    
  );
}

export default InventorySettings;


// https://material-ui.com/components/tabs/