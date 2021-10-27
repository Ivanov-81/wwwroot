import {
    ADD_USER,
    CHANGE_LANGUAGE,
    CHANGE_LOCATION, CHANGE_THEME, CHANGE_USER, SWITCH_AUTH
} from "../ts/constants";

const defaultState: object = {
    user: {
        email: "",
        role: "",
        filled: false
    },
    auth: false,
    mode: "light",
    language: "ru",
    languages: [
        {
            language: "en",
            country: "En",
        },
        {
            language: "es",
            country: "Es",
        },
        {
            language: "ru",
            country: "Ру",
        },
    ]
};

const app: any = (state = defaultState, action: any) => {

    switch (action.type) {
        case SWITCH_AUTH:
            return Object.assign({}, state, {
                auth: action.auth,
            });
        case CHANGE_THEME:
            return Object.assign({}, state, {
                light: action.light,
            });
        case CHANGE_LANGUAGE:
            return Object.assign({}, state, {
                language: action.language,
            });
        case CHANGE_LOCATION:
            return Object.assign({}, state, {
                location: action.location,
            });
        case ADD_USER:
            return Object.assign({}, state, {
                user: action.user,
            });
        case CHANGE_USER:
            return Object.assign({}, state, {
                user: action.user,
            });
        default:
            return state;
    }

};

export default app;
