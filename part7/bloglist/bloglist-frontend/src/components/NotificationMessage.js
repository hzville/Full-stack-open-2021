import React from 'react'
import { useSelector } from 'react-redux'

const NotificationMessage = () => {
    const notification = useSelector(state => state.notification)
    if (notification === null) {
        return null
    }
    switch (notification.type){
        case null:
            return null
        case 'success':
            return <div className="successful">{notification.message}</div>
        case 'error':
            return <div className="error">{notification.message}</div>
        default:
            return null
    }
}

export default NotificationMessage
