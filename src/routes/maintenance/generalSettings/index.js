import React from 'react';

// MATERIAL UI COMPONENTS 
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// IMPORT COMPONENTS 
import PoDetails from "./components/PoDetails";
import DoDetails from "./doApproval/DoDetails";
import SaleTargetDetails from "./target/TargetDetails";
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
  title: {
    textAlign: "center"
  }
}));

const GeneralSettingsPage = () => {
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
              }} > General Settings
      </div>
      {/* <h1 className={classes.title}> General Settings </h1> */}
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="P.O Approval" {...a11yProps(0)} />
         <Tab label="D.O Approval" {...a11yProps(1)} />
        <Tab label="Targets" {...a11yProps(2)} /> 
      </Tabs>
      <TabPanel value={value} index={0}>
        <PoDetails />
      </TabPanel>
       <TabPanel value={value} index={1}>
        <DoDetails/>
      </TabPanel>
      <TabPanel value={value} index={2}>
       <SaleTargetDetails/>
      </TabPanel>
    </div>
    </div>
  );
}

export default GeneralSettingsPage;


// https://material-ui.com/components/tabs/