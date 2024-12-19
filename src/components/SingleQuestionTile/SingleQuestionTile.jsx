import { useState } from 'react'
import classes from './SingleQuestionTile.module.css'

const tileStatusENUM = Object.freeze({
    PRIZE: "prize",
    QUESTION: "question",
    ANSWER: "answer"
});

function SingleQuestionTile({prize, question, answer}) {
    const [currentTileStatus, setCurrentTileStatus] = useState(tileStatusENUM.PRIZE);

    function changeTileStatus(){
        if(currentTileStatus === tileStatusENUM.PRIZE){
            setTileStatusToQuestion();
        }
        else if(currentTileStatus === tileStatusENUM.QUESTION){
            setTileStatusToAnswer();
        }
        else if(currentTileStatus === tileStatusENUM.ANSWER){
            setTileStatusToPrize();
        }
    }

    function setTileStatusToPrize() {
        setCurrentTileStatus(tileStatusENUM.PRIZE);        
    }

    function setTileStatusToQuestion() {
        setCurrentTileStatus(tileStatusENUM.QUESTION);
    }

    function setTileStatusToAnswer() {
        setCurrentTileStatus(tileStatusENUM.ANSWER);        
    }

    return (
        <div className={classes.single_question_tile} onClick={changeTileStatus}>
            {currentTileStatus === tileStatusENUM.PRIZE  && <span>{prize}</span>}
            {currentTileStatus === tileStatusENUM.QUESTION && <span>{question}</span>}
            {currentTileStatus === tileStatusENUM.ANSWER && <span>{answer}</span>}
        </div>
    );
}

export default SingleQuestionTile;