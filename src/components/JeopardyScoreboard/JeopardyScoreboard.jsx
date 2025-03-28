import classes from './JeopardyScoreboard.module.css';
import DoubleNextRewardButton from "@components/DoubleNextRewardButton/DoubleNextRewardButton";
import StealMoneyButton from "@components/StealMoneyButton/StealMoneyButton";

const generatePlayers = (playersInfo, buyStealMoneyHandler, buyDoubleRewardHandler) => {
    const scoreboard = [];
    for(const playerID in playersInfo){
        scoreboard.push(<div>
                            <span>{playersInfo[playerID].name}: {playersInfo[playerID].money} $</span>
                            <div className={classes.players_boost_buttons}>
                                <StealMoneyButton playerID={playerID} buyStealMoneyHandler={buyStealMoneyHandler}/>
                                <DoubleNextRewardButton playerID={playerID} buyDoubleRewardHandler={buyDoubleRewardHandler}/>
                            </div>
                        </div>)
    }
    
    return scoreboard;
};


function JeopardyScoreboard({playersInfo, buyStealMoneyHandler, buyDoubleRewardHandler}){
    return(
        <div className={classes.scoreboard}>
            <div className={classes.scoreboard_name_container}>
                <span>SCOREBOARD</span>
            </div>
            <div className={classes.players_scores_container}>
                {generatePlayers(playersInfo, buyStealMoneyHandler, buyDoubleRewardHandler)}
            </div>
            
        </div>
    );
}

export default JeopardyScoreboard;