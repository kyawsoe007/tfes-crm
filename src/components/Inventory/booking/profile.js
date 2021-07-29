import React, { memo} from 'react';


const Index = memo(({_HandleInputProfile, lastName, firstName, email, phone}) => {

    return (
        <div className="d-flex flex-column">
            
            <div className="d-flex flex-column">
                <div style={{flex: 1, padding: 25}}>
                    <div  className="d-flex flex-row flex-fill">
                        <div className="form-group d-flex flex-column" style={{flex:1, marginRight:25}}>
                            <label>First Name</label>
                            <input type="text" value={firstName} onChange={(e) => _HandleInputProfile('firstName', e.target.value)}  readOnly className="form-control" placeholder="Enter your first name" id="firstName" name="firstName" />
                        </div>
                        <div className="form-group d-flex flex-column" style={{flex:1}}>
                            <label>Last Name</label>
                            <input type="text" value={lastName}  onChange={(e) => _HandleInputProfile('lastName', e.target.value)} readOnly className="form-control" placeholder="Enter your last name" id="lastName" name="lastName" />
                        </div>
                    </div>

                    <div  className="d-flex flex-row flex-fill">
                        <div className="form-group d-flex flex-column" style={{flex:0.3,  marginRight:25}}>
                            <label>Phone</label>
                            <input type="text" value={phone}  onChange={(e) => _HandleInputProfile('phone', e.target.value)} readOnly className="form-control" placeholder="Enter your phone number" id="phone" name="phone" />
                        </div>

                        <div className="form-group d-flex flex-column" style={{flex:0.7}}>
                            <label>Email</label>
                            <input type="text" value={email}  onChange={(e) => _HandleInputProfile('email', e.target.value)} readOnly className="form-control" placeholder="Enter your email" id="email" name="email" />
                        </div>
                    </div>

                </div>
            </div>

            {/* <div className="d-flex flex-column" style={{marginTop: 30, padding: 20, borderRadius:5, boxShadow: '0 5px 9px 0 rgba(0,0,0,0.15), 0 8px 25px 0 rgba(0,0,0,0.15)' }}>
                <span style={{textAlign:'center'}}>PASSWORD CHANGE</span>
                <div className="d-flex flex-row" style={{padding:20}}>
                    <div  className="d-flex flex-row flex-fill">
                        <div className="form-group d-flex flex-column" style={{flex:1, marginRight:25}}>
                            <label>Current Password</label>
                            <input type="text" value={''}  className="form-control" placeholder="Your old password" id="oldPassword" name="oldPassword" />
                        </div>
                        <div className="form-group d-flex flex-column" style={{flex:1, marginRight:25}}>
                            <label>New Password</label>
                            <input type="text" value={''}  className="form-control" placeholder="New password" id="newPassword" name="newPassword" />
                        </div>
                        <div className="form-group d-flex flex-column" style={{flex:1, marginRight:25}}>
                            <label>Re-type New Password</label>
                            <input type="text" value={''}  className="form-control" placeholder="Retype new password" id="retypePassword" name="retypePassword" />
                        </div>
                    </div>

                    <button  className="btn btn-primary">Save Changes</button>
                </div>
            </div> */}


        </div>
    )
    
})
  

export default Index