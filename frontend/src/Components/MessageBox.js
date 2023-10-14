import React from 'react'

export default function MessageBox(props) {
    const {message,variant}=props;
  return (
    <div className={variant}>
        {message}
        {props.children}
    </div>
  )
}
