import { combineReducers } from 'redux'
import { 
    REQUEST_QUESTIONS,
    RECEIVE_QUESTIONS,
    RESET_SCORE,
    ADD_SCORE,
    UPDATE_SELECTED_OPTION,
    RESET_OPTION_CLASS_NAMES,
    ADD_OPTION_CLASS_NAMES,
    SET_SELECTABLE
} from './actions.js'

function questionsReducer(state = {isFetching: false, data: null}, action) {
    switch (action.type) {
        case REQUEST_QUESTIONS:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_QUESTIONS:
            return {
                isFetching: false,
                data: action.data
            };
        default:
            return state;
    }
}

function scoreReducer(state = 0, action) {
    switch (action.type) {
        case RESET_SCORE:
            return 0;
        case ADD_SCORE:
            return state + 10;
        default:
            return state;
    }
}

function selectedOptionReducer(state = null, action) {
    switch (action.type) {
        case UPDATE_SELECTED_OPTION:
            return action.index;
        default:
            return state;
    }
}

const initialClassNames = ["oneChoice", "oneChoice", "oneChoice", "oneChoice"];
function optionClassNamesReducer(state = initialClassNames, action) {
    switch (action.type) {
        case RESET_OPTION_CLASS_NAMES:
            return initialClassNames;
        case ADD_OPTION_CLASS_NAMES:
            return state.map((item, index) => {
                if (index === action.index) {
                    return item + " " + action.className;
                } else {
                    return item;
                }
            });
        default:
            return state;
    }
}

function selectableReducer(state = true, action) {
    switch (action.type) {
        case SET_SELECTABLE:
            return action.value;
        default:
            return state;
    }
}

/**
 * State of this App:
 * 
 * questions: {
 *    isFetching (Boolean): whether request for question data is in progress
 *    data (Array): question data
 * }
 * score (Number): current score of the user
 * selectedOption (Number): the index of the currently selected option
 * optionClassNames (Array): the className property for each option. Used for dynamically changing 
 *                           their styles.
 * selectable (Boolean): whether the options and button are workable. Used for preventing user action
 *                       after an answer is already submitted.
 * 
 */

let rootReducer = combineReducers({
    questions: questionsReducer,
    score: scoreReducer,
    selectedOption: selectedOptionReducer,
    optionClassNames: optionClassNamesReducer,
    selectable: selectableReducer,
})

export default rootReducer;