import React, { Component } from "react";
import { connect } from "react-redux";

//sub components
import FormWrapper from "Components/Form/Layout/FormWrapper";
import UserBlock from "./components/UserBlock";
import UserFeedBlock from "./components/UserFeedBlock";
//icon


// Actions


class UserMaintenanceProfileSetting extends Component{
    constructor(props){
        super(props);
            this.state={
                errorMsg:""
            }
  }

    onSubmit=()=>{

    }
    checkDisabled() {
        return true;
    }
    // handleChange=(field ,value)=>{
    //     this.setState({
    //         [field]:value
    //     })
    // }

   
    render(){
        const {firstName ,lastName ,mobileNumber ,currentPassword,newPassword,confirmNewPassword}=this.state
        const{loggedInUser} =this.props
    
        return(
          <div className="user_profile">
               <div  
                style={{
                  width:"50%",
                  margin:"10px auto",
                  minWidth:"400px",
                  color:"#2b4da0",
                  fontWeight:"bolder",
                  fontSize:"18px",
                  textAlign:"center", 
                }}
               > User Profile Management </div>
              
                <div  
                style={{
                  width:"50%",
                  margin:"20px auto",
                  minWidth:"400px", 
                }}
                >
              <UserFeedBlock/>
                </div>
          </div>
           
        )
            
        
    }

}
const mapStateToProps=({userState})=>{
  // const {authState} = sessionState;
  // const{ loggedInUser} =authState;
  // return {loggedInUser};
  return userState;

}

export default connect(mapStateToProps) (UserMaintenanceProfileSetting);
