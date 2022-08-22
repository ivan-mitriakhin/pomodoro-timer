import React from 'react';
import './App.css';

function BreakLabel(props) {
  return (
    <div className="float-start" id="break-label">
      <h3 className="mt-2">Break Length</h3>
      <div className="controller mt-2">
        <i className="btn bi bi-arrow-down-square-fill" 
           id="break-decrement"
           onClick={props.decrement}
        />
        <span className="length mx-3" id="break-length">{props.length}</span>
        <i className="btn bi bi-arrow-up-square-fill" 
           id="break-increment"
           onClick={props.increment}
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
           onClick={props.decrement}
        />
        <span className="length mx-3" id="session-length">{props.length}</span>
        <i className="btn bi bi-arrow-up-square-fill" 
           id="session-increment"
           onClick={props.increment}
        />
      </div>
    </div>
  );
}

function TimerController(props) {
  let minutes = Math.floor(props.currentTime / 60);
  let seconds = props.currentTime - (Math.floor(props.currentTime / 60) * 60);

  return (
    <div id="timer-controller">
      <div id="timer-display">
        <h3 id="timer-label">{props.session ? 'Session' : 'Break'}</h3>
        <h1 id="time-left">
          {props.currentTime % 60 === 0 ? 
          `${minutes > 9 ? minutes : '0'.concat(minutes)}:00` : 
          `${minutes > 9 ? minutes : '0'.concat(minutes)}:${seconds > 9 || seconds === 0 ? seconds : '0'.concat(seconds)}`}
        </h1>
      </div>
      <div id="buttons">
        <button id="start_stop" onClick={props.startStop}>
          <i className="bi bi-play-fill"></i>
          <i className="bi bi-pause-fill"></i>
        </button>
        <button className="ms-2" id="reset" onClick={props.reset}>
          <i className="bi bi-bootstrap-reboot"></i>
        </button>
      </div>
    </div>
  );
}

function App() {
  let [breakLength, setBreakLength] = React.useState(5);
  let [sessionLength, setSessionLength] = React.useState(25);
  let [isPaused, setIsPaused] = React.useState(true);
  let [isSession, setIsSession] = React.useState(true);
  let [currentTime, setCurrentTime] = React.useState(25 * 60); // currentTime is in seconds.

  let sessionLengthRef = React.useRef(sessionLength);
  let breakLengthRef = React.useRef(breakLength);
  
  /* DECREMENTING THE CURRENTTIME VALUE BY 1 EVERY ONE SECOND 
     IF THE TIMER IS NOT PAUSED */
  React.useEffect(() => {
    let interval = setInterval(() => {
      !isPaused && setCurrentTime(currentTime >= 1 ? currentTime - 1 : 0);
    }, 1000);

    if (currentTime === 0) {
      playSound();
      if (isSession) {
        setIsSession(false);
        setCurrentTime(breakLength * 60);
      } else {
        setIsSession(true);
        setCurrentTime(sessionLength * 60);
      }
    }

    return () => { clearInterval(interval) };
  }, [currentTime, isPaused]);

  /* HANDLING THE CHANGE OF SESSION LENGTH AND BREAK LENGTH */
  const decrementSessionLength = () => {
    if (isPaused && sessionLength > 1) {
      sessionLengthRef.current -= 1;
      setSessionLength(sessionLengthRef.current);
      if (isSession) {
        setCurrentTime(sessionLengthRef.current * 60);
      }
    }
  };

  const incrementSessionLength = () => {
    if (isPaused && sessionLength < 60) {
      sessionLengthRef.current += 1;
      setSessionLength(sessionLengthRef.current);
      if (isSession) {
        setCurrentTime(sessionLengthRef.current * 60);
      }
    }
  };

  const decrementBreakLength = () => {
    if (isPaused && breakLength > 1) {
      breakLengthRef.current -= 1;
      setBreakLength(breakLengthRef.current);
      if (!isSession) {
        setCurrentTime(breakLengthRef.current * 60);
      }
    }
  };

  const incrementBreakLength = () => {
    if (isPaused && breakLength < 60) {
      breakLengthRef.current += 1;
      setBreakLength(breakLengthRef.current);
      if (!isSession) {
        setCurrentTime(breakLengthRef.current * 60);
      }
    }
  };
  
  /* HANDLING STARTSTOP BUTTON WITH ISPAUSED STATE CHANGE*/
  const handleStartStop = () => {
    if (isPaused) {
      setIsPaused(false);
    } else {
      setIsPaused(true);
    }
  };

  /* SETS STATE TO DEFAULT VALUES WHICH ARE BASICALLY THE SAME 
     AS PARAMETERS IN CORRESPONDING USESTATE HOOKS */
  const handleReset = () => {
    stopSound();
    sessionLengthRef.current = 25;
    breakLengthRef.current = 5;
    setSessionLength(sessionLengthRef.current);
    setBreakLength(breakLengthRef.current);
    setIsSession(true);
    setIsPaused(true);
    setCurrentTime(25 * 60);
  }

  /* PLAYS AN AUDIO THAT INDICATES THAT THE TIMER IS UP */
  const playSound = () => {
    const sound = document.getElementById('beep');
    sound.currentTime = 0;
    sound.play();
  }
  /* STOPS AN AUDIO */
  const stopSound = () => {
    const sound = document.getElementById('beep');
    sound.pause();
    sound.currentTime = 0;
  }

  return (
    <div className="app">
      <h1 className="mb-5">Pomodoro Timer</h1>
      <div className="labels">
        <BreakLabel 
          length={breakLength} 
          decrement={decrementBreakLength} 
          increment={incrementBreakLength}
        />
        <SessionLabel 
          length={sessionLength} 
          decrement={decrementSessionLength} 
          increment={incrementSessionLength}
        />
      </div>
      <TimerController
        currentTime={currentTime}
        startStop={handleStartStop}
        reset={handleReset}
        session={isSession}
      />
      <audio 
        id="beep" 
        preload="auto" 
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}


export default App;
