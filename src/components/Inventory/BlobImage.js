import React from "react";
import { PropTypes } from "prop-types";
import { Close } from "@material-ui/icons";

const Index = ({ imageSource, removeNewImages, url, remove }) => {
  if (url) {
    return (
      <div className="d-flex flex-row" style={{ flexWrap: "wrap" }}>
        {imageSource.map((e, index) => {
          return (
            <div
              key={index}
              className="d-flex"
              style={{
                justifyContent: "center",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.05)",
                borderRadius: 20,
                width: 100,
                height: 100,
                position: "relative",
                marginRight: 10
              }}
            >
              <img
                src={e.path}
                style={{
                  objectFit: "cover",
                  borderRadius: 20,
                  maxWidth: "100%",
                  padding: 5
                }}
              />
              <div style={{ position: "absolute", top: 0, right: 0 }}>
                <Close
                  style={{ color: "rgba(235,57,59,1)" }}
                  onClick={() => removeNewImages(index)}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="d-flex flex-row" style={{ flexWrap: "wrap" }}>
        {imageSource.map((e, index) => {
          return (
            <div
              key={index}
              className="d-flex"
              style={{
                justifyContent: "center",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.05)",
                borderRadius: 20,
                width: 100,
                height: 100,
                position: "relative",
                marginRight: 10
              }}
            >
              <img
                src={e}
                style={{
                  objectFit: "cover",
                  borderRadius: 20,
                  maxWidth: "100%",
                  padding: 5
                }}
              />

              {remove && (
                <div style={{ position: "absolute", top: 0, right: 0 }}>
                  <Close
                    style={{ color: "rgba(235,57,59,1)" }}
                    onClick={() => removeNewImages(index)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
};

Index.propTypes = {
  imageSource: PropTypes.array.isRequired,
  removeNewImages: PropTypes.func.isRequired,
  url: PropTypes.bool.isRequired,
  remove: PropTypes.bool
};

export default Index;
