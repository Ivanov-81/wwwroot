import {
    ADD_MAP, CHANGE_POINTS, ADD_USER,
    ADD_EVENT, CHANGE_POINT,
    CHANGE_ZOOM, CHANGE_USER,
    CHANGE_CENTER, CHANGE_LANGUAGE,
    CHANGE_LOCATION, SWITCH_DRAG_CARD, SWITCH_AUTH
} from "./constants";
import { point, points, IUser } from "../containers/MapComponent/map-types";

export interface SwitchAuth {
    type: typeof SWITCH_AUTH;
    auth: boolean
}

export interface ChangeLocation {
    type: typeof CHANGE_LOCATION;
    location: any
}

export interface ChangeLanguage {
    type: typeof CHANGE_LANGUAGE;
    language: string
}

export interface AddEvent {
    type: typeof ADD_EVENT;
    event: any
}

export interface ChangeCenter {
    type: typeof CHANGE_CENTER;
    center: Array<number>;
}

export interface AddMap {
    type: typeof ADD_MAP;
    map: object;
}

export interface ChangePoint {
    type: typeof CHANGE_POINT;
    point: point;
}

export interface ChangePoints {
    type: typeof CHANGE_POINTS;
    points: points;
}

export interface AddUser {
    type: typeof ADD_USER;
    user: IUser;
}

export interface ChangeUser {
    type: typeof CHANGE_USER;
    user: IUser;
}

export interface ChangeZoom {
    type: typeof CHANGE_ZOOM;
    zoom: number;
}

export interface SwitchDragCard {
    type: typeof SWITCH_DRAG_CARD;
    drag_card: boolean;
}

export interface defaultStateEvent {
    event: any
}

// export interface EnqueueSnackbar {
//     type: typeof ENQUEUE_SNACKBAR;
//     notification: any
// }
//
// export interface CloseSnackbar {
//     type: typeof CLOSE_SNACKBAR;
//     dismissAll: any;
//     key: any
// }
//
// export interface RemoveSnackbar {
//     type: typeof REMOVE_SNACKBAR;
//     key: any
// }

export type ReportsActionTypes = ChangeLocation
    | ChangeLanguage
    | AddEvent
    | ChangeCenter
    | AddMap
    | ChangeZoom
    | SwitchDragCard
    | ChangePoint
    | ChangePoints
    | AddUser
    | ChangeUser
    | SwitchAuth
    // | EnqueueSnackbar | CloseSnackbar | RemoveSnackbar

export type AppActions = ReportsActionTypes
