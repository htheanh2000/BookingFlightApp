import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import axios from 'axios'
import queryString from 'query-string'
import "react-datepicker/dist/react-datepicker.css";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';

import 'moment/locale/it';

export default class Booking extends Component {
    constructor(props) {
        super(props);
        
        this.handleDayChange = this.handleDayChange.bind(this)
        this.onClick = this.onClick.bind(this)
        this.onChangeCMND = this.onChangeCMND.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePhoneNum = this.onChangePhoneNum.bind(this)
        this.onChangeName = this.onChangeName.bind(this)


        this.state = {
            ticket: {},
            selectedDay: '',
            CMND: '123',
            Name: '',
            phoneNum: '',
            email: '',
            
        }
    }
    componentDidMount() {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        axios.get('http://localhost:5000/flights/' + params.id)
            .then(res => this.setState(
                this.state.ticket = res.data,
                //console.log(res.data)
            ))
           

            setTimeout(
                function() {
                    if(this.state.ticket.slot === undefined)
            {
                this.setState(prevState => ({
                    ticket :{ ...prevState.ticket , slot: 0 }
                  }))
                //  console.log(this.state.ticket, "here")
            }
                }
                .bind(this),300
                
            );
            
       
    }
    handleDayChange(selectedDay, modifiers, dayPickerInput) {
        const input = dayPickerInput.getInput();
        this.setState({
            selectedDay,
            isEmpty: !input.value.trim(),
            isValidDay: typeof selectedDay !== 'undefined',
            isDisabled: modifiers.disabled === true,
        });

        let day = selectedDay;
        let d, m;
        if(day === undefined ){}
        else {
            if (parseInt(day.getDate()) < 10) {
                d = "0" + day.getDate()
            }
            else (
                d = day.getDate()
            )
    
            if (parseInt(day.getMonth() + 1) < 10) {
                m = "0" + (day.getMonth() + 1)
            }
            else (
                m = day.getMonth() + 1
            )
    
            let date = day.getFullYear() + "-" + m + "-" + d;
    
            this.setState({
                selectedDay: date,
            }, () => { console.log(this.state.selectedDay) });
        }
    }

    onChangeCMND(e){
        this.setState({
            CMND : e.target.value
        })
    }
    onChangeName(e){
        this.setState({
            Name : e.target.value
        })
    }
    onChangePhoneNum(e){
        this.setState({
            phoneNum : e.target.value
        })
    }
    onChangeEmail(e){
        this.setState({
            email : e.target.value
        })
    }
    onClick(e) {
        e.preventDefault();
        //Create User
        const user = {
            userID : this.state.CMND,
            userName: this.state.Name,
            userPhoneNum: this.state.phoneNum,
            userBday : this.state.selectedDay,
            userEmail: this.state.email
        }
        axios.post('http://localhost:5000/users/add', user)
        .then(res => 
            console.log(res)
        )

        // Create Detail
        const details = {
            detailID :  this.state.selectedDay.replace('-','').replace('-','') + this.state.ticket.slot + this.state.ticket.airfares,
           billID :this.state.selectedDay.replace('-','').replace('-','') + this.state.ticket.slot + this.state.ticket.airfares,
            billCost : this.state.ticket.airfares,
            num : 1,
            flightID: this.state.ticket.flightID, 
        }
        // console.log(details)
        
        axios.post('http://localhost:5000/details/add',details)
        .then(res => 
            console.log(res)
        )

        // Create Bill
        const bill = {
            billID: this.state.selectedDay.replace('-','').replace('-','') + this.state.ticket.slot + this.state.ticket.airfares,
            userID: this.state.CMND,
            billCost: details.billCost,
            dPurchase: new Date()
        }
        console.log(bill)
        axios.post('http://localhost:5000/bills/add',bill)
        .then(res => 
            console.log(res)
        )
        const updateSlot = {
            slot : Number(this.state.ticket.slot + 1)
        }
        console.log(updateSlot)
        axios.post('http://localhost:5000/flights/update/' + this.state.ticket._id, updateSlot)
        .then(res => console.log(res))
    }
    render() {
        return (


            <div className="flex-row">
                
                <form className="ticket-information">
                    <h1>Thông tin chuyến bay</h1>
                    <h5>Tên chuyến bay:</h5>
                    <h5>{this.state.ticket.flightName}</h5>
                    <h5>Ngày bay: </h5>
                    <h5>{this.state.ticket.departureDate}</h5>
                    <h5>Nơi đi:</h5>
                    <h5>{this.state.ticket.departureLocation}</h5>
                    <h5>Nơi đến</h5>
                    <h5>{this.state.ticket.arrivalLocation}</h5>
                    <h5>Thời gian bay:</h5>
                    <h5>{this.state.ticket.flightTime}min</h5>
                    <h2>Giá tiền</h2>
                    <h2><strong>{this.state.ticket.airfares} 000 VND</strong></h2>
                    <h5>Đây là thông tin mô phỏng, chưa hoàn thiện giao diện !</h5>

                </form>
                <form className="form-booking">
                    <h1>Điền thông tin khách hàng</h1>
                    <label className="label-form">CMND:</label>
                    <input className="form-control" placeholder="CMND:" onChange={this.onChangeCMND}></input>

                    <label className="label-form">Họ Tên: (Vd: Nguyen)</label>
                    <input className="form-control" placeholder="Nhập tên" onChange={this.onChangeName}></input>

                    <label className="label-form">Số điện thoại:</label>
                    <input className="form-control" placeholder="Nhập số điện thoại" onChange={this.onChangePhoneNum}></input>

                    <label className="label-form">Email:</label>
                    <input className="form-control" placeholder="Email:" onChange={this.onChangeEmail}></input>

                    <div className="form-group">
                        <label className="label-form">Birdthday: </label>
                    </div>
                        
                   
                    <div>
                            <DayPickerInput
                                formatDate={formatDate}
                                parseDate={parseDate}
                                placeholder={`${formatDate(new Date())}`}
                                onDayChange={this.handleDayChange}
                                selectedDay={this.state.selectedDay}
                            />
                        </div>  
                        <button className="btn" onClick={this.onClick}>Xác nhận</button>
                </form>
                
            </div>

        )
    }
}

