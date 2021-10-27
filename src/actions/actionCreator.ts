import {
    ADD_MAP,
    ADD_EVENT,
    CHANGE_ZOOM,
    CHANGE_CENTER,
    CHANGE_LANGUAGE,
    SWITCH_DRAG_CARD,
    CHANGE_POINTS,
    CHANGE_POINT,
    ADD_USER, SWITCH_AUTH
} from "../ts/constants";

import { AppActions } from "../ts/interfaces";
import { IUser, point, points } from "../containers/MapComponent/map-types";

export const addEvent = (event: any): AppActions => ({
    type: ADD_EVENT,
    event
});

export const switchAuth = (auth: boolean): AppActions => ({
    type: SWITCH_AUTH,
    auth
});

export const changeLanguage = (language: string): AppActions => ({
    type: CHANGE_LANGUAGE,
    language
});

export const changeZoom = (zoom: number): AppActions => ({
    type: CHANGE_ZOOM,
    zoom,
});

export const changeCenter = (center: Array<number>): AppActions => ({
    type: CHANGE_CENTER,
    center,
});

export const addMap = (map: object): AppActions => ({
    type: ADD_MAP,
    map,
});

export const switchDragCard = (drag_card: boolean): AppActions => ({
    type: SWITCH_DRAG_CARD,
    drag_card
});

export const changePoints = (points: points): AppActions => ({
    type: CHANGE_POINTS,
    points
});

export const changePoint = (point: point): AppActions => ({
    type: CHANGE_POINT,
    point
});

export const addUser = (user: IUser): AppActions => ({
    type: ADD_USER,
    user
});