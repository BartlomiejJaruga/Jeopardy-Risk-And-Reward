import classes from "./CurrentActionPanel.module.css";


function CurrentActionPanel({currentAction, currentPlayer}) {
    const currentInfo = currentAction + ": " + currentPlayer;

    return(
        <div className={classes.current_action_container}>
            {currentInfo}
        </div>
    );
}

export default CurrentActionPanel;
