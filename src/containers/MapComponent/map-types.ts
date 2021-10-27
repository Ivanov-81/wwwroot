import Map from "ol/Map"

export type TMapProps = {};

export type TMapState = {
    mapContext?: IMap;
}

export interface IMap {
    map: Map
}

export interface IMapProps {
    fullscreen: Boolean
    setFullScreen: Function
}

export interface point {
    point: object
}

export interface IUser {
    name?: string
    surname?: string
    patronymic?: string
    email: string
    role: "guide" | "listener" | ""
    filled: boolean
}

export interface points {
    points: string[]
}

export interface linestring {
    polygon: number[][]
}

export interface polygon {
    polygon: number[][]
}

export interface polygon_with_hole {
    polygon_with_hole: any
}

export interface collection {
    collection: polygon_with_hole | polygon | linestring | point[]
}

export interface defaultStateMap {
    center: number[],
    zoom: number,
    map: object,
    point: point | null,
    linestring: linestring | null,
    polygon: polygon | null,
    polygon_with_hole: polygon_with_hole | null,
    collection: collection | null,
    drag_card: boolean,
    points: points | null,
}