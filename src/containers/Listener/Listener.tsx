import React, {lazy, useEffect, useState} from "react";
import { makeStyles } from "@material-ui/styles";
import Draggable from 'react-draggable';

import {
    Card,
    Zoom,
    Button,
    Container,
    Typography,
    CardActions,
    CardContent,
} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {switchDragCard} from "../../actions/actionCreator";

const Point = lazy(() => import("./Point/Point"));
const MapComponent = lazy(() => import("../MapComponent/MapComponent"));

const useStyles = makeStyles((theme: any) => ({
    map: {
        margin: "80px 0 0 0",
        width: "100%",
        height: 780,
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 1px 4px 0 rgba(0,0,0,.15)",
    },
    card: {
        zIndex: 1300,
        position: "fixed"
    }
}));

const Listener = () => {
    
    const classes = useStyles();
    const { t } = useTranslation();
    const dispatch: any = useDispatch();
    
    const drag_card = useSelector((store: any) => store.map.drag_card);
    const point = useSelector((store: any) => store.map.point);
    
    const [title, setTitle] = useState<string>(t("point"));
    
    const handleClose = () => {
        dispatch(switchDragCard(false));
    };

    const handleSendData = () => {
        handleClose();
    };
    
    return (
        <>
            {
                drag_card &&
                    <Draggable
                        handle="#draggable-dialog-title"
                        cancel={'[class*="MuiDialogContent-root"]'}
                        defaultPosition={{x: 50, y: 50}}
                        scale={1}
                    >
                        <Card
                            sx={{ width: 300 }}
                            aria-labelledby="draggable-dialog-title"
                            className={classes.card}
                            id="draggable_dialog_map"
                        >
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    component="div"
                                    id="draggable-dialog-title"
                                    style={{
                                        cursor: "move",
                                        marginBottom: 10
                                    }}
                                >
                                    {title}
                                </Typography>
                                <Typography component={point ? "div" : "p"} variant="body2">
                                    {
                                        point
                                            ? <Point />
                                            : t("point_modal")
                                    }
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    onClick={handleClose}
                                    style={{textTransform: "none"}}
                                >
                                    {t("close")}
                                </Button>
                                <Button
                                    onClick={handleSendData}
                                    style={{textTransform: "none"}}
                                >
                                    {t("save")}
                                </Button>
                            </CardActions>
                        </Card>
                    </Draggable>                    
            }

            <Container>
                <Zoom in={true} timeout={{ enter: 600, exit: 300 }}>
                    <Card className={classes.map}>
                        <MapComponent />
                    </Card>
                </Zoom>
            </Container>            
        </>
    );
};

export default Listener;
