import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = () => {
    return dispatch => {
        dispatch(authStart());

    }
}

export const authFailed = () => {
    return {
        type: actionTypes.AUTH_FAILED,

    }
}