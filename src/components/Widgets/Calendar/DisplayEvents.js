import React, { Component } from "react";
import Moment from "moment";
import BgCard from "Components/BgCard";

export default class DisplayEvent extends Component {
  render() {
    const { myEvents } = this.props;

    let EventList = null;

    if (myEvents.length > 0) {
      EventList = myEvents.map((item, index) => {
        const Color = ["#FFA088", "#32C2FF", "#FF4B46", "#48BB76"];

        return (
          <BgCard key={index}>
            {/* <span>{Moment(item.end).format("ddd, D MMM HH.mm")}</span>
            <span>{Moment(item.start).format("ddd, D MMM h.mm a")}</span>
            <span>{Moment(item.end).format("ddd, D MMM h.mm a")}</span>
            <span>
              {Moment(item.start).format("ddd, D MMM HH.mm")} -{" "}
              {Moment(item.end).format("HH.mm")}
            </span>{" "} */}
            <div
              style={{
                height: 20,
                minWidth: 20,
                marginTop: 5,
                backgroundColor: Color[index] ? Color[index] : "#F5F5F5",
                borderRadius: 10
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 21,
                width: "100%"
              }}
            >
              <span style={{ fontSize: 16, fontWeight: "500" }}>
                {item.title}
              </span>

              {/* ending timing */}
              {/* started ago */}
              {/* <span>{Moment(item.start).fromNow()}</span> */}
              <span style={{ marginTop: 8 }}>{item.desc}</span>

              <span
                style={{
                  height: 1.5,
                  width: "100%",
                  backgroundColor: "rgba(0,0,0,0.03)",
                  marginTop: 10
                }}
              />

              <div
                style={{
                  display: "flex",
                  direction: "row",
                  flexWrap: "wrap",
                  marginTop: 10
                }}
              >
                {/* <span style={{marginTop: 8, fontSize: 16}}>{Moment(item.start).format('Do, MMM h.mm a')}  -  {Moment(item.end).format('Do, MMM h.mm a')}</span> */}
                <span
                  style={{
                    marginTop: 0,
                    fontSize: 12,
                    marginRight: 10,
                    color: "rgba(0,0,0,0.5)"
                  }}
                >
                  {Moment(item.start).format("h.mm a")} -{" "}
                  {Moment(item.end).format("h.mm a")}
                </span>

                <div
                  style={{
                    marginTop: 0,
                    display: "flex",
                    justifyContent: "flex-start",
                    flexWrap: "wrap"
                  }}
                >
                  {new Date() > new Date(item.start) && (
                    <span
                      style={{
                        marginRight: 5,
                        fontSize: 12,
                        color: "rgba(0,0,0,0.5)"
                      }}
                    >
                      Started {Moment(item.start).fromNow()}
                    </span>
                  )}
                  {new Date() < new Date(item.start) && (
                    <span
                      style={{
                        marginRight: 5,
                        fontSize: 12,
                        color: "rgba(0,0,0,0.5)"
                      }}
                    >
                      Starting {Moment(item.start).fromNow()}
                    </span>
                  )}

                  <span
                    style={{
                      marginRight: 5,
                      fontSize: 12,
                      color: "rgba(0,0,0,0.5)"
                    }}
                  >
                    |
                  </span>
                  {/* {new Date() > new Date(item.end) &&
                                        <span style={{marginRight: 15}}>Ended {Moment(item.end).fromNow()}</span>
                                    } */}
                  {new Date() < new Date(item.end) && (
                    <span
                      style={{
                        marginRight: 5,
                        fontSize: 12,
                        color: "rgba(0,0,0,0.5)"
                      }}
                    >
                      Ending {Moment(item.end).fromNow()}
                    </span>
                  )}
                  {/* <span style={{}}>Ending {Moment(item.end).fromNow()}</span> */}
                </div>
              </div>
            </div>
          </BgCard>
        );
      });
    } else {
      EventList = (
        <BgCard customClasses="text-center">
          <span style={{ fontSize: 16, fontWeight: "500" }}>
            No upcoming events
          </span>
        </BgCard>
      );
    }

    return (
      <div>
        <div
          style={{
            marginBottom: 20,
            marginTop: 25,
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <span style={{ fontSize: 16, fontWeight: "500", marginRight: 20 }}>
            UPCOMING EVENTS
          </span>
          {/* <span>till {Moment(Moment(new Date()).add(7, 'day')).format('dddd')}</span> */}
          {/* <span style={{fontSize: 18}}>{Moment(new Date()).format('D')} - {Moment(Moment(new Date()).add(7, 'day')).format('D')} {Moment(Moment(new Date()).add(7, 'day')).format('MMMM')}</span> */}
        </div>

        <div style={{}}>{EventList}</div>
      </div>
    );
  }
}

const styles = {
  Card: {}
};
