import React, { useState, lazy } from "react";
import { useTranslation } from "react-i18next";
import { Container, Slide, Card, Box, CardMedia, Zoom } from "@mui/material";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import ForwardIcon from "@mui/icons-material/Forward";
import { LS } from "../../classes/ls";

const MapComponent = lazy(() => import("../MapComponent/MapComponent"));

const useStyles = makeStyles((theme: any) => ({
    map: {
        margin: 0,
        width: 500,
        height: 350,
        borderRadius: "10px",
        overflow: "hidden",
        minHeight: 350,
        position: "absolute",
        transition: "all .15s ease-in-out",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        right: 0,
        boxShadow: "0 1px 4px 0 rgba(0,0,0,.15)",
    },
    mapWidth: {
        width: "100%",
        height: "100%",
    },
    fullscreen: {
        height: 350,
        display: "flex",
        justifyContent: "flex-start",
        margin: "80px 0 0 0 !important",
        position: "relative",
        minHeight: 350,
        width: "100%",
        transition: "all .3s ease-in-out",
    },
    info: {
        position: "absolute",
        width: "calc(100% - 530px)",
        height: 350,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.25rem",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing: "0.0075em",
    },
    info2: {
        position: "absolute",
        width: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        background: "rgb(241, 243, 244)",
        zIndex: 10,
        margin: "15px 0 15px 15px",
        boxShadow: "0 1px 4px 0 rgba(0,0,0,.15)",
    },
    info3: {
        fontSize: 40,
        color: "#555555",
        lineHeight: "50px",
        maxWidth: 580,
    },
    infoHeight: {
        height: 800,
    },
    arrow: {
        color: "rgba(85, 85, 85, 0.5)",
        fontSize: 45,
        marginLeft: 28,
    },
}));

const Guide = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    const [fullscreen, setFullscreen] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const [state, setState] = useState<boolean>(
        LS.get("settings") ? LS.get("settings").user === "guide" : false
    );

    const clickOnMap = () => {
        if (first) {
            setFirst(false);
            setFullscreen(true);            
        }
    }

    return (
        <Container>
            <Box
                my={2}
                className={
                    fullscreen
                        ? clsx(classes.infoHeight, classes.fullscreen)
                        : classes.fullscreen
                }
            >
                <Slide
                    direction="right"
                    in={state}
                    timeout={{ enter: 600, exit: 300 }}
                    mountOnEnter
                    unmountOnExit
                >
                    <div className={classes.info}>
                        <div className={classes.info3}>
                            {t("select_a_zone")}
                        </div>
                        <ForwardIcon className={classes.arrow} />
                    </div>
                </Slide>

                <Zoom
                    in={state}
                    // style={{ transitionDelay: state ? "100ms" : "0ms" }}
                    timeout={{ enter: 600, exit: 300 }}
                >
                    <Card
                        className={
                            fullscreen
                                ? clsx(classes.mapWidth, classes.map)
                                : classes.map
                        }
                    >
                        {first ? (
                            <CardMedia
                                component="img"
                                height="100%"
                                image="build/images/logo-map.png"
                                alt="map"
                                onClick={clickOnMap}
                            />
                        ) : (
                            <MapComponent />
                        )}
                    </Card>
                </Zoom>
            </Box>
        </Container>
    );
};

export default Guide;
