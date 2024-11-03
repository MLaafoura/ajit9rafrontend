import axios from "axios";
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
     PASSWORD_RESET_CONFIRM
    } from "./types";


export const load_user = () => async dispatch => {
        if(localStorage.getItem('access')){
            const config = {
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}` , 
                    'Accept': 'application/json'
                }
            };

            try{
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
                dispatch({
                    type: LOAD_USER_SUCCESS,
                    payload: res.data
                })
            }catch(err){
                dispatch({
                    type: LOAD_USER_FAIL
                })
            }
        }
        else{
            dispatch({
                type: LOAD_USER_FAIL
            })
        }
     };


export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({email, password});

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(load_user());
    }catch(err){
        dispatch({
            type: LOGIN_FAIL
        })
    }
};


export const signup = (email,fullName, password, re_password, phone_number, website ) => async dispatch => {
    const config = {
        headers: {
            'content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({email,fullName, password, re_password, phone_number, website});

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type: SIGNUP_FAIL
        })
    }
};

export const verify = (uid, token) =>async dispatch => {
    const config = {
        headers: {
            'content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({uid, token});

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);
        dispatch({
            type: ACTIVATION_SUCCESS,
        });
    }catch(err){
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
}

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email})

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);
        dispatch({
            type: PASSWORD_RESET_SUCCESS,
        });
    }catch(err){
        dispatch({
            type: PASSWORD_RESET_FAIL
        })
    }
};

export const reset_password_confirm= (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({uid, token, new_password, re_new_password})

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);
        dispatch({
            type: PASSWORD_RESET_CONFIRM,
        });
    }catch(err){
        dispatch({
            type: PASSWORD_RESET_FAIL
        })
    }
};
export const logout = () => dispatch =>{
    dispatch({
        type:LOGOUT
    });
    
}