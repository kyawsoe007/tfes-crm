import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import AppConfig from "Constants/AppConfig";
import RctSectionLoader from "Components/RctSectionLoader";

const StyledTabs = withStyles({
  flexContainer: {
    borderBottom: "1px solid #ebedf2"
  },
  indicator: {
    display: "flex",
    height: "3px",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > div": {
      maxWidth: "50%",
      width: "100%",
      backgroundColor: AppConfig.themeColors.secondary
    }
  }
})(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles(theme => ({
  root: {
    color: "#a7a7a7",
    fontSize: theme.typography.pxToRem(15),
    "&:focus": {
      opacity: 1
    },
    "&$selected": {
      color: "#4c4c4c"
    }
  },
  wrapper: {
    fontWeight: "700"
  },
  selected: {}
}))(props => <Tab disableFocusRipple disableTouchRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      className="profile-tabs-container"
      {...other}
    >
      {children}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export default function ProfileTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const { children, loading } = props;
  return (
    <div className={classes.root}>
      <StyledTabs
        value={value}
        onChange={handleChange}
        aria-label="profile tabs"
      >
        {children &&
          children.map((tabs, key) => (
            <StyledTab key={key} label={tabs.props.label} {...a11yProps(key)} />
          ))}
      </StyledTabs>

      {children &&
        children.map((tabs, key) => (
          <TabPanel value={value} index={key} key={key}>
            {tabs.props.children}
            {loading && <RctSectionLoader />}
          </TabPanel>
        ))}
    </div>
  );
}
