// File containing all enums used in app

export const gameStateENUM = Object.freeze({
    GAME_STARTING: "game is starting",
    GAME_ONGOING: "game is now being played",
    GAME_FINISHED: "game is now finished"
});

export const currentActionsInfoENUM = Object.freeze({
    STARTING_GAME: "Starting the game...",
    PLAYER_ANSWERS: "Answers",
    PLAYER_CHOOSES: "Chooses tile",
    HOST_ACCEPTS_OR_REJECTS: "Host decides on answer..."
});

export const buttonsToShowENUM = Object.freeze({
    SHOW_ANSWER_BUTTON_UNCLICKABLE: "show_answer_button_unclickable",
    SHOW_ANSWER_BUTTON_CLICKABLE: "show_answer_button_clickable",
    ACCEPT_REJECT_ANSWER_BUTTON: "accept_reject_answer_button"
});

export const hostDecisionStateENUM = Object.freeze({
    HOST_THINKING: "host_thinking",
    HOST_ACCEPTS: "host_accepts",
    HOST_REJECTS: "host_rejects"
});

export const timerStateENUM = Object.freeze({
    FINISHED: "finished",
    COUNTING: "counting"
});