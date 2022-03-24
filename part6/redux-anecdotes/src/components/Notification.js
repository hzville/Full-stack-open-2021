import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification

  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: 'block'
  }

  if (notification === null) {
      style = {
        ...style,
        display: 'none'
      }
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    notification: state.notification
  }
}
const ConnectedNotificatons = connect(mapStateToProps)(Notification)
export default ConnectedNotificatons