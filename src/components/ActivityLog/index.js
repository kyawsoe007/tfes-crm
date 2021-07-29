import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Badge } from "reactstrap";

const activities = [
  {
    id: 1,
    date: "Just Now",
    activity: 'Finished task <a href="javascript:void(0)">#features</a> 4.',
    status: "primary"
  },
  {
    id: 2,
    date: "2 Feb, 11:30PM",
    activity: '<a href="javascript:void(0)">@Jessi</a> retwit your post',
    status: "info"
  },
  {
    id: 3,
    date: "3 days ago",
    activity:
      'Call to customer <a href="javascript:void(0)">#Jacob</a> and discuss the detail.',
    status: "warning"
  },
  {
    id: 4,
    date: "Just now",
    activity: 'Finished task <a href="javascript:void(0)">#features</a> 4.',
    status: "danger"
  },
  {
    id: 5,
    date: "4 days ago",
    activity:
      '<a href="javascript:void(0)">#John Doe</a> Lorem Ipsum is simply dummy text oftting industry.',
    status: "success"
  },
  {
    id: 6,
    date: "3 days ago",
    activity:
      'Call to customer <a href="javascript:void(0)">#Jacob</a> and discuss the detail.',
    status: "primary"
  },
  {
    id: 7,
    date: "5 Feb 2018, 5:15AM",
    activity:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit consectetuer adipiscing elit",
    status: "warning"
  }
];

const ActivityLog = ({}) => {
  return (
    <div className="activity-widget">
      <Scrollbars
        className="rct-scroll"
        autoHeight
        autoHeightMin={100}
        autoHeightMax={440}
        autoHide
      >
        <ul className="list-unstyled px-3">
          {activities &&
            activities.map((activity, key) => (
              <li key={key}>
                <Badge color={activity.status} className="rounded-circle p-0">
                  .
                </Badge>
                <span className="activity-time font-xs text-muted">
                  {activity.date}
                </span>
                <p
                  className="mb-0"
                  dangerouslySetInnerHTML={{ __html: activity.activity }}
                />
              </li>
            ))}
        </ul>
      </Scrollbars>
    </div>
  );
};

export default ActivityLog;
