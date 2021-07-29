import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllEvents } from "Ducks/calendar";

import Calendar from "react-calendar";
import DisplayEvents from "./DisplayEvents";
import Moment from "moment";

const numberOfDays = 6;

class CalendarLayout extends Component {
  componentDidMount() {
    const userId = localStorage.getItem("user_id");
    this.props.getAllEvents(
      true,
      new Date().toISOString(),
      Moment(new Date())
        .add(numberOfDays, "day")
        .toISOString(),
      userId
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <Calendar
            className="react-calendar"
            returnValue="range"
            value={[
              new Date(),
              new Date(Moment(new Date()).add(numberOfDays, "day"))
            ]}
          />
        </div>
        <div className="col-12">
   
        </div>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ calendarState }) => {
  const { myEvents } = calendarState;
  return {
    myEvents
  };
};

export default connect(
  mapStateToProps,
  {
    getAllEvents
  }
)(CalendarLayout);

// {"where": {"start": {"lt": "2019-07-18T02:38:03.197Z"}}}

// :
