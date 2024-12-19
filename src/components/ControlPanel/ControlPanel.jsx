import classes from "./ControlPanel.module.css";
import CurrentActionPanel from "@components/CurrentActionPanel/CurrentActionPanel";
import AnswersControlPanel from "@components/AnswersControlPanel/AnswersControlPanel";
import SettingsControlPanel from "@components/SettingsControlPanel/SettingsControlPanel";


function ControlPanel() {
    return(
        <div className={classes.control_panel_container}>
            <CurrentActionPanel currentAction="Answers" currentPlayer="player1"/>
            <AnswersControlPanel/>
            <SettingsControlPanel/>
        </div>
    );
}

export default ControlPanel;
