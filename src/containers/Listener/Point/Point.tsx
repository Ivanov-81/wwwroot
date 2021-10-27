import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles, withStyles } from "@material-ui/styles";
import {useDispatch, useSelector} from "react-redux";
import { Collapse, Card, Zoom, CircularProgress, TextField, Button } from "@mui/material";
import RoomRoundedIcon from "@mui/icons-material/RoomRounded";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import {ERROR_COLOR, ERROR_GREY, GREEN_COLOR, GREEN_COLOR_1} from "../../../ts/constants";

const useStyles = makeStyles((theme: any) => ({
    point: {
        
    },
    p: {
        marginBlockStart: "0.5em",
        marginBlockEnd: "0.5em"
    },
    block: {
        width: "calc(100% - 6px)",
        height: 130,
        border: "3px dashed #DDDDDD",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 1px 4px 0 rgba(0,0,0,.15)",
        marginTop: 10
    },
    hint: {
        position: "relative",
        fontSize: 18,
        fontWeight: 400,
        color: ERROR_GREY,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        textAlign: "center"
    },
    label: {
        position: "absolute",
    },
    loader: {
        position: "absolute",
        right: 15,
        top: 15,
    },
    file: {
        height: "100%",
        padding: "40px 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5
    },
    info: {
        position: "relative",
        width: "100%",
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing: "0.0075em",
        right: 0,
    },
    nameLabel: {
        width: "100%",
        height: 35,
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight: 600,
        lineHeight: "14px",
        letterSpacing: "0.0075em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        color: "rgb(85, 85, 85)",
        margin: "14px 0 0 0"
    },
    input: {
        position: "relative",
        display: "flex",
        alignSelf: "flex-start",
        fontWeight: 700,
        fontSize: "16px",
        textAlign: "left",
        color: "#000",
        margin: "0 !important",
        width: "100%",
        height: 48,
        "& div": {
            height: 48,
            "& div": {
                height: 48,
                padding: "10px 14px"
            }
        },
        "& p": {
            position: "absolute",
            top: 40,
            background: "#fff",
            padding: "0 5px",
        }
    },
    blockButtons: {
        margin: "25px 0 0 0",
    },
    clear: {
        background: "#FFF",
        border: `1px solid ${GREEN_COLOR}`,
        color: "#444",
        textTransform: "none",
        marginRight: 15,
        "&:hover": {
            background: "#FFF",
        }
    },
    download: {
        background: GREEN_COLOR,
        color: "#444",
        textTransform: "none",
        "&:hover": {
            background: GREEN_COLOR,
        }
    },
}));

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#EBEBEB',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#EBEBEB',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#EBEBEB',
            },
            '&:hover fieldset': {
                borderColor: '#EBEBEB',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#EBEBEB',
            },
        },
    },
})(TextField);

const Point = () => {

    const dropzone = useRef(null);
    const input_file = useRef(null);    
    
    const classes = useStyles();
    const { t } = useTranslation();
    const dispatch: any = useDispatch();
    const point = useSelector((store: any) => store.map.point);

    const [file, setFile] = useState<any>(null);
    const [timer, setTimer] = useState<number | null>(null);
    const [visible, setVisible] = useState<boolean>(false);

    const [text, setText] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const [style, setStyle] = useState<any>({color: ERROR_GREY});

    const [loader, setLoader] = useState<boolean>(false);
    const [done, setDone] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [errorName, setErrorName] = useState<boolean>(false);
    const [helperName, setHelperName] = useState<string>("");

    const [duration, setDuration] = useState<string>("");
    const [errorDuration, setErrorDuration] = useState<boolean>(false);
    const [helperDuration, setHelperDuration] = useState<string>("");

    const [cut_duration, setCutDuration] = useState<boolean>(false);

    const selectedFile = (event: any) => {
        if (typeof event.target.files[0] !== "undefined") {
            fileCheck(event.target.files[0]);
        } else {
            setFile(null);
        }
    };

    const fileCheck = (fl: any) => {

        clearTimer();

        let inp: any = input_file.current;

        if (fl.type !== "audio/mpeg") {

            if(visible) {
                setVisible(false);
                setFile(null);
            }

            // не удалять, странный но вроде рабочий вариант
            // очистки input file
            inp.innerHTML = inp.innerHTML;

            setText(t("unsupported_file_format"));
            setError(true);
            setStyle({color: ERROR_COLOR});

            let tm: any = setTimeout(() => {
                if(timer) {
                    setText(t("upload_audio_file"));
                    setError(false);
                    setStyle({color: ERROR_GREY});
                }
            }, 5000);

            setTimer(tm)

            return
        }

        if (fl.size === 0) {

            // не удалять, странный но вроде рабочий вариант
            // очистки input file
            inp.innerHTML = inp.innerHTML;

            setText(t("something_wrong_with_the_file"));
            setError(false);
            setStyle({color: ERROR_COLOR});

            let tm: any = setTimeout(() => {
                if(timer) {
                    setText(t("upload_audio_file"));
                    setError(false);
                    setStyle({color: ERROR_GREY});
                }
            }, 5000);

            setTimer(tm)

            return
        }

        setFile(fl);
        
        setName(fl.name);

        // getViewFile(fl)

    }

    const clearTimer = () => {
        if(timer) {
            clearTimeout(timer);
            setTimer(null);
        }
    }

    const onDrop = (ev: any) => {
        ev.preventDefault();
        ev.stopPropagation();
        fileCheck(ev.dataTransfer.files[0]);
    }

    const initDropZone = () => {

        let dz: any = dropzone.current;

        dz.addEventListener('dragover', function (e: any) {
            e.preventDefault()
        });

        dz.addEventListener('drop', function (e: any) {
            e.preventDefault();
            e.stopPropagation();
            onDrop(e);
        });

    }

    const handlerChangeInputText = (e: any): void => {

        switch (e.target.name) {

            case "name": {
                setName(e.target.value);
                break;
            }
            case "duration": {

                let num = editNumber(e.target.value)

                if (num.length === 2) {
                    if (num[1].length < 5) {
                        setDuration(num.join(":"));
                    }
                } else {
                    setDuration(num.join(":"));
                }
                break;
            }
            default: {
            }

        }

    };

    const handlerFocusInputText = (e: any): void => {

        switch (e.target.name) {

            case "name": {
                setErrorName(false);
                setHelperName("");
                break;
            }
            case "duration": {
                setErrorDuration(false);
                setHelperDuration("");
                break;
            }
            default: {
            }

        }

    };

    const editNumber = (target: string) => {

        let num: any = target.replace(/[^;^:0-9]/gim, '')

        num = num.replace(/;/, ':')

        if (num.indexOf("::") !== -1) {
            num = num.split("::").join(":")
        }

        if (cut_duration) {
            if (num.split(":").length > 2) {
                if (num.slice(-1) === ":") {
                    num = num.slice(0, -1)
                }
            }
        }

        if (num.indexOf(":") !== -1) {
            setCutDuration(true)
        } else {
            setCutDuration(false)
        }

        return num.split(":")
    }

    useEffect(() => {
        setText(t("upload_audio_file"));
        setError(false);
        initDropZone();
        // dispatch(showHidePlayer(false))
    }, [])

    useEffect(() => {
        if (file) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [file])

    return (
        <>
            <span className={classes.point}>
                {
                    point.address.road
                        ? point.address.road
                        : point.address.neighbourhood
                }
                {
                    point.address.house_number &&
                    ` д.${point.address.house_number}`
                }
            </span>
            {
                point.address.amenity &&
                    <p className={classes.p}>
                        {point.address.amenity}
                    </p>
            }
            {
                point.address.tourism &&
                    <p className={classes.p}>
                        {point.address.tourism}
                    </p>
            }
            <p className={classes.p}>
                {`Индекс: ${point.address.postcode}`}
            </p>

            {
                point &&
                    <Collapse in={true}>
                        <Card className={classes.block}>
                            <input
                                ref={input_file}
                                form="send_file"
                                id="guide_file"
                                type="file"
                                style={{display: "none"}}
                                onChange={selectedFile}
                                accept=".mp3"
                            />
                            <label
                                ref={dropzone}
                                htmlFor="guide_file"
                                className={classes.hint}
                                id="dropzone"
                            >
                                <Zoom in={!visible}>
                                    <span
                                        style={style}
                                        className={classes.label}
                                    >
                                        {
                                            error
                                                ? t("unsupported_file_format")
                                                : t("upload_audio_file")
                                        }
                                    </span>
                                </Zoom>

                                <Zoom in={loader}>
                                    <div
                                        className={classes.loader}
                                    >
                                        <CircularProgress size={24}/>
                                    </div>
                                </Zoom>

                                <Zoom in={done}>
                                    <div
                                        className={classes.loader}
                                    >
                                        <RoomRoundedIcon style={{color: GREEN_COLOR_1}}/>
                                    </div>
                                </Zoom>

                                <Zoom in={visible}>
                                    <div className={classes.file}>
                                        <img
                                            alt="track"
                                            src="build/images/track.png"
                                            style={{width: 50, height: 50}}
                                        />
                                        <span style={{fontSize: 14, padding: "0 12px"}}>
                                            {
                                                file && file.name
                                            }
                                        </span>
                                    </div>
                                </Zoom>
                            </label>
                        </Card>
                    </Collapse>
            }

            {
                <Collapse
                    in={visible}
                    timeout={{enter: 600, exit: 300}}
                    mountOnEnter
                    unmountOnExit
                >
                    <div className={classes.info}>

                        <span className={classes.nameLabel}>{t("file_name")}</span>

                        <CssTextField
                            error={errorName}
                            helperText={helperName}
                            name="name"
                            type="text"
                            value={name}
                            className={classes.input}
                            margin="normal"
                            variant="outlined"
                            onChange={handlerChangeInputText}
                            onFocus={handlerFocusInputText}
                            autoComplete="name"
                            InputProps={{
                                inputProps: {
                                    maxLength: 150,
                                },
                            }}

                        />

                        <span
                            className={classes.nameLabel}
                        >
                            {t("excursion_duration")}
                            <i
                                style={{
                                    marginLeft: 10,
                                    color: "#999",
                                    fontSize: "10px",
                                    paddingTop: 2
                                }}
                            >
                                ({t("exam")}: 15:45)
                            </i>
                        </span>

                        <CssTextField
                            error={errorDuration}
                            helperText={helperDuration}
                            placeholder="15:45"
                            name="duration"
                            type="text"
                            value={duration}
                            className={classes.input}
                            margin="normal"
                            variant="outlined"
                            onChange={handlerChangeInputText}
                            onFocus={handlerFocusInputText}
                            autoComplete="duration"
                            autoFocus
                            InputProps={{
                                inputProps: {
                                    maxLength: 15,
                                },
                            }}

                        />

                        {/*<div className={classes.nameLabel} style={{paddingLeft: 25}}>*/}
                        {/*    <span style={{marginRight: 5}}>{t("zone")}</span>*/}
                        {/*    <Zoom in={[].length === 0}>*/}
                        {/*        <AddCircleOutline style={{transform: "rotate(45deg)", color: ERROR_COLOR}} />*/}
                        {/*    </Zoom>*/}
                        {/*    <Zoom in={[].length !== 0}>*/}
                        {/*        <CheckCircleOutlineIcon style={{color: GREEN_COLOR_1}} />*/}
                        {/*    </Zoom>*/}
                        {/*</div>*/}

                        {/*<div className={classes.blockButtons}>*/}
                        {/*    <Button*/}
                        {/*        type="reset"*/}
                        {/*        form="send_file"*/}
                        {/*        className={classes.clear}*/}
                        {/*    >*/}
                        {/*        {t("clear")}*/}
                        {/*    </Button>*/}
                        {/*    <Button*/}
                        {/*        type="submit"*/}
                        {/*        form="send_file"*/}
                        {/*        className={classes.download}*/}
                        {/*        disabled={loader}*/}
                        {/*    >*/}
                        {/*        {*/}
                        {/*            loader &&*/}
                        {/*            <CircularProgress size={24} style={{position: "absolute"}}/>*/}
                        {/*        }*/}
                        {/*        {t("download")}*/}
                        {/*    </Button>*/}
                        {/*</div>*/}

                    </div>
                </Collapse>
            }
            
        </>
    )
};

export default Point;
