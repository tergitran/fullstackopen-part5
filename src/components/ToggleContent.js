import { useState } from "react"

const ToggleContent = ({children, label}) => {
  const [display, setDisplay] = useState(true);

  const toggleDisplay = () => {
    setDisplay(!display);
  }
  
  if (display) {
    return (
      <div>
        {children}
        <button onClick={toggleDisplay}>Cancel</button>
      </div>
    )
  }
  return (
    <div>
      <button onClick={toggleDisplay}>{label}</button>
    </div>
  )
}

export default ToggleContent