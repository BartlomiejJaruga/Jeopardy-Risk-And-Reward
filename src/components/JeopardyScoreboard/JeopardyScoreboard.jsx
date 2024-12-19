import classes from './JeopardyScoreboard.module.css';

function JeopardyScoreboard({playersInfo}){
    return(
        <div className={classes.scoreboard}>
            <div className={classes.scoreboard_name_container}>
                <span>SCOREBOARD</span>
            </div>
            <div className={classes.players_scores_container}>
                <div>
                    <span>player1: 1000 $</span>
                </div>
                <div>
                    <span>player2: 2000 $</span>
                </div>
                <div>
                    <span>player3: 3000 $</span>
                </div>
                <div>
                    <span>player3: 3000 $</span>
                </div>
                <div>
                    <span>player3: 3000 $</span>
                </div>
                <div>
                    <span>player3: 3000 $</span>
                </div>
                <div>
                    <span>player3: 3000 $</span>
                </div>
                <div>
                    <span>player3: 3000 $</span>
                </div>
            </div>
            
        </div>
    );
}

export default JeopardyScoreboard;