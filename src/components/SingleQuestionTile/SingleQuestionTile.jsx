import { useState, forwardRef, useImperativeHandle } from 'react'
import classes from './SingleQuestionTile.module.css'

const tileStatusENUM = Object.freeze({
    PRIZE: "prize",
    QUESTION: "question",
    ANSWER: "answer"
});

const SingleQuestionTile = forwardRef(({prize, questionID, question, answer, getCurrentQuestionID}, ref) => {
    const [currentTileStatus, setCurrentTileStatus] = useState(tileStatusENUM.PRIZE);

    useImperativeHandle(ref, () => ({
        showAnswer() {
            if(currentTileStatus === tileStatusENUM.QUESTION){
                setTileStatusToAnswer();
            }
        }
    }));

    function handleClick(currentQuestionID, currentQuestionPrize) {
        getCurrentQuestionID(currentQuestionID, currentQuestionPrize);
        changeTileStatus();
    }
    
    function changeTileStatus(){
        if(currentTileStatus === tileStatusENUM.PRIZE){
            setTileStatusToQuestion();
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
        <div className={`${classes.single_question_tile} ${(currentTileStatus === tileStatusENUM.ANSWER) ? classes.single_question_tile_answered : ''}`} 
                onClick={() => handleClick(questionID, prize)}
                ref={ref}>
            {currentTileStatus === tileStatusENUM.PRIZE  && <span>{prize}</span>}
            {currentTileStatus === tileStatusENUM.QUESTION && <span>{question}</span>}
            {currentTileStatus === tileStatusENUM.ANSWER && <span>{answer}</span>}
        </div>
    );
});

// function SingleQuestionTile({prize, questionID, question, answer, getCurrentQuestionID, showAnswerID}) {
//     const [currentTileStatus, setCurrentTileStatus] = useState(tileStatusENUM.PRIZE);

//     function handleClick(currentQuestionID, currentQuestionPrize) {
//         getCurrentQuestionID(currentQuestionID, currentQuestionPrize);
//         changeTileStatus();
//     }

//     function changeTileStatus(){
//         if(currentTileStatus === tileStatusENUM.PRIZE){
//             setTileStatusToQuestion();
//         }
//         else if(currentTileStatus === tileStatusENUM.QUESTION){
//             setTileStatusToAnswer();
//         }
//         else if(currentTileStatus === tileStatusENUM.ANSWER){
//             setTileStatusToPrize();
//         }
//     }

//     function setTileStatusToPrize() {
//         setCurrentTileStatus(tileStatusENUM.PRIZE);        
//     }

//     function setTileStatusToQuestion() {
//         setCurrentTileStatus(tileStatusENUM.QUESTION);
//     }

//     function setTileStatusToAnswer() {
//         setCurrentTileStatus(tileStatusENUM.ANSWER);        
//     }

//     return (
//         <div className={classes.single_question_tile} onClick={() => handleClick(questionID, prize)}>
//             {currentTileStatus === tileStatusENUM.PRIZE  && <span>{prize}</span>}
//             {currentTileStatus === tileStatusENUM.QUESTION && <span>{question}</span>}
//             {currentTileStatus === tileStatusENUM.ANSWER && <span>{answer}</span>}
//         </div>
//     );
// }

export default SingleQuestionTile;