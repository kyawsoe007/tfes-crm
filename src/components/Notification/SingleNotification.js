import React from "react";

const SingleNotification = ({ notification }) => {
  return (
    <li>
      <div className="media">
        <div className="mr-10">
          {/* <img
            src={notification.userAvatar}
            alt="user profile"
            className="media-object rounded-circle"
            width="50"
            height="50"
          /> */}
        </div>
        <div className="media-body pt-5">
          <div className="d-flex justify-content-between">
            <h5 className="mb-5 text-primary">{notification.userName}</h5>
            <span className="text-muted fs-12">{notification.date}</span>
          </div>
          <span className="text-muted fs-12 d-block">
            {notification.notification}
          </span>
        </div>
      </div>
    </li>
  );
};

export default SingleNotification;
