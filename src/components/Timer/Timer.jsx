import { useState, useRef } from 'react';
import classes from './Timer.module.css';

const timerStateENUM = Object.freeze({
    FINISHED: "finished",
    COUNTING: "counting"
});

function Timer() {
    const [timerState, setTimerState] = useState(timerStateENUM.FINISHED);
    const [seconds, setSeconds] = useState("--");
    const [milliseconds, setMilliseconds] = useState("--");

    const timerRef = useRef(null);

    function startTimer(durationInSeconds) {
        if(timerState === timerStateENUM.COUNTING){
            return;
        }
        setTimerState(timerStateENUM.COUNTING);

        const startTime = Date.now();
        const endTime = startTime + durationInSeconds * 1000;
    
        timerRef.current = setInterval(() => {
            const currentTime = Date.now();
            const remainingTime = Math.max(0, endTime - currentTime);
    
            const seconds = Math.floor(remainingTime / 1000);
            const milliseconds = Math.floor((remainingTime % 1000) / 10);
    
            const formattedSeconds = String(seconds).padStart(2, '0');
            const formattedMilliseconds = String(milliseconds).padStart(2, '0');
    
            setSeconds(formattedSeconds);
            setMilliseconds(formattedMilliseconds);

            if (remainingTime <= 0) {
                clearInterval(timerRef.current);
                setTimerState(timerStateENUM.FINISHED);
                console.log("Koniec odliczania!");
            }
        }, 10);
    }

    function stopTimer() {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            setTimerState(timerStateENUM.FINISHED);
        }
    }

    function resetTimerValues() {
        stopTimer();
        setTimerState(timerStateENUM.FINISHED);
        setSeconds("--");
        setMilliseconds("--");
    }

    return(
        <>
            {/* <button onClick={() => startTimer(360)}>Start Timer</button>
            <button onClick={stopTimer}>Stop Timer</button>
            <button onClick={resetTimerValues}>Reset Timer</button> */}
            <div className={classes.timer_container}>
                <span className={classes.timer}>{seconds}:{milliseconds}</span>
            </div>
        </>
    );
}

export default Timer;