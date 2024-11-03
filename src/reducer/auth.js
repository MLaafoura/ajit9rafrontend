import { LOGIN_SUCCESS,
     LOGIN_FAIL,
     LOAD_USER_SUCCESS,
     LOAD_USER_FAIL,
     SIGNUP_SUCCESS,
     SIGNUP_FAIL,
     LOGOUT, 
     ACTIVATION_SUCCESS,
     ACTIVATION_FAIL,
     PASSWORD_RESET_SUCCESS,
     PASSWORD_RESET_FAIL,
    } from "../actions/types";

const initialState = {
    access : localStorage.getItem('access'),
    refresh : localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null
}

export default function(state = initialState, action){
    const {type, payload} = action;
    
    switch(type){
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            return{
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case SIGNUP_SUCCESS:
            return{
                ...state,
                isAuthenticated: false
            }
        case LOAD_USER_SUCCESS:
            return{
                ...state,
                user: payload
            }
        case LOAD_USER_FAIL:
            return{
                ...state,
                user: null
            }
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
            return{
                ...state
            }
        default:
            return state
    }
}