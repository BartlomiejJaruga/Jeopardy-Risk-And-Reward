import classes from "./ControlPanel.module.css";
import CurrentActionPanel from "@components/CurrentActionPanel/CurrentActionPanel";
import AnswersControlPanel from "@components/AnswersControlPanel/AnswersControlPanel";
import SettingsControlPanel from "@components/SettingsControlPanel/SettingsControlPanel";
import { useState } from "react";

function ControlPanel({ playersInfo, 
                        currentPlayerID, 
                        currentInfo, 
                        buttonsToShow, 
                        changeShowingButtonsTo,
                        changeHostDecisionStateTo }) {

    return(
        <div className={classes.control_panel_container}>
            <CurrentActionPanel currentInfo={currentInfo}/>
            <AnswersControlPanel buttonsToShow={buttonsToShow} 
                                changeShowingButtonsTo={changeShowingButtonsTo}
                                changeHostDecisionStateTo={changeHostDecisionStateTo}/>
            <SettingsControlPanel/>
        </div>
    );
}

export default ControlPanel;
