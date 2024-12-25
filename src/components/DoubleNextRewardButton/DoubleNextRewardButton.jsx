import classes from "./DoubleNextRewardButton.module.css";



function DoubleNextRewardButton({playerID, buyDoubleRewardHandler}) {

    return(
        <div className={classes.double_next_reward_button_container} onClick={() => buyDoubleRewardHandler(playerID)}>
            <span>2x</span>
        </div>
    );
}

export default DoubleNextRewardButton;