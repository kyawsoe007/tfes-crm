import React, { Component } from "react";
import api from 'Api';
import { connect } from 'react-redux';
import { show } from 'redux-modal';
import { Fragment } from "react";
import { Grid } from '@material-ui/core';
import { red } from "@material-ui/core/colors";
import { Table } from "reactstrap";
import FormInput from "Components/Form/FormInput";

// icon
// npm install --save-dev @iconify/react @iconify-icons/ri
import { Icon, InlineIcon } from '@iconify/react';
import contactsFill from '@iconify-icons/ri/contacts-fill';
import { OutlinedFlag } from "@material-ui/icons";
import { connectModal } from "redux-modal";

class DashboardContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // messageContent:"",

            schedules:[
                // {
                // date:"",
                // time:"",
                // title:"",
                // location:"",   
                // },
                {
                date:"18 Aug 2020",
                time:"1500",
                title:"Sales Meeting",
                location:"TF Office",   
                },
                {
                date:"19 Aug 2020",
                time:"0930",
                title:"Parker Accumulator Training",
                location:"TF Office",   
                },
                {
                date:"20 Aug 2020",
                time:"1500",
                title:"Sales Meeting",
                location:"TF Office",   
                },
                {
                date:"21 Aug 2020",
                time:"0930",
                title:"Staffs meeting",
                location:"TF Office",   
                },
            
            ],
            messages:[
                // {
                // date:"",
                // time:"",
                // title:"",
                // location:"",   
                // }
                {
                    date:"18 Aug 2020",
                    time:"0830",
                    title:"attend Sales Meeting",
                    location:"TF Office",   
                    },
                    {
                    date:"19 Aug 2020",
                    time:"1030",
                    title:"Confirm perchase order with YK",
                    location:"EUP",   
                    },
                    {
                    date:"20 Aug 2020",
                    time:"1300",
                    title:"Please call Mr.Wong -COSL",
                    location:"GLL",   
                    },
                    {
                    date:"22 Aug 2020",
                    time:"1430",
                    title:"Collect S20-231 Fitting from Sia Ho",
                    location:"EUP",   
                    },
            
            ],
            
        }
    }
    
 
    // handleChange =(field, value) => {
    //     this.setState({
    //         [field]: value,
      
    //       })
    //   }

    render() {
        const{messageContent,}=this.state
        
        return (
            <Grid className="dashboardGrid_bottom_container" container spacing={1} >

                <Grid item sm >
                    <h3>Schedule</h3>
                    <div className="leftGrid_container" style={{padding:"0 10px 0 10px" }}>
                        <Table size="sm">
                            <tr>
                                <th style={{ width: "25%" }}><h4>Date</h4></th>
                                <th><h4>Time</h4></th>
                                <th style={{ width: "40%" }}><h4>Title</h4></th>
                                <th><h4>location</h4></th>
                            </tr>
                            <tr style={{ width: "25%" ,height:"15px" }}> </tr>

                          {this.state.schedules.map(items=>{
                              return(
                                    <tr>
                                    <td><h4>{items.date}</h4></td>
                                    <td><h4>{items.time}</h4></td>
                                    <td><h4>{items.title}</h4></td>
                                    <td><h4>{items.location}</h4></td>
                                </tr>
                              )   
                            }) }  
                            {console.log("123")}   

                        </Table>
                    </div>
                </Grid>
                <Grid item sm >
                    <h3>Messages</h3>
                    <div className="middleGrid_container" style={{padding:"0 10px 0 10px" }}>
                        <Table size="sm">
                            <tr >
                                <th style={{ width: "25%" }}><h4>Date</h4></th>
                                <th><h4>Time</h4></th>
                                <th style={{ width: "40%" }}><h4>Title</h4></th>
                                <th><h4>location</h4></th>
                            </tr>
                            <tr style={{ width: "25%" ,height:"15px" }}></tr>
                            {this.state.messages.map(items =>{
                                return(
                                    <tr>
                                    <td><h4>{items.date}</h4></td>
                                    <td><h4>{items.time}</h4></td>
                                    <td><h4>{items.title}</h4></td>
                                    <td><h4>{items.location}</h4></td>
                                    </tr>
                                )
                            })}

                        </Table>

                    </div>
                </Grid>
                <Grid item sm  >
                    <h3>Quick Message</h3>
                    <div className="rightGrid_container">
                        <div className="messageTo" >
                            <FormInput placeholder="To:"
                            style={{
                                display:"inline-block",
                                width:"90%",
                                Outline:"none",
                                margin:"15px auto",
                                paddingRight:10,
                                // opacity:"0.5",
                                marginBottom:"0px"
                            }}>
                            </FormInput> 
                            <Icon icon={contactsFill}  className="contactsIcon" /> 
                            {/* <h4>To:</h4>   */}
                                                
                        </div>
                        <div  className="messageContent">
                        <FormInput placeholder="Type your message here"
                        label=""
                        value={messageContent}
                        target="messageContent"
                        multiline
                        rows={4}
                        // handleChange={this.props.handleChange}
                            style={{
                                display:"inline-block",
                                width:"90%",
                                Outline:"none",
                                margin:"10px auto",
                                paddingRight:10,
                                marginBottom:"10px",
                                verticalAlign:"text-top",
                                wordWrap: "break-word",
                            }}>

                            </FormInput>
                        </div>
                        <button className="sendNow_btn">Send Now</button>
                        
                    </div>
                </Grid>
            </Grid>
        );
    }




}
export default  DashboardContent