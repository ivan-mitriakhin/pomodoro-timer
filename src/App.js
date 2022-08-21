import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';

function BreakLabel(props) {
  return (
    <div className="float-start" id="break-label">
      <h3 className="mt-2">Break Length</h3>
      <div className="controller mt-2">
        <i className="btn bi bi-arrow-down-square-fill" 
           id="break-decrement"
        />
        <span className="length mx-3" id="break-length">{props.length}</span>
        <i className="btn bi bi-arrow-up-square-fill" 
           id="break-increment"
        />
      </div>
    </div>
  );
}

function SessionLabel(props) {
  return (
    <div className="float-end" id="session-label">
      <h3 className="mt-2">Session Length</h3>
      <div className="controller mt-2">
        <i className="btn bi bi-arrow-down-square-fill" 
           id="session-decrement"
        />
        <span className="length mx-3" id="session-length">{props.length}</span>
        <i className="btn bi bi-arrow-up-square-fill" 
           id="session-increment"
        />
      </div>
    </div>
  );
}

function TimerController() {
  return (
    <div id="timer-controller">
      <div id="timer-display">
        {/* Need to implement h3 tag change depending on which label it is */}
        <h3 id="timer-label">Session</h3>
        <h1 id="time-left">00:00</h1>
      </div>
      <div id="buttons">
        <button id="start-stop">
          <i className="bi bi-play-fill"></i>
          <i className="bi bi-pause-fill"></i>
        </button>
        <button className="ms-2" id="reset">
          <i className="bi bi-bootstrap-reboot"></i>
        </button>
      </div>
    </div>
  );
}

function App() {
  let [breakLength, setBreakLength] = React.useState(5);
  let [sessionLength, setSessionLength] = React.useState(25);

  return (
    <div className="app">
      <h1 className="mb-5">Pomodoro Timer</h1>
      <div className="labels">
        <BreakLabel length={breakLength}/>
        <SessionLabel length={sessionLength}/>
      </div>
      <TimerController />
    </div>
  );
}

export default App;
