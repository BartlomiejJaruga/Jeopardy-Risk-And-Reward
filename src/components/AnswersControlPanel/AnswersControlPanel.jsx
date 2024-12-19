import { useState } from "react";
import classes from "./AnswersControlPanel.module.css";

const buttonsToShowENUM = Object.freeze({
    SHOW_ANSWER_BUTTON_UNCLICKABLE: "show_answer_button_unclickable",
    SHOW_ANSWER_BUTTON_CLICKABLE: "show_answer_button_clickable",
    ACCEPT_REJECT_ANSWER_BUTTON: "accept_reject_answer_button"
});

function AnswersControlPanel() {
    const [buttonsToShow, setButtonToShowTo] = useState(buttonsToShowENUM.SHOW_ANSWER_BUTTON_UNCLICKABLE);

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

    return(
        <div className={classes.answers_control_panel_container}>
            {buttonsToShow === buttonsToShowENUM.SHOW_ANSWER_BUTTON_UNCLICKABLE 
            &&  <button className={classes.show_answer_button_unclickable}
                        onClick={() => changeShowingButtonsTo(buttonsToShowENUM.SHOW_ANSWER_BUTTON_CLICKABLE)}>
                    Show Answer
                </button>}
            {buttonsToShow === buttonsToShowENUM.SHOW_ANSWER_BUTTON_CLICKABLE 
            &&  <button className={classes.show_answer_button_clickable} 
                        onClick={() => changeShowingButtonsTo(buttonsToShowENUM.ACCEPT_REJECT_ANSWER_BUTTON)}>
                    Show Answer
                </button>}
            {buttonsToShow === buttonsToShowENUM.ACCEPT_REJECT_ANSWER_BUTTON
            &&  <button className={classes.accept_answer_button}
                        onClick={() => changeShowingButtonsTo(buttonsToShowENUM.SHOW_ANSWER_BUTTON_UNCLICKABLE)}>
                    Accept
                </button>}
            {buttonsToShow === buttonsToShowENUM.ACCEPT_REJECT_ANSWER_BUTTON
            &&  <button className={classes.reject_answer_button}
                        onClick={() => changeShowingButtonsTo(buttonsToShowENUM.SHOW_ANSWER_BUTTON_UNCLICKABLE)}>
                    Reject
                </button>}
        </div>
    );
}

export default AnswersControlPanel;
