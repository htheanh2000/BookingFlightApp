import React, { Component } from 'react';
import Data from '../data.json';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './style.css';
import { Link, useLocation } from 'react-router-dom';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { months } from 'moment';



export default class Home extends Component {
    constructor(props) {
        super(props);

        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeOrigin = this.onChangeOrigin.bind(this);
        this.onChangeDestination = this.onChangeDestination.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.state = {
            origin: 'Ha Noi',
            destination: 'Ho Chi Minh',
            date: new Date,
            selectedDay: String,
        }
    }

    onChangeOrigin(e) {
        this.setState({
            origin: e.target.value
        })
    }
    onChangeDestination(e) {
        this.setState({
            destination: e.target.value
        })
    }

    onChangeDate(day) {
        this.setState({
            date: day.toLocaleDateString(),
        },() => console.log(this.state.date))
    }
    onSubmit(e) {
        e.preventDefault();

    }
    handleDayClick(day, { selected }) {
        let d , m;
        if(parseInt(day.getDate()) < 10){
            d = "0" + day.getDate()
        }
        else(
            d = day.getDate()
        )

        if(parseInt(day.getMonth()+1) < 10){
            m = "0" + (day.getMonth()+1)
        }
        else(
            m = day.getMonth()
        )

        let date= day.getFullYear() + "-"+ m +"-"+ d;

        this.setState({
            selectedDay: date,
        },()=> {console.log(this.state.selectedDay)});
       
        
    }
    render() {
        return (
            <div>
               
                <form className="home-form">
                    <div className="form-group">

                        <label className="label-form">Departure: </label>
                        <Autocomplete

                            onSelect={this.onChangeOrigin}
                            id="Origin"
                            options={OriginList}
                            getOptionLabel={(option) => option.diadiem}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Origin" variant="outlined" />}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label-form">Arrival: </label>
                        <Autocomplete
                            onSelect={this.onChangeDestination}
                            id="Destination"
                            options={OriginList}
                            getOptionLabel={(option) => option.diadiem}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Destination" variant="outlined" />}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label-form">Date: </label>
                        <div>
                        <DayPicker
            
                         onDayClick={this.handleDayClick}/>;
                        </div>
                    </div>
                    {/* <button className="btn btn-secondary btn-search"> */}
                        <Link className="btn btn-secondary btn-search" to={"/search?origin=" + this.state.origin + "&destination=" +
                            this.state.destination + "&date=" + this.state.selectedDay }>Search</Link>
                {/* </button> */}
                </form>

            </div>
        )
    }
}

const OriginList = [
    { diadiem: 'Ha Noi' },
    { diadiem: 'Ho Chi Minh' },
    { diadiem: 'Da Nang' },
    { diadiem: 'Hue' },
    { diadiem: 'Buon Ma Thuot' },

]