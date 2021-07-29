import React, { Component } from "react";
// import { connect } from 'react-redux'

//sub components
import DialogRoot from 'Components/Dialog/DialogRoot'
import FormInput from "Components/Form/FormInput";
//icon
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
// Actions


class SendEmail extends Component{
    constructor(props){
        super(props);
            this.state={
              sender:"",
              recipients:"",
              addccPerson:"",
              subject:"",
              content:"",
              toggle: false,
              errorMsg:"",
            }
        // this.handleChange = this.handleChange.bind(this);
    }
    saveBtn = () => {
      let  sender = this.state.sender
      let  recipients = this.state.recipients
      if (sender) {
        if (recipients) {
          // this.setState({
          //   toggle:false
          // })
          this.props.saveToggle();
          
        } else {
            this.setState({
                errorMsg: 'Error : Recipients can not be blank! ',
            })
            console.log("Error : Recipients can not be blank!")
        }
    } else {
        this.setState({
            errorMsg: 'Error : Sender can not be blank!',
        })
        console.log("+Error : Sender can not be blank!")
    }
 
    }
    restartToggle = () => {
      this.setState({
            toggle: false,
       })
    }

    handleChange = (field,value)=>{
      this.setState({
        [field]: value ,

      })
    }
    
    render(){
      const{sender,recipients,addccPerson,subject,content}=this.state
      return(
          <React.Fragment>        
            <form autoComplete="off">
            {this.state.errorMsg && (<h4 class="text-danger text-center">{this.state.errorMsg}</h4>)}
            <div class="row">
              <div class="col-sm-1"></div>
              <div class="col-sm-10"><h2 style={{
                margin:"20px auto" , color:"#254065 ",letterSpacing:"2px"
              }}>Send Email</h2></div>
              <div class="col-sm-1"><button
                        onClick={this.saveBtn}
                        type="button"
                        style={{
                          
                            width: 64,
                            height: 36,
                            color: "white",
                            border: 0,
                            cursor: "pointer",
                            display: "inline-flex",
                            outline: 0,
                            padding: 0,
                            position: "relative",
                            alignItems: "center",
                            borderRadius: 4,
                            verticalAlign: "middle",
                            justifyContent: "center",
                            backgroundColor: "#DF0021",
                            float: "right"
                        }}>
                        Send
                    </button></div>
            </div>
            <div class="row">
              <div class="col-sm-2"><h3>Sender</h3></div>
              <div class="col-sm-5"> <FormInput value={sender} target="sender" handleChange={this.handleChange}  selectValues={[
                          { name: 'sender1', value: '123@123.com' },
                          { name: 'sender2', value: '456@123.com' },
                          { name: 'sender3', value: '789@123.com' },
                        ]
                        }/></div>
              <div class="col-sm-6"></div>
            </div>
            <div class="row">
              <div class="col-sm-2"><h3>Recipients</h3></div>
              <div class="col-sm-10"> <FormInput value={recipients} target="recipients" handleChange={this.handleChange}/></div>
            </div>
            <div class="row">
              <div class="col-sm-2"><h3>CC</h3></div>
              <div class="col-sm-10"> <FormInput value={addccPerson} target="addccPerson" handleChange={this.handleChange}/></div>
            </div>          
            <div class="row">
              <div class="col-sm-2"><h3>Subject</h3></div>
              <div class="col-sm-10"> <FormInput value={subject} target="subject" handleChange={this.handleChange}/></div>
            </div>
            <div className="row "   style={{margin:"0 2px"}}> <FormInput
                        value={content}
                        target="content"
                        multiline
                        // rows={4}
                        handleChange={this.handleChange}
                      />
            </div>
            </form>
            <DialogRoot
                    show={this.state.toggle}
                    handleHide={this.restartToggle}
                    size={'lg'}
                >
                    <SendEmail
                            getInfo={this.getInfoSendEmail}
                           
                          />
                </DialogRoot>
     
        
          
  </React.Fragment>
       
        )
            
        
    }

}

export default SendEmail;