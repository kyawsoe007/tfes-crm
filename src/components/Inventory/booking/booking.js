import React, { memo } from 'react';
import DayPicker from "react-day-picker";

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const ServiceOption = ["Maintenance", "Test Drive", "Rental"]

const Index = memo(({_HandleDayChange,_HandleInputForm, model, timeslot, description, currentDate, Timeslot, _setItemTimeSlot, date, service, _setItemService}) => {

    return (
        <div className="d-flex flex-column">

            <div className="d-flex flex-column flex-fill">
                <div className="d-flex flex-row">
                    <div style={{flex: 1, padding: 25}}>
                        <div  className="d-flex flex-row flex-fill">
                            <div className="form-group d-flex flex-column" style={{flex:0.5, marginRight:25}}>
                                <label>Your Car Model</label>
                                <input type="text" value={model} onChange={(e) => _HandleInputForm('model', e.target.value)}  className="form-control" placeholder="Enter your car model" id="model" name="model" />
                            </div>

                            <div className="form-group d-flex flex-column" style={{flex:0.5}}>
                                <label>Book Service Type</label>

                                <FormControl>
                                    <Select 
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={service ? service : ''}
                                        onChange={_setItemService}
                                        style={{minWidth: 100, marginLeft: 5}}
                                    >
                                    
                                        {ServiceOption.map((e, index) => {
                                            return <MenuItem key={index} value={e}>{e}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </div>

                        </div>

                        <div  className="d-flex flex-row flex-fill">
                            <div className="form-group d-flex flex-column" style={{flex:0.5,  marginRight:25}}>
                                <label>Date</label>
                                <input type="text" value={currentDate} onChange={() => console.log('Date!')} className="form-control" placeholder="Pick your date" id="date" name="date" />
                            </div>

                            <div className="form-group d-flex flex-column" style={{flex:0.5}}>
                                <label>Timeslot</label>
                                {/* <input type="text" value={timeslot} onChange={() => console.log('Timeslot!')} className="form-control" placeholder="Select your time" id="timeslot" name="timeslot" /> */}

                                <FormControl>
                                    <Select 
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={timeslot ? timeslot : ''}
                                        onChange={_setItemTimeSlot}
                                        style={{minWidth: 100, marginLeft: 5}}
                                    >
                                    
                                        {Timeslot.map((e, index) => {
                                            return <MenuItem key={index} value={e}>{e}</MenuItem>
                                        })}
                                    
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        <div  className="d-flex flex-row flex-fill">
                            <div className="form-group d-flex flex-column" style={{flex:1}}>
                                <label>Description</label>
                                <input type="text" value={description}  onChange={(e) => _HandleInputForm('description', e.target.value)} className="form-control" placeholder="What would you like us to service for you?" id="description" name="description" />
                            </div>
                        </div>
                       
                    </div>

                    <DayPicker          
                        selectedDays={[date]}   
                        onDayClick={_HandleDayChange} 
                        style={{width: "50%",}}
                        month={new Date()}
                        disabledDays={[
                            {
                              after: new Date(new Date().setMonth(new Date().getMonth()+1)),
                              before: new Date(),
                            },
                        ]}
                    />

                </div>
            </div>

        </div>
        
    )

})
  
export default Index





// const [cookies, setCookie] = useCookies(['name']);
// setCookie('name', 'COOKIES!', { path: '/' });
// console.log(cookies)
// return (
//     <div className="d-flex justify-content-center align-items-center" style={{flex:1}}>
//         Maintenance booking system!
//         {cookies.name && <h1>Hello {cookies.name}!</h1>}
//     </div>
// );