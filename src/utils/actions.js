import axios from 'axios';

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export function requestQuestions() {
    return {
        type: REQUEST_QUESTIONS
    };
}

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export function receiveQuestions(data) {
    return {
        type: RECEIVE_QUESTIONS,
        data: data
    };
}

export function fetchQuestionsIfNeeded(url) {
    return async function (dispatch, getState) {
        let state = getState();

        if (!state.questions.isFetching && state.questions.data === null) {
            dispatch(requestQuestions());

            let questions = await axios.get(url);

            dispatch(receiveQuestions(questions.data.RECORDS));
        }
    }
}

export const RESET_SCORE = 'RESET_SCORE';
export function resetScore() {
    return {
        type: RESET_SCORE
    }
}

export const ADD_SCORE = 'ADD_SCORE';
export function addScore() {
    return {
        type: ADD_SCORE
    }
}

export const UPDATE_SELECTED_OPTION = 'UPDATE_SELECTED_OPTION';
export function updateSelectedOption(index) {
    return {
        type: UPDATE_SELECTED_OPTION,
        index: index
    }
}

export const RESET_OPTION_CLASS_NAMES = 'RESET_OPTION_CLASS_NAMES';
export function resetOptionClassNames() {
    return {
        type: RESET_OPTION_CLASS_NAMES
    }
}

export const ADD_OPTION_CLASS_NAMES = 'ADD_OPTION_CLASS_NAMES';
export function addOptionClassNames(className, index) {
    return {
        type: ADD_OPTION_CLASS_NAMES,
        className: className,
        index: index
    }
}

export const SET_SELECTABLE = 'SET_SELECTABLE';
export function setSelectable(value) {
    return {
        type: SET_SELECTABLE,
        value: value    // true or false
    }
}