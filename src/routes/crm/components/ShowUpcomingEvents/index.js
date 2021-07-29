import React from "react";
import { Info } from "Components/Layout/ProfileCard";
import { CalendarToday } from "@material-ui/icons";
import { getTheDate, getEventTime } from "Helpers/helpers";
import moment from "moment";

function ShowUpcoming({ events }) {
  const filteredEvents = events
    .filter(event =>
      event.allDay
        ? moment().diff(event.start, "days") <= 0
        : moment().diff(event.start, "minutes") <= 0
    )
    .sort((a, b) => b.start - a.start);

  var showInfo =
    filteredEvents.length > 0 ? (
      filteredEvents
        .slice(0, 3)
        .map((event, key) => (
          <Info
            key={key}
            icon={<CalendarToday fontSize="small" />}
            title={event.title}
            subtitle={`${getTheDate(event.start)} - ${getEventTime(
              event.start,
              event.allDay
            )}`}
          />
        ))
    ) : (
      <p className="text-center text-muted">No events upcoming</p>
    );

  return showInfo;
}

export default ShowUpcoming;
