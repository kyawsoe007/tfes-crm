import React from "react";
import BgCard from "Components/BgCard";
import Avatar from "Components/Avatar";

const UserBlock = ({ user }) => {
  const { name, email } = user;
  return (
    <BgCard fullBlock>
      <div className="d-flex border-bottom p-40">
        <div className="media">
          <div className="media-left mr-25">
            <Avatar name={name} size={60} />
          </div>
          <div className="media-body my-auto">
            <h3 className="mb-5">{user ? name : ""}</h3>
            <span className="text-muted mb-0 d-block">{user ? email : ""}</span>
          </div>
        </div>
      </div>
    </BgCard>
  );
};

export default UserBlock;
