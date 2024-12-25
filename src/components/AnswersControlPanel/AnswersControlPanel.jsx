import { useState } from "react";
import classes from "./AnswersControlPanel.module.css";
import {buttonsToShowENUM, hostDecisionStateENUM} from "@enums";


function AnswersControlPanel({ buttonsToShow, changeShowingButtonsTo, changeHostDecisionStateTo }) {
    const hostDecisionHandler = (hostDecision) => {
        changeHostDecisionStateTo(hostDecision);
        changeShowingButtonsTo(buttonsToShowENUM.SHOW_ANSWER_BUTTON_UNCLICKABLE);
    }


    return(
        <div className={classes.answers_control_panel_container}>
            {buttonsToShow === buttonsToShowENUM.SHOW_ANSWER_BUTTON_UNCLICKABLE 
            &&  <button className={classes.show_answer_button_unclickable}>
                    Show Answer
                </button>}
            {buttonsToShow === buttonsToShowENUM.SHOW_ANSWER_BUTTON_CLICKABLE 
            &&  <button className={classes.show_answer_button_clickable} 
                        onClick={() => changeShowingButtonsTo(buttonsToShowENUM.ACCEPT_REJECT_ANSWER_BUTTON)}>
                    Show Answer
                </button>}
            {buttonsToShow === buttonsToShowENUM.ACCEPT_REJECT_ANSWER_BUTTON
            &&  <button className={classes.accept_answer_button}
                        onClick={() => hostDecisionHandler(hostDecisionStateENUM.HOST_ACCEPTS)}>
                    Accept
                </button>}
            {buttonsToShow === buttonsToShowENUM.ACCEPT_REJECT_ANSWER_BUTTON
            &&  <button className={classes.reject_answer_button}
                        onClick={() => hostDecisionHandler(hostDecisionStateENUM.HOST_REJECTS)}>
                    Reject
                </button>}
        </div>
    );
}

export default AnswersControlPanel;
