import React from "react";
import BgCard from "Components/BgCard";

const Wrapper = props => (
  <BgCard fullBlock>
    <div className="profile-card">{props.children}</div>
  </BgCard>
);

export { Wrapper };
