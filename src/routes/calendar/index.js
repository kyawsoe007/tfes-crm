import React, { Component } from "react";
import Helmet from "Components/Helmet";

import { connect } from "react-redux";
import { show } from "redux-modal";

import BigCalendar from "react-big-calendar";
import moment from "moment";

// Calendar Components
import CustomToolbar from "./components/CustomToolbar";
import CustomEvent from "./components/CustomEventView";
import Filterbar from "./components/FilterSidebar";

// Event Info
import EventInfo from "./components/EventInfo";

// Calendar form
import NewEventForm from "./components/forms/NewEventForm";

import { getAllEvents, addEvent } from "Ducks/calendar";
// import { filterChange } from "Com"
import Popover from "@material-ui/core/Popover";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarView: "week",
      showPop: false,
      component: null,
      x: 0,
      y: 0,
      adjustY: 0,
    };
    this.renderEventFormPopover = this.renderEventFormPopover.bind(this);
    this.renderEventPopover = this.renderEventPopover.bind(this);
    this.onMouseDownCapture = this.onMouseDownCapture.bind(this);
    this.newEvent = this.newEvent.bind(this);
    this.closePopover = this.closePopover.bind(this);
    this.filterChange = this.filterChange.bind(this);
    this.showEditForm = this.showEditForm.bind(this);
  }

  componentDidMount() {
    this.props.getAllEvents();
  }

  filterChange(event) {
    // this.props
  }

  // create new event
  newEvent(event) {
    this.setState({ showPop: !this.state.showPop });
    this.props.addEvent(event);
  }

  // Axis for popover
  onMouseDownCapture(e) {
    let pageX = e.pageX - 20;
    let pageY = e.pageY - 20;

    //check current viewport size
    let h = window.innerHeight;
    let adjustY = 0;
    if (h - pageY < 400) {
      adjustY = h - pageY - 450;
    }

    this.setState({ x: pageX, y: pageY, adjustY: adjustY });
  }

  closePopover() {
    this.setState({ showPop: false });
  }

  // show popover on calendar tile click
  renderEventFormPopover(slotSelected) {
    this.setState({
      showPop: !this.state.showPop,
      component: this.renderForm(slotSelected),
    });
  }

  showEditForm(eventInfo) {
    this.setState({ showPop: false }, () => {
      this.setState({
        y: this.state.y + this.state.adjustY,
        showPop: true,
        component: <EventInfo eventInfo={eventInfo} handleClose={this.closePopover} showEditForm={this.showEditForm} edit={true} />,
      });
    });
  }

  renderEventPopover(slotSelected) {
    this.setState({ showPop: true, component: this.renderEvent(slotSelected) });
  }

  renderEvent = (slotSelected) => (
    <React.Fragment>
      {console.log(slotSelected)}
      <EventInfo eventInfo={slotSelected} handleClose={this.closePopover} adjustPosition={this.adjustPopoverPostion} edit={false} showEditForm={this.showEditForm} />
    </React.Fragment>
  );

  renderForm = (slotSelected) => (
    <React.Fragment>
      <div className="d-flex justify-content-center pt-10 text-muted">
        <h2>New Event</h2>
      </div>
      <NewEventForm dayView={slotSelected} addEvent={this.newEvent} />
    </React.Fragment>
  );
  eventStyleGetter = (event, start, end, isSelected) => {
    var backgroundColor = "#";
    switch (event.title) {
      case "Test Drive":
        backgroundColor += "D9F4C8";
        break;
      case "Maintenance":
        backgroundColor += "F4CAC2";
        break;
      default:
      // code block
    }

    var style = {
      backgroundColor: backgroundColor,
      borderRadius: "0px",
      opacity: 0.7,
      color: "black",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };
  render() {
    const { showEvents } = this.props;
    const { showPop, x, y, invis } = this.state;
    return (
      <React.Fragment>
        <Helmet title="Calendar" metaDesc="Everyday Calendar" />
        <div style={{ display: "flex" }}>
          <div className="col-md-2">
            <Filterbar />
          </div>
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-12" onMouseDownCapture={this.onMouseDownCapture}>
                <BigCalendar
                  popup
                  style={{ position: "relative" }}
                  selectable
                  events={showEvents}
                  views={["month", "week", "day"]}
                  eventPropGetter={this.eventStyleGetter}
                  onSelectEvent={(slotSelected) => this.renderEventPopover(slotSelected)}
                  defaultDate={new Date()}
                  onSelectSlot={(slotSelected) => this.renderEventFormPopover(slotSelected)}
                  components={{
                    toolbar: CustomToolbar,
                    event: CustomEvent,
                  }}
                />
              </div>
            </div>
          </div>
          <Popover
            id={"calendar-popover"}
            open={showPop}
            onClose={this.closePopover}
            anchorReference="anchorPosition"
            anchorPosition={{ top: y, left: x }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            elevation={2}
          >
            <div className="w-100" style={{ minWidth: 400, maxWidth: 500, padding: 20 }}>
              {this.state.component}
            </div>
          </Popover>
        </div>
        {console.log(this.props.showEvents)}
      </React.Fragment>
    );
  }
}

// map state to props
const mapStateToProps = ({ calendarState }) => {
  const { showEvents } = calendarState;
  return { showEvents };
};

export default connect(mapStateToProps, {
  getAllEvents,
  addEvent,
  show,
})(Calendar);
