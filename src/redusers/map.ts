import {
    ADD_MAP,
    CHANGE_ZOOM,
    CHANGE_CENTER,
    CHANGE_POINT,
    CHANGE_LINESTRING,
    CHANGE_POLYGON,
    CHANGE_POLYGON_WITH_HOLE,
    CHANGE_COLLECTION,
    SWITCH_DRAG_CARD, CHANGE_POINTS
} from "../ts/constants";

import {defaultStateMap} from "../containers/MapComponent/map-types";

const defaultState: defaultStateMap = {
    center: [0, 0],
    zoom: 14,
    map: {},
    point: null,
    linestring: null,
    polygon: null,
    polygon_with_hole: null,
    collection: null,
    drag_card: false,
    points: null
};

const map: any = (state = defaultState, action: any) => {

    switch (action.type) {
        case SWITCH_DRAG_CARD:
            return Object.assign({}, state, {
                drag_card: action.drag_card,
            });
        case CHANGE_CENTER:
            return Object.assign({}, state, {
                center: action.center,
            });
        case CHANGE_ZOOM:
            return Object.assign({}, state, {
                zoom: action.zoom,
            });
        case ADD_MAP:
            return Object.assign({}, state, {
                map: action.map,
            });
        case CHANGE_POINT:
            return Object.assign({}, state, {
                point: action.point,
            });
        case CHANGE_POINTS:
            return Object.assign({}, state, {
                points: action.points,
            });
        case CHANGE_LINESTRING:
            return Object.assign({}, state, {
                linestring: action.linestring,
            });
        case CHANGE_POLYGON:
            return Object.assign({}, state, {
                polygon: action.polygon,
            });
        case CHANGE_POLYGON_WITH_HOLE:
            return Object.assign({}, state, {
                polygon_with_hole: action.polygon_with_hole,
            });
        case CHANGE_COLLECTION:
            return Object.assign({}, state, {
                collection: action.collection,
            });
        default:
            return state;
    }

};

export default map;
