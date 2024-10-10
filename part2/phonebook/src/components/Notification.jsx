import React from 'react'

const Notification = ({ message,status }) => {
	if (message === null) {
		return
	}

	return <div className={status === 'error' ? 'error' : 'success'}>{message}</div>
}

export default Notification
