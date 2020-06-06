import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none'}
  const hideWhenVisible = { display: visible ? 'none' : ''}

  const toggleVisiblity = () => {
    setVisible(!visible)
  }

  // useImperativeHandle(ref, () => {
  //   return {
  //     toggleVisiblity
  //   }
  // })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisiblity}>{props.buttonLabel}</button>
      </div>
      <div className='togglableContent' style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisiblity}>cancel</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable