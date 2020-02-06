import { FETCH_USER } from "../actions/types";

export default function(state = null, action) {
    console.log(action);
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}


/*const INITIAL_STATE ={
    isSignedIn: null,
    userId: null
};*/

/*export default function(state = INITIAL_STATE, action) {
    console.log(action);
    switch (action.type) {
        case FETCH_USER:
            return {...state, isSignedIn: true, userId: action.payload };
        default:
            return state;
    }
}*/

/*export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, userId: action.payload };
        case SIGN_OUT:
            return { ...state, isSignedIn: false, userId: null};
        default:
            return state;
    }
};*/
