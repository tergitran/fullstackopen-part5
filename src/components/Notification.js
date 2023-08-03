import { useEffect, useState } from "react";

const Notification = ({message, type, time}) => {
  let [display, setDisplay] = useState(false);

  //TODO: check case same toast
  useEffect(() => {
    if (message) {
      setDisplay(true)
      setTimeout(() => {
        setDisplay(false)
      }, time || 5000);
    }
  }, [message, type, time])

  const color = type === 'error' ? 'red' : 'green';
  const style = {
    color,
    border: `2px solid ${color}`
  }
  return display ? (
    <div style={style}>
      {message}
    </div>  
  ) : null
}

export default Notification