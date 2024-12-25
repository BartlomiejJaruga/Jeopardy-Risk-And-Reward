import classes from "./StealMoneyButton.module.css";



function StealMoneyButton({playerID, buyStealMoneyHandler}) {

    return(
        <div className={classes.steal_money_button_container} onClick={() => buyStealMoneyHandler(playerID)}>
            <span>S</span>
        </div>
    );
}

export default StealMoneyButton;