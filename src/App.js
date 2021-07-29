/**
 * Main App
 */
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//date moment - material ui
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import MomentUtils from "@date-io/moment";

/**
 * CSS imports
 */
// Use For Full Calender
import "react-big-calendar/lib/css/react-big-calendar.css";
// notifications
import "react-notifications/lib/notifications.css";
// calendar
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
// Custom Style File
import "Assets/scss/_style.scss";
// date time picker
import "react-day-picker/lib/style.css";


// app component
import App from "Routes/app";

import { store } from "Redux/store";

const MainApp = () => (
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>
      <Router>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </Router>
    </MuiPickersUtilsProvider>
  </Provider>
);

export default MainApp;
