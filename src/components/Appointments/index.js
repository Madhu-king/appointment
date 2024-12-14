// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    activestar: false,
  }

  onchangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onchangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  newappointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const dateformat = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newitem = {
      id: v4(),
      title: titleInput,
      date: dateformat,
      star: false,
    }

    this.setState(prevstate => ({
      appointmentsList: [...prevstate.appointmentsList, newitem],
      titleInput: '',
      dateInput: '',
    }))
  }

  updatestarcolor = id => {
    
    const result = this.setState(prevstate => ({
      appointmentsList: prevstate.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, star: !each.star}
        }
        return each
      }),
    }))
  }

  isActivestar = () => {
    const {activestar} = this.state
    this.setState({activestar: !activestar})
  }

  getfilteredstar = () => {
    const {appointmentsList, activestar} = this.state
    if (activestar) {
      return appointmentsList.filter(each => each.star === true)
    }
    return appointmentsList;
  }

  render() {
    const {titleInput, dateInput, } = this.state

    const getfilteredstar = this.getfilteredstar();
    return (
      <div className="bg-container">
        <div className="white-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="align-header-section">
            <form className="form-container" onSubmit={this.newappointment}>
              <div className="title-container">
                <label htmlFor="title" className="label-title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="title-input"
                  placeholder="Title"
                  onChange={this.onchangeTitle}
                  value={titleInput}
                />
              </div>
              <div className="date-container">
                <label htmlFor="date" className="label-title">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="title-input"
                  onChange={this.onchangeDate}
                  value={dateInput}
                />
              </div>
              <button className="btn" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              className="img-size"
              alt="appointments"
            />
          </div>
          <hr className="hr-line" />
          <div className="Appointments-head">
            <h1 className="head">Appointments</h1>
            <button
              className="btn-star"
              type="button"
              onClick={this.isActivestar}
            >
              Starred
            </button>
          </div>
          <ul className="unorder-container">
            {getfilteredstar.map(each => (
              <AppointmentItem
                key={each.id}
                eachappointment={each}
                updatestarcolor={this.updatestarcolor}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
