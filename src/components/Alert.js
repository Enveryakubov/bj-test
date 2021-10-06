import React from 'react'
import { useSelector } from 'react-redux'

const Alert = () => {

    const alert = useSelector(state => state.alert)
  
    return (
        <div className="alert rightSide">
          <p>{alert}</p>  
        </div>
    )
}

export default Alert
