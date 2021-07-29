import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

// Components
// import Header from "../Header";
import Header from "../HeaderTfes";

function renderPage(props) {
  const { children } = props;
  return (
    <Scrollbars
      className="rct-scroll"
      autoHide
      autoHideDuration={100}
      style={{ height: "calc(100vh - 100px)" }}
    >
      <div className="rct-page-content">{children}</div>
    </Scrollbars>
  );
}

function HorizontalContainer(props) {
  return (
    <div className="app-horizontal collapsed-sidebar">
      <div className="app-container">
        <div className="rct-page-wrapper">
          <div className="rct-app-content">
            <div className="app-header">
              <Header />
            </div>
            <div className="rct-page">{renderPage(props)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HorizontalContainer;
