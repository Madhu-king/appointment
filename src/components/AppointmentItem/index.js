// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {eachappointment, updatestarcolor} = props
  const {title, date, id, star} = eachappointment
  const starresult = star
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const clickstar = () => {
    updatestarcolor(id)
  }
  return (
    <li className="each-list">
      <div className="each-item">
        <div className="text-container">
          <p>{title}</p>
          <p>{date}</p>
        </div>
        <button type="button" className="btn-new" data-testid="star">
          <img
            src={starresult}
            alt="star"
            className="star-size"
            onClick={clickstar}
          />
        </button>
      </div>
    </li>
  )
}

export default AppointmentItem
