import { SET_CLIENT_ID, SET_CLIENT_NAME } from './actions';

const initialState = {
    clientname: '',
    clientid: '',
}

function clientReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CLIENT_NAME:
            return { ...state, clientname: action.payload };
        case SET_CLIENT_ID:
            return { ...state, clientid: action.payload };
        default:
            return state;
    }
}

export default clientReducer;