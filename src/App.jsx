import { useState } from 'react';
import './App.css';
import JeopardyQuestionsBoard from '@components/JeopardyQuestionsBoard/JeopardyQuestionsBoard';
import JeopardyScoreboard from '@components/JeopardyScoreboard/JeopardyScoreboard';
import Timer from '@components/Timer/Timer';
import ControlPanel from '@components/ControlPanel/ControlPanel';

const gameSettings = {
    numberOfCategories: 5,
    numberOfRowsInCategory: 5,
    categoryStartingMoney: 100,
    categoryMoneyIncreasesBy: 100,
    timeToAnswer: 90,   // sec
    playersCount: 3,
};



function App() {


    return (
        <>  
            <div className="main_container">
                <div className="left_side_container">
                    <div className="game_info_container">
                        <div className="game_logo_name">
                            <span>Jeopardy Risk & Reward</span>
                        </div>
                        <Timer timeToAnswer={gameSettings.timeToAnswer}/>
                    </div>
                    <div className="game_board_container">
                        <JeopardyQuestionsBoard numberOfCategories={gameSettings.numberOfCategories} 
                                                numberOfRowsInCategory={gameSettings.numberOfRowsInCategory}
                                                categoryStartingMoney={gameSettings.categoryStartingMoney}
                                                categoryMoneyIncreasesBy={gameSettings.categoryMoneyIncreasesBy}/>
                    </div>
                </div>
                <div className="right_side_container">
                    <JeopardyScoreboard />
                    <ControlPanel/>
                </div>
            </div>
        </>
    );
}

export default App;
