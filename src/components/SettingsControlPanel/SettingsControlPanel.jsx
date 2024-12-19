import classes from "./SettingsControlPanel.module.css";


function SettingsControlPanel() {
    return(
        <div className={classes.settings_control_panel_container}>
            <button className={classes.mute_unmute_button}>
                mute
            </button>
            <button className={classes.show_current_lobby_settings_button}>
                settings
            </button>
            <button className={classes.exit_button}>
                exit
            </button>
        </div>
    );
}

export default SettingsControlPanel;
