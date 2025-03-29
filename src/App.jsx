import { useEffect, useState, useRef } from 'react';
import './App.css';
import JeopardyQuestionsBoard from '@components/JeopardyQuestionsBoard/JeopardyQuestionsBoard';
import JeopardyScoreboard from '@components/JeopardyScoreboard/JeopardyScoreboard';
import Timer from '@components/Timer/Timer';
import ControlPanel from '@components/ControlPanel/ControlPanel';
import {buttonsToShowENUM, currentActionsInfoENUM, hostDecisionStateENUM, timerStateENUM} from "@enums";

const gameSettings = {
    numberOfCategories: 5,          // number of columns in Jeopardy grid
    numberOfRowsInCategory: 5,      // number of rows in Jeopardy grid
    categoryStartingMoney: 100,     // amount of money that the tile prizes start from
    categoryMoneyIncreasesBy: 100,  // amount of money that each row of tiles increases by
    timeToAnswer: 70,               // amount of time to answer the question (in seconds)
    playersCount: 3,                // amount of players participating in game
    doubleNextRewardBoostCost: 200, // cost of the Double Reward boost
    stealMoneyBoostCost: 500        // cost of the Stealopardy boost
};

const players = {
    0: {
        name: "Player1",
        money: 0,
        doubleNextReward: false,
        stealMoney: false,
    },
    1: {
        name: "Player2",
        money: 0,
        doubleNextReward: false,
        stealMoney: false,
    },
    2: {
        name: "Player3",
        money: 0,
        doubleNextReward: false,
        stealMoney: false,
    },
}

const gameStateInfo = {
    currentPlayerID: 0,
    remainingQuestions: gameSettings.numberOfCategories * gameSettings.numberOfRowsInCategory,

}

const categoriesAndQuestionsAndAnswers = {
    "Science": {
        0: { question: "What is the chemical symbol for water?", answer: "H2O" },
        1: { question: "What planet is known as the Red Planet?", answer: "Mars" },
        2: { question: "What is the speed of light in a vacuum (km/s)?", answer: "300,000" },
        3: { question: "Who developed the theory of relativity?", answer: "Einstein" },
        4: { question: "What gas do plants absorb from the atmosphere?", answer: "CO2" },
        5: { question: "What is the center of an atom called?", answer: "Nucleus" },
        6: { question: "What organ pumps blood in the human body?", answer: "Heart" },
        7: { question: "What is the most abundant gas in Earth's atmosphere?", answer: "Nitrogen" },
        8: { question: "What force keeps us on the ground?", answer: "Gravity" },
        9: { question: "What is the hardest natural substance on Earth?", answer: "Diamond" }
    },
    "History": {
        10: { question: "Who was the first President of the United States?", answer: "George Washington" },
        11: { question: "What year did World War II end?", answer: "1945" },
        12: { question: "Which civilization built the pyramids?", answer: "Egyptians" },
        13: { question: "Who discovered America in 1492?", answer: "Christopher Columbus" },
        14: { question: "What was the name of the ship that brought the Pilgrims to America?", answer: "Mayflower" },
        15: { question: "Who was known as the Iron Lady?", answer: "Margaret Thatcher" },
        16: { question: "What year was the Declaration of Independence signed?", answer: "1776" },
        17: { question: "Who was the first man to step on the moon?", answer: "Neil Armstrong" },
        18: { question: "What empire was Julius Caesar part of?", answer: "Roman Empire" },
        19: { question: "Who was the Queen of England during the Spanish Armada?", answer: "Elizabeth I" }
    },
    "Geography": {
        20: { question: "What is the largest desert in the world?", answer: "Sahara" },
        21: { question: "What is the capital of France?", answer: "Paris" },
        22: { question: "Which country has the most people?", answer: "China" },
        23: { question: "What is the tallest mountain in the world?", answer: "Mount Everest" },
        24: { question: "What ocean is the largest?", answer: "Pacific" },
        25: { question: "What is the longest river in the world?", answer: "Nile" },
        26: { question: "What country has the most islands?", answer: "Sweden" },
        27: { question: "What is the capital of Japan?", answer: "Tokyo" },
        28: { question: "What continent is Australia part of?", answer: "Australia" },
        29: { question: "What is the smallest country in the world?", answer: "Vatican City" }
    },
    "Sports": {
        30: { question: "What sport is known as 'the beautiful game'?", answer: "Soccer" },
        31: { question: "How many players are on a basketball team?", answer: "5" },
        32: { question: "What country has won the most World Cups?", answer: "Brazil" },
        33: { question: "What is the top division of English soccer?", answer: "Premier League" },
        34: { question: "How many points is a touchdown worth?", answer: "6" },
        35: { question: "What is the only sport played on the moon?", answer: "Golf" },
        36: { question: "In what year were the first modern Olympics held?", answer: "1896" },
        37: { question: "What is the national sport of Japan?", answer: "Sumo Wrestling" },
        38: { question: "How many bases are there in baseball?", answer: "4" },
        39: { question: "What is the maximum score in a single bowling game?", answer: "300" }
    },
    "Movies": {
        40: { question: "Who directed 'Jurassic Park'?", answer: "Steven Spielberg" },
        41: { question: "What movie features the song 'My Heart Will Go On'?", answer: "Titanic" },
        42: { question: "Who played Iron Man in the Marvel Cinematic Universe?", answer: "Robert Downey Jr." },
        43: { question: "What is the highest-grossing movie of all time?", answer: "Avatar" },
        44: { question: "What year was 'The Lion King' released?", answer: "1994" },
        45: { question: "Who directed 'Inception'?", answer: "Christopher Nolan" },
        46: { question: "What is the name of the fictional world in 'Avatar'?", answer: "Pandora" },
        47: { question: "Who played Jack in 'Titanic'?", answer: "Leonardo DiCaprio" },
        48: { question: "What is the name of the hobbit played by Elijah Wood?", answer: "Frodo" },
        49: { question: "What is the first rule of Fight Club?", answer: "You do not talk about Fight Club" }
    },
    "Music": {
        50: { question: "Who is known as the King of Pop?", answer: "Michael Jackson" },
        51: { question: "What instrument has 88 keys?", answer: "Piano" },
        52: { question: "What band sang 'Hey Jude'?", answer: "The Beatles" },
        53: { question: "Who is the lead singer of U2?", answer: "Bono" },
        54: { question: "What is the highest female singing voice?", answer: "Soprano" },
        55: { question: "Who wrote 'Bohemian Rhapsody'?", answer: "Freddie Mercury" },
        56: { question: "What is the most streamed song on Spotify?", answer: "Blinding Lights" },
        57: { question: "What instrument is used in jazz music?", answer: "Saxophone" },
        58: { question: "What is Beethoven's first name?", answer: "Ludwig" },
        59: { question: "Who sang 'Rolling in the Deep'?", answer: "Adele" }
    },
    "Technology": {
        60: { question: "What does 'HTTP' stand for?", answer: "HyperText Transfer Protocol" },
        61: { question: "Who is the CEO of Tesla?", answer: "Elon Musk" },
        62: { question: "What is the name of Apple's virtual assistant?", answer: "Siri" },
        63: { question: "What does 'AI' stand for?", answer: "Artificial Intelligence" },
        64: { question: "What is the largest social media platform?", answer: "Facebook" },
        65: { question: "What programming language is used for web development?", answer: "JavaScript" },
        66: { question: "What is the parent company of Google?", answer: "Alphabet" },
        67: { question: "What is the name of Microsoft's gaming console?", answer: "Xbox" },
        68: { question: "Who invented the telephone?", answer: "Alexander Graham Bell" },
        69: { question: "What does 'RAM' stand for?", answer: "Random Access Memory" }
    },
    "Literature": {
        70: { question: "Who wrote 'To Kill a Mockingbird'?", answer: "Harper Lee" },
        71: { question: "What is the first book in the Harry Potter series?", answer: "Philosopher's Stone" },
        72: { question: "Who wrote '1984'?", answer: "George Orwell" },
        73: { question: "What is the longest book ever written?", answer: "In Search of Lost Time" },
        74: { question: "Who wrote 'The Great Gatsby'?", answer: "F. Scott Fitzgerald" },
        75: { question: "What is the pen name of Samuel Clemens?", answer: "Mark Twain" },
        76: { question: "Who wrote 'Pride and Prejudice'?", answer: "Jane Austen" },
        77: { question: "What is the name of the famous detective created by Arthur Conan Doyle?", answer: "Sherlock Holmes" },
        78: { question: "Who wrote 'Moby Dick'?", answer: "Herman Melville" },
        79: { question: "What is the name of the hobbit who wrote 'There and Back Again'?", answer: "Bilbo Baggins" }
    },
    "Food": {
        80: { question: "What is sushi traditionally wrapped in?", answer: "Seaweed" },
        81: { question: "What is the main ingredient in guacamole?", answer: "Avocado" },
        82: { question: "What spice is made from dried red peppers?", answer: "Paprika" },
        83: { question: "What is the main ingredient in hummus?", answer: "Chickpeas" },
        84: { question: "What is the national dish of Spain?", answer: "Paella" },
        85: { question: "What is the most expensive spice in the world?", answer: "Saffron" },
        86: { question: "What fruit is the most popular worldwide?", answer: "Banana" },
        87: { question: "What is the main ingredient in bread?", answer: "Flour" },
        88: { question: "What is the Italian word for pie?", answer: "Pizza" },
        89: { question: "What is the most popular drink in the world?", answer: "Water" }
    },
    "Mythology": {
        90: { question: "Who is the king of the Greek gods?", answer: "Zeus" },
        91: { question: "What is Thor's hammer called?", answer: "Mjolnir" },
        92: { question: "Who is the goddess of wisdom in Greek mythology?", answer: "Athena" },
        93: { question: "Who is the god of war in Roman mythology?", answer: "Mars" },
        94: { question: "What is the name of the Norse end of the world?", answer: "Ragnarok" },
        95: { question: "Who is the Egyptian god of the dead?", answer: "Anubis" },
        96: { question: "What creature is half lion and half eagle?", answer: "Griffin" },
        97: { question: "What is the river that separates the living and the dead?", answer: "Styx" },
        98: { question: "Who is the messenger god in Greek mythology?", answer: "Hermes" },
        99: { question: "What is Medusa's power?", answer: "Turning to stone" }
    }
};



const changeToNextPlayersTurn = () => {
    const playersCount = Object.keys(players).length;
    if(gameStateInfo.currentPlayerID + 1 === playersCount){
        gameStateInfo.currentPlayerID = 0;
    }
    else{
        gameStateInfo.currentPlayerID += 1;
    }
};


function App() {
    const tileRefs = useRef([]);


     // ============================ CURRENT QUESTION TRACKING ==============================

    const [currentQuestionInfo, setCurrentQuestionInfo] = useState({
        questionID: -1,
        questionPrize: 0
    });
    useEffect(() => {
        console.log(currentQuestionInfo.questionID + " " + currentQuestionInfo.questionPrize);
        if(currentQuestionInfo.questionID !== -1){
            changeShowingButtonsTo(buttonsToShowENUM.SHOW_ANSWER_BUTTON_CLICKABLE);
        }
    }, [currentQuestionInfo]);

    function currentQuestionIDHandler(questionID, questionPrize) {
        setCurrentQuestionInfo({questionID, questionPrize});
    }

     // ============================ CURRENT ACTION HAPPENING ==============================


    const [currentAction, setCurrentAction] = useState(currentActionsInfoENUM.STARTING_GAME);
    
    const changeCurrentActionTo = (actionEnumValue) => {
        setCurrentAction(actionEnumValue);
    }
    const currentInfo = (currentAction === currentActionsInfoENUM.STARTING_GAME 
        || currentAction === currentActionsInfoENUM.HOST_ACCEPTS_OR_REJECTS)
    ? currentAction 
    : currentAction + ": " + players[gameStateInfo.currentPlayerID].name;


    // ============================ CONTROL BUTTONS ==============================

    const [buttonsToShow, setButtonToShowTo] = useState(buttonsToShowENUM.SHOW_ANSWER_BUTTON_UNCLICKABLE);
    useEffect(() => {
        if(buttonsToShow === buttonsToShowENUM.ACCEPT_REJECT_ANSWER_BUTTON 
            && currentQuestionInfo.questionID !== -1){
                stopTimer();
                changeHostDecisionStateTo(hostDecisionStateENUM.HOST_THINKING);
                // ---------------------
                const tileRef = tileRefs.current[currentQuestionInfo.questionID];
                if(tileRef){
                    tileRef.showAnswer();
                }
                // ---------------------
                changeCurrentActionTo(currentActionsInfoENUM.HOST_ACCEPTS_OR_REJECTS);
        }
        else if(buttonsToShow === buttonsToShowENUM.SHOW_ANSWER_BUTTON_UNCLICKABLE 
            && currentQuestionInfo.questionID !== -1){
                changeCurrentActionTo(currentActionsInfoENUM.PLAYER_CHOOSES);
        }
        else if(buttonsToShow === buttonsToShowENUM.SHOW_ANSWER_BUTTON_CLICKABLE 
            && currentQuestionInfo.questionID !== -1){
                // ---------- odpalanie timeru
                startTimer(gameSettings.timeToAnswer);
                changeCurrentActionTo(currentActionsInfoENUM.PLAYER_ANSWERS);
        }
    }, [buttonsToShow]);

    function changeShowingButtonsTo(whatButtons){
        if(whatButtons !== buttonsToShowENUM.ACCEPT_REJECT_ANSWER_BUTTON
            && whatButtons !== buttonsToShowENUM.SHOW_ANSWER_BUTTON_CLICKABLE
            && whatButtons !== buttonsToShowENUM.SHOW_ANSWER_BUTTON_UNCLICKABLE
        ){
            setButtonToShowTo(buttonsToShowENUM.SHOW_ANSWER_BUTTON_UNCLICKABLE);
        }
        else{
            setButtonToShowTo(whatButtons);
        }
    }

    // ============================ HOST DECISION ==============================

    const [hostDecisionState, setHostDecisionState] = useState(hostDecisionStateENUM.HOST_THINKING);
    useEffect(() => {
        console.log(hostDecisionState);
        if(hostDecisionState === hostDecisionStateENUM.HOST_ACCEPTS){
            const wonPrize = currentQuestionInfo.questionPrize;
            const wonPrizeWithoutCurrency = wonPrize.substring(0, wonPrize.length - 1);
            const wonPrizeWithoutSpaces = wonPrizeWithoutCurrency.replace(" ", "");

            let moneyAdded = 0;
            if(players[gameStateInfo.currentPlayerID].doubleNextReward){
                players[gameStateInfo.currentPlayerID].money += 2*parseInt(wonPrizeWithoutSpaces);
                moneyAdded = 1;
            }

            if(players[gameStateInfo.currentPlayerID].stealMoney && moneyAdded == 0){
                let moneyToAdd = parseInt(wonPrizeWithoutSpaces);
                for(let i = 0; i < Object.keys(players).length; i++){
                    if(i !== gameStateInfo.currentPlayerID){
                        players[i].money -= parseInt(wonPrizeWithoutSpaces);
                        moneyToAdd += parseInt(wonPrizeWithoutSpaces);
                    }
                }
                players[gameStateInfo.currentPlayerID].money += moneyToAdd;
                moneyAdded = 1;
            }
            
            if(moneyAdded == 0){
                players[gameStateInfo.currentPlayerID].money += parseInt(wonPrizeWithoutSpaces);
            }
        }
        if(hostDecisionState === hostDecisionStateENUM.HOST_ACCEPTS 
            || hostDecisionState === hostDecisionStateENUM.HOST_REJECTS){
                players[gameStateInfo.currentPlayerID].doubleNextReward = false;
                players[gameStateInfo.currentPlayerID].stealMoney = false;
                changeToNextPlayersTurn();
        }
    }, [hostDecisionState]);

    function changeHostDecisionStateTo(newDecisionState){
        setHostDecisionState(newDecisionState);
    }



    // ============================ TIMER ==============================

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
                console.log("Timer ended!");
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

    // ============================ DOUBLE NEXT QUESTION ==============================

    const [doubleRewardForPlayerWithID, setDoubleRewardForPlayerWithID] = useState(-1);
    useEffect(() => {
        if(doubleRewardForPlayerWithID !== -1){
            players[doubleRewardForPlayerWithID].doubleNextReward = true;
            console.log("doubleNextReward set!");
        }
    }, [doubleRewardForPlayerWithID]);

    function buyDoubleRewardHandler(playerID) {
        if(playerID >= 0 && playerID < Object.keys(players).length 
            && gameStateInfo.currentPlayerID == playerID
            && players[playerID].doubleNextReward === false
            && players[playerID].money >= gameSettings.doubleNextRewardBoostCost){
                players[playerID].money -= gameSettings.doubleNextRewardBoostCost;
                setDoubleRewardForPlayerWithID(playerID);
        }
    }


    // ============================ STEAL MONEY NEXT QUESTION ==============================
    
    const [stealMoneyForPlayerWithID, setStealMoneyForPlayerWithID] = useState(-1);
    useEffect(() => {
        if(stealMoneyForPlayerWithID !== -1){
            players[stealMoneyForPlayerWithID].stealMoney = true;
            console.log("stealMoney set!");
        }
    }, [stealMoneyForPlayerWithID]);

    function buyStealMoneyHandler(playerID) {
        if(playerID >= 0 && playerID < Object.keys(players).length 
            && gameStateInfo.currentPlayerID == playerID
            && players[playerID].stealMoney === false
            && players[playerID].money >= gameSettings.stealMoneyBoostCost){
                players[playerID].money -= gameSettings.stealMoneyBoostCost;
                setStealMoneyForPlayerWithID(playerID);
        }
    }









    return (
        <>  
            <div className="main_container">
                <div className="left_side_container">
                    <div className="game_info_container">
                        <div className="game_logo_name">
                            <span>Jeopardy Risk & Reward</span>
                        </div>
                        <Timer seconds={seconds} 
                                milliseconds={milliseconds}/>
                    </div>
                    <div className="game_board_container">
                        <JeopardyQuestionsBoard numberOfCategories={gameSettings.numberOfCategories} 
                                                numberOfRowsInCategory={gameSettings.numberOfRowsInCategory}
                                                categoryStartingMoney={gameSettings.categoryStartingMoney}
                                                categoryMoneyIncreasesBy={gameSettings.categoryMoneyIncreasesBy}
                                                categoriesAndQuestionsAndAnswers={categoriesAndQuestionsAndAnswers}
                                                getCurrentQuestionID={currentQuestionIDHandler}
                                                tileRefs={tileRefs}/>
                    </div>
                </div>
                <div className="right_side_container">
                    <JeopardyScoreboard playersInfo={players} 
                                        buyStealMoneyHandler={buyStealMoneyHandler}
                                        buyDoubleRewardHandler={buyDoubleRewardHandler}/>
                    <ControlPanel playersInfo={players} 
                                currentPlayerID={gameStateInfo.currentPlayerID} 
                                currentInfo={currentInfo}
                                buttonsToShow={buttonsToShow}
                                changeShowingButtonsTo={changeShowingButtonsTo}
                                changeHostDecisionStateTo={changeHostDecisionStateTo}/>
                </div>
            </div>
        </>
    );
}

export default App;
