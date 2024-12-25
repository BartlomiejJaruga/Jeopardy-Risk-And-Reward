import classes from "./CurrentActionPanel.module.css";


function CurrentActionPanel({currentInfo}) {
    return(
        <div className={classes.current_action_container}>
            {currentInfo}
        </div>
    );
}

export default CurrentActionPanel;
