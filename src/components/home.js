import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './style.css';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';

import 'moment/locale/it';


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeOrigin = this.onChangeOrigin.bind(this);
        this.onChangeDestination = this.onChangeDestination.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.handleDayChange = this.handleDayChange.bind(this);
        this.state = {
            origin: 'Ha Noi',
            destination: 'Ho Chi Minh',
            date: new Date,
            selectedDay: '',
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
        }, () => console.log(this.state.date))
    }
    onSubmit(e) {
        e.preventDefault();

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
                            <DayPickerInput
                                formatDate={formatDate}
                                parseDate={parseDate}
                                placeholder={`${formatDate(new Date())}`}
                                onDayChange={this.handleDayChange}
                                selectedDay={this.state.selectedDay}
                               
                            />
                        </div>
                    </div>

                    <Link className="btn btn-secondary btn-search" to={"/search?origin=" + this.state.origin + "&destination=" +
                        this.state.destination + "&date=" + this.state.selectedDay}>Search</Link>

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
