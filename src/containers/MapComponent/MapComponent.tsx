import React, { useEffect, useRef } from "react";

import Map from "ol/Map";
import View from "ol/View";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import { VectorLayer } from "./layers";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";

import { addMap } from "../../actions/actionCreator";

import "ol/ol.css";

const useStyles = makeStyles((theme: any) => ({
    map: {
        width: "100%",
        height: "100%",
        position: "relative"
    },
    loader: {
        display: "block",
        width: "24px",
        height: "24px",
        position: "absolute",
        left: "50%",
        marginLeft: -12,
        color: "#3f51b5 !important",
        zIndex: 999,
    },
    blockButtons: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        right: 6,
        top: 6,
        width: 44,
        height: 144,
    },
    fullscreenMap: {
        zIndex: 9,
        background: "rgba(0,60,136,0.5)",
        color: "#FFFFFF",
        padding: 10,
        "&:hover": {
            color: "#FFFFFF",
            background: "rgba(0,70,136,0.5)",
            boxShadow: "0 1px 4px 0 rgba(0,0,0,.15)",
        },
    },
    draw: {
        width: 44,
        height: 44,
        zIndex: 9,
        background: "rgba(0,60,136,0.5)",
        padding: 10,
        "&:hover": {
            background: "rgba(0,70,136,0.5)",
            boxShadow: "0 1px 4px 0 rgba(0,0,0,.15)",
        },
    },
    point: {
        color: "#ffffff",
        fontSize: "2.0rem",
        position: "relative",
    },
    active: {
        color: "#ff6969",
        fontSize: "2.0rem",
        position: "relative",
    },
    route: {
        width: 22,
        height: 15,
        borderRadius: 3,
    },
}));

const MapComponent = () => {
    
    const mapDivRef: any = useRef();
    const dispatch: any = useDispatch();

    const classes = useStyles();
    const center: any = useSelector((store: any) => store.map.center);
    const zoom: any = useSelector((store: any) => store.map.zoom);
    const map: any = useSelector((store: any) => store.map.map);

    useEffect(() => {
        
        // if(!Object.keys(map).length) {
            const M: any = new Map({
                target: mapDivRef.current,
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                ],
                view: new View({
                    // projection: 'EPSG:4326',
                    center,
                    zoom
                }),
            });
            dispatch(addMap(M));
        // }
        
    }, []);
    
    return (
        <>
            <div ref={mapDivRef} className={classes.map}>
                <VectorLayer map={map} />
            </div>
        </>
    );
};

export default MapComponent;
