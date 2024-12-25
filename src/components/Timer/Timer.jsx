import { useState, useRef } from 'react';
import classes from './Timer.module.css';



function Timer({ seconds, milliseconds }) {
    return(
        <>
            <div className={classes.timer_container}>
                <span className={classes.timer}>{seconds}:{milliseconds}</span>
            </div>
        </>
    );
}

export default Timer;