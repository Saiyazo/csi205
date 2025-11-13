import { useEffect, useState } from "react"

const Timer = () => {
  const [running, setRunning] = useState(false)
  const [second, setSecond] = useState(0)

  useEffect(() => {
    let interval = null
    if (running) {
      interval = setInterval(() => {
        setSecond(second + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [running, second])

  const runClicked = () => {
    setRunning(!running)
  }

  const resetClicked = () => {
    setRunning(false)
    setSecond(0)
  }

  const convertToString = (sec) => {
    const MINUTE_SECOND = 60
    const HOUR_SECOND = 60 * MINUTE_SECOND
    const DAY_SECOND = 24 * HOUR_SECOND

    const day = Math.floor(sec / DAY_SECOND)
    const hour = Math.floor((sec % DAY_SECOND) / HOUR_SECOND)
    const minute = Math.floor((sec % HOUR_SECOND) / MINUTE_SECOND)
    const second = sec % MINUTE_SECOND

    if (day > 0) {
      return `${day}d ${hour}h ${minute}m ${second}s`
    } else if (hour > 0) {
      return `${hour}h ${minute}m ${second}s`
    } else if (minute > 0) {
      return `${minute}m ${second}s`
    } else {
      return `${second}s`
    }
  }

  return (
    <div
      className="border border-black border-2 mx-auto rounded-3 p-2 bg-secondary-subtle mt-3"
      style={{ width: "fit-content" }}
    >
      <h1 className="text-primary text-center">TIMER</h1>
      <input
        className="text-end fs-5 fw-bold border border-black border-2 rounded-2"
        value={convertToString(second)}
        readOnly
      ></input>
      <div className="d-flex justify-content-evenly align-items-center mt-2">
        <button className="btn btn-lg btn-danger" onClick={resetClicked}>
          <i className="bi bi-arrow-counterclockwise"></i>&nbsp;Reset
        </button>
        <button
          className={"btn btn-lg " + (running ? "btn-warning" : "btn-success")}
          onClick={runClicked}
        >
          <i className={running ? "bi bi-pause" : "bi bi-play"}></i>
          {running ? " Pause" : " Run"}
        </button>
      </div>
    </div>
  )
}

export default Timer