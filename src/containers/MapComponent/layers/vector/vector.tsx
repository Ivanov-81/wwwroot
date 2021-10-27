import React, {lazy, useEffect, useRef, useState} from "react";
import {
    Zoom,
    IconButton
} from '@mui/material';
import RoomRoundedIcon from "@mui/icons-material/RoomRounded";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Style from "ol/style/Style";
import Circle from "ol/style/Circle";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/styles";
import { imageCircle } from "../../elements/elements";
import {useDispatch, useSelector} from "react-redux";
import { switchDragCard, changePoint } from "../../../../actions/actionCreator";
// import AppAlert from "../../../app/AppAlert/AppAlert";
const AppAlert = lazy(() => import("../../../app/AppAlert/AppAlert"));
interface IProps {
    map: any
}

const useStyles = makeStyles(() => ({
    draw: {
        width: 44,
        height: 44,
        zIndex: 9,
        background: "rgba(0,60,136,0.5) !important",
        padding: 10,
        marginBottom: "5px !important",
        "&:hover": {
            background: "rgba(0,60,136,0.7) !important",
            boxShadow: "0 1px 4px 0 rgba(0,0,0,.15) !important",
        },
    },
    point: {
        color: "#ffffff",
        fontSize: "2.0rem",
        position: "relative"
    },
    polygon: {
        width: 22,
        height: 15,
        borderRadius: 3,
    },
    linestring: {
        width: 22,
        height: 0,
        borderRadius: 3,
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
}));

export const VectorLayerComponent = (props: IProps) => {
    
    const dragCardRef: any = useRef();

    const classes = useStyles();
    const { t } = useTranslation();
    const dispatch: any = useDispatch();
    const drag_card = useSelector((store: any) => store.map.drag_card);
    
    const [title, setTitle] = useState<string>(t("point"));
    const [alert, setAlert] = useState<boolean>(false);
    
    // const [update, setUpdate] = useState<boolean>(false);
    const [layer, setLayer] = useState<any>(null);
    const [source, setSource] = useState<any>(null);
    const [buttons_state, setButtonsState] = useState<any>({
        "point": false,
        "linestring": false,
        "polygon": false,
        "polygon_with_hole": false,
        "collection": false
    });

    dragCardRef.current = drag_card;
    
    const handleClickOpen = () => {
        dispatch(switchDragCard(true));
    };
    
    const clearStateButtons = () => {
        for(let state in buttons_state) {
            buttons_state[state] = false;
        }        
    }

    const switchStateButtons = (str: string) => {
        clearStateButtons();
        buttons_state[str] = true;
        setButtonsState(buttons_state);
        // setUpdate(!update);
    };

    const onMapClick = (event: any) => {

        console.log(dragCardRef.current);
        
        let elem: any = document.getElementById("draggable_dialog_map");
        
        if(dragCardRef.current) {
            const featureToAdd = new Feature({
                geometry: new Point(event.coordinate),
            });
            const style = new Style({
                image: new Circle(imageCircle)
            });
            featureToAdd.setStyle(style);
            source.clear();
            source.addFeatures([featureToAdd]);
            reverseGeocode(event.coordinate);
            return
        }
        
        if(!elem) {
            setAlert(true);
        }
    }
    
    const reverseGeocode = (coords: number[]) => {
        fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + coords[0] + '&lat=' + coords[1])
            .then(function(response) {
                return response.json();
            })
            .then(function(point) {
                dispatch(changePoint(point))
            });
    }
    
    useEffect(() => {
        
        let src = new VectorSource({
            features: undefined,
        })
        setSource(src);
        
        setLayer(
            new VectorLayer({
                source: src,
            })
        )
        
    }, [])

    useEffect(() => {
        if(layer) {
            props.map.addLayer(layer);
            props.map.on("singleclick", onMapClick);
        }
    },[layer])
    
    useEffect(() => {
        setTitle(t("point"))
    },[title]);
    
    useEffect(() => {
        if(!drag_card) {
            clearStateButtons();
            setButtonsState(buttons_state);
            // setUpdate(!update);
        }
    },[drag_card]);
    
    return (
        <>
            <AppAlert
                alert={alert}
                severity={"warning"}
                message={`Выберите тип маршрута`}
                close={setAlert}
            />

            <Zoom in={true}>
                <div className={classes.blockButtons} onClick={handleClickOpen}>

                    <IconButton
                        className={classes.draw}
                        onClick={() => switchStateButtons("point")}
                        title={t("point")}
                    >
                        <RoomRoundedIcon
                            className={classes.point}
                            style={
                                buttons_state.point
                                    ? { color: "#ff6969" }
                                    : { color: "#ffffff" }
                            }
                        />
                    </IconButton>

                    <IconButton
                        className={classes.draw}
                        onClick={() => switchStateButtons("linestring")}
                        title={t("linestring")}
                    >
                        <div
                            className={classes.linestring}
                            style={
                                buttons_state.linestring
                                    ? { border: "2px solid #ff6969" }
                                    : { border: "2px solid #ffffff" }
                            }
                        />
                    </IconButton>

                    <IconButton
                        className={classes.draw}
                        onClick={() => switchStateButtons("polygon")}
                        title={t("polygon")}
                    >
                        <div
                            className={classes.polygon}
                            style={
                                buttons_state.polygon
                                    ? { border: "2px solid #ff6969" }
                                    : { border: "2px solid #ffffff" }
                            }
                        />
                    </IconButton>
                    
                    <IconButton
                        className={classes.draw}
                        onClick={() => switchStateButtons("polygon_with_hole")}
                        title={t("polygon_with_hole")}
                    >
                        <div
                            className={classes.polygon}
                            style={
                                buttons_state.polygon_with_hole
                                    ? { border: "2px solid #ff6969" }
                                    : { border: "2px solid #ffffff" }
                            }
                        />
                    </IconButton>
                    
                    <IconButton
                        className={classes.draw}
                        onClick={() => switchStateButtons("collection")}
                        title={t("collection")}
                    >
                        <div
                            className={classes.polygon}
                            style={
                                buttons_state.collection
                                    ? { border: "2px solid #ff6969" }
                                    : { border: "2px solid #ffffff" }
                            }
                        />
                    </IconButton>
                </div>
            </Zoom>
        </>
    );
    
}