export const SET_CLIENT_NAME = 'SET_CLIENT_NAME';
export const SET_CLIENT_ID = 'SET_CLIENT_ID';


export const setClientName = (clientname) => dispatch => {
    dispatch({
        type: SET_CLIENT_NAME,
        payload: clientname,
    })
};

export const setClientID = (clientid) => dispatch => {
    dispatch({
        type: SET_CLIENT_ID,
        payload: clientid,
    })
};