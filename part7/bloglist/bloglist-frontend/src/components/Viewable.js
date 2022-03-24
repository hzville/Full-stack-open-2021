import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Viewable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hide = { display: visible ? 'none' : '' }
    const show = { display: visible ? '' : 'none' }

    Viewable.propTypes = {
        buttonLabel: PropTypes.string.isRequired,
    }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility,
        }
    })

    return (
        <div>
            <div style={hide}>
                <button onClick={toggleVisibility} className='blog-general-button'>{props.buttonLabel}</button>
            </div>
            <div style={show} className="viewableContent">
                {props.children}
                <button onClick={toggleVisibility} className='blog-general-button'> hide </button>
            </div>
        </div>
    )
})

Viewable.displayName = 'Viewable'

export default Viewable
