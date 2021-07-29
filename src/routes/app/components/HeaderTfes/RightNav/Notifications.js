import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { Badge } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import NotificationIcon from "@material-ui/icons/Notifications";

import SingleNotification from "Components/SingleNotification";
import NoNotificationMessage from "Components/NoNotificationMessage";

class Notifications extends Component {
  state = {
    notifications: null,
    shake: false,
    newNotifications: 0
  };

  componentDidMount() {
    //this.getNotifications();
  }

  render() {
    const { notifications, newNotifications, shake } = this.state;
    return (
      <UncontrolledDropdown
        nav
        className="list-inline-item notification-dropdown"
      >
        <DropdownToggle nav className="p-0">
          <Tooltip title="Notifications" placement="bottom">
            <IconButton className={shake && "shake"} aria-label="bell">
              <NotificationIcon fontSize="small" />
              {newNotifications > 0 && (
                <Badge
                  color="danger"
                  className="badge-xs badge-top-right rct-notify"
                >
                  {newNotifications}
                </Badge>
              )}
            </IconButton>
          </Tooltip>
        </DropdownToggle>
        <DropdownMenu right>
          <div className="dropdown-content">
            <div className="dropdown-top d-flex justify-content-between rounded-top bg-secondary">
              <span className="text-white font-weight-bold">Notifications</span>
              {newNotifications > 0 && (
                <Badge color="warning">{newNotifications} NEW</Badge>
              )}
            </div>
            <Scrollbars
              className="rct-scroll"
              autoHeight
              autoHeightMin={300}
              autoHeightMax={300}
            >
              {notifications ? (
                <ul className="list-unstyled dropdown-list">
                  {notifications.map((notification, key) => (
                    <SingleNotification key={key} notification={notification} />
                  ))}
                </ul>
              ) : (
                <NoNotificationMessage />
              )}
            </Scrollbars>
          </div>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

export default Notifications;
