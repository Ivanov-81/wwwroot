import {
    ADD_EVENT
} from "../ts/constants";
import { defaultStateEvent } from "../ts/interfaces";

const defaultState: defaultStateEvent = {
    event: null,
};

const event = (state = defaultState, action: any) => {
    switch (action.type) {
        case ADD_EVENT :
            return Object.assign({}, state, {
                event: action.event
            });
        default:
            return state;
    }

};

export default event;
