import React, { Component, useState, useEffect } from 'react';
import UserProfile from 'Components/Inventory/booking/profile'
import BookingForm from 'Components/Inventory/booking/booking'
import Moment from 'moment'

import { NotificationManager } from "react-notifications";
import api from 'Api'

let InitBookService = {
    model: '',
    date: new Date, // schedule date
    timeslot: '', // AM/PM
    description: '',
}

let InitUserProfile = {
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
}


const index = ({customer, _handleComplete}) => {
 
  
    // BOOKING    
    const [Timeslot] = useState(["AM","PM"]);
    const [Profile, setUserProfile] = useState({...InitUserProfile, ...customer.baseContact});
    const [currentDate, setDate] = useState(Moment(new Date).format('LL'));
    const [BookService, setBookService] = useState(InitBookService);
    const [Service, setService] = useState('');


    const _HandleInputProfile = (element, e) => {
        setUserProfile(Profile => ({ ...Profile, [element]: e }));
    };
    
    const _HandleDayChange = (date) => {
        setDate(() => Moment(date).format('LL'))
        setBookService(BookService => ({ ...BookService, date: date }));
    }

    const _HandleInputForm = (element, e) => {
        setBookService(BookService => ({ ...BookService, [element]: e }));
    };

    const _setItemTimeSlot = (e) => {
        setBookService(BookService => ({ ...BookService, timeslot: e.target.value }));
    }

    const _setItemService = (e) => {
        setService(() => (e.target.value));
    } 


    const onSubmit = async() =>{
        
        const newBooking = {
            service: Service,
            status: 'Awaiting',
            contact: Profile,
            content: BookService,
        }
        const result = await api.post(`/bookings/createBooking`, {data: newBooking});

        switch(result.data.success){
            case 0:
                // this.setState({error: true})
                NotificationManager.error('Unable to make booking request! Please check your fields or try again later');
                break
            case 1:
                // this.props._FetchProfile()
                NotificationManager.success('Booking created successfully');
                _handleComplete()
                break
            default:
                break
        }
       
    }

    const RenderBookingForm = () => {

        const {lastName, firstName, email, phone} = Profile
        const {model, date, timeslot, description} = BookService

        return (
            <div>
                <UserProfile
                    _HandleInputProfile={_HandleInputProfile}
                    lastName={lastName}
                    firstName={firstName}
                    email={email}
                    phone={phone}
                />

                <BookingForm
                    _HandleDayChange={_HandleDayChange}
                    _HandleInputForm={_HandleInputForm}
                    _setItemTimeSlot={_setItemTimeSlot}
                    _setItemService={_setItemService}
                    Timeslot={Timeslot}
                    currentDate={currentDate}
                    model={model}
                    timeslot={timeslot}
                    description={description}
                    date={date}
                    service={Service}
                />
                
                <div className="d-flex justify-content-end">
                    <button onClick={onSubmit} style={{width: 250, padding: 10, margin:20, borderRadius: 10,}} className="btn-primary">BOOK APPOINTMENT</button>
                </div>
            </div>
        )
    }


   

    return (
        <div className="todo-dashboard">
            {RenderBookingForm()}
        </div>
    );

}

export default index;






