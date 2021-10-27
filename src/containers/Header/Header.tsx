import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { LS } from "../../classes/ls";
import { useHistory, useLocation } from "react-router-dom";
import {
    makeStyles
} from "@material-ui/styles";
// import MenuIcon from '@mui/icons-material/Menu';
import {
    Select,
    Link,
    Button,
    AppBar,
    Slide,
    Toolbar,
    MenuItem,
    Container,
    Typography,
    IconButton,
    FormControl,
    FormControlLabel,
    Menu,
    Zoom,
    Stack
} from "@mui/material";
import {addUser, changeLanguage, switchAuth} from "../../actions/actionCreator";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';

const useStyles = makeStyles((theme: any) => ({
    appBar: {
        height: 130,
        backgroundColor: "rgb(255, 255, 255) !important",
        "& .MuiToolbar-regular": {
            height: "100%",
            color: "#212529",
            boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"
        }
    },
    formControl: {
        position: "absolute",
        top: 5,
        right: 33,
        width: 65,
        height: 38,
        "& div": {
            color: "#cccccc",
            height: 38,
            "& div": {
                height: 20,
                paddingRight: 32,
                paddingLeft: 10,
                padding: "8px 4px",
            },
        },
        "& select": {
            color: "#cccccc",
            fontSize: "14px",
        },
        "& svg": {
            color: "#cccccc",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#cccccc",
            },
            "&:hover fieldset": {
                borderColor: "#cccccc",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#cccccc",
                borderWidth: "1px",
            },
        },
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 32,
    },
    title: {
        flexGrow: 1,
    },
    switch: {
        display: "flex",
        position: "absolute",
        left: 0,
        top: 130,
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        borderBottom: "1px solid #ffffff",
        marginLeft: "0px !important",
        justifyContent: "flex-end",
        alignItems: "center",
        zIndex: 2,
        "& span": {
            textDecoration: "none"
        },
        "& label": {
            margin: 0,
            width: 300
        },
    },
    span: {
        color: "rgba(0, 0, 0, 0.87)",
        position: "absolute",
        top: 0,
        height: "100%",
        zIndex: 1,
        cursor: "pointer",
        textDecoration: "none",
        width: 150,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    entry: {
        padding: "2px 15px !important",
        border: "1px solid #212529 !important",
        textTransform: "none",
        margin: "0 0 0 5px !important",
        height: 38,
        width: 120,
        color: "#212529 !important",
        lineHeight: "14px !important"
    },
    container: {
        flexDirection: "row",
        display: "flex !important",
        justifyContent: "center",
        alignItems: "center"
    },
    div: {
        flexDirection: "row",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    lang: {
        position: "absolute",
        top: 5,
        right: 16
    }
}));

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme, value }) => ({
    width: "100%",
    height: 48,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        width: 150,
        transitionDuration: '300ms',
        "& input": {
            width: 150,
            left: 0,
            cursor: `${value}`
        },
        '&.Mui-checked': {
            transform: 'translateX(150px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0)', //? '#2ECA45' : '#65C466'
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#fafafa',  //#33cf4d
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        display: value ? "block" : "none",
        boxSizing: 'border-box',
        width: 120,
        height: 30,
        borderRadius: 5,        
        marginTop: 7,
        background: "inherit"
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? "inherit" : "inherit",  //? '#E9E9EA' : '#39393D'
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const Header = () => {
    
    const classes: any = useStyles();
    const dispatch: any = useDispatch();
    const history: any = useHistory();
    const location: any = useLocation();

    const { t, i18n } = useTranslation();

    const lang = useSelector((store: any) => store.app.language);
    const langs = useSelector((store: any) => store.app.languages);
    const auth = useSelector((store: any) => store.app.auth);
    
    const [thumb, setThumb] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(Boolean(anchorEl));
    const [state, setState] = useState<boolean>(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.checked);
    };

    const switchUser = (val: boolean): void => {
        setThumb(true);
        let str: string = "";
        setState(val);
        state ? str = "guide" : str = "listener";
        let obj = LS.get("settings");
        obj.user = str;
        LS.set("settings", obj);
        if (str === "guide") {
            // dispatch(addSong({}));
        }
        history.push(str);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleExit = () => {
        setTimeout(() => {
            dispatch(switchAuth(false));
            dispatch(addUser({
                email: "",
                role: "",
                filled: false
            }));
        },300)
        setOpen(false);
        history.push("/");
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlerProfile = () => {
        setOpen(false);
        history.push("/profile");
    };

    const clickOnLogo = () => {
        history.push("/");
        setThumb(false);
    };

    const chLanguage = (language: any) => {
        i18n.changeLanguage(language).then();
    };

    const switchLanguage = (ev: any) => {
        dispatch(changeLanguage(ev.target.value));
    };

    useEffect(() => {
        let ls = LS.get("settings");
        if (ls) {
            ls.user === "listener" ? setState(true) : setState(false);
        } else {
            setState(true);
        }
    }, []);

    useEffect(() => {
        chLanguage(lang);
    }, [lang]);
    
    return (
        <Slide
            direction="down"
            in={true}
            timeout={{ enter: 200, exit: 100 }}
            mountOnEnter
            unmountOnExit
        >
            <AppBar position="static" className={classes.appBar}>
                    <Toolbar style={{ height: "100%", alignItems: "flex-end", paddingBottom: 15 }}>
                        {/*<IconButton*/}
                        {/*    edge="start"*/}
                        {/*    className={classes.menuButton}*/}
                        {/*    color="inherit"*/}
                        {/*    aria-label="menu"*/}
                        {/*>*/}
                        {/*    <MenuIcon />*/}
                        {/*</IconButton>*/}
                        <Container className={classes.container}>
                            <Typography variant="h3" className={classes.title}>
                                <span
                                    style={{ cursor: "pointer"}}
                                    onClick={clickOnLogo}
                                >
                                    {t("title")}
                                </span>
                            </Typography>
                            <Stack
                                direction="row"
                                spacing={2}
                                style={{
                                    alignItems: "center", 
                                    justifyContent: "center"
                                }}
                            >
                                <div className={classes.lang}>
                                    <FormControl
                                        variant="outlined"
                                        className={classes.formControl}
                                    >
                                        <Select
                                            value={lang}
                                            onChange={switchLanguage}
                                        >
                                            {langs.map((item: any, ind: number) => {
                                                return (
                                                    <MenuItem
                                                        key={ind}
                                                        value={item.language}
                                                    >
                                                        {item.country}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                                {
                                    auth &&
                                    <div style={{ width: 109 }}>
                                        <IconButton
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={handleMenu}
                                            color="inherit"
                                            size="medium"
                                        >
                                            <AccountCircle fontSize="medium" />
                                        </IconButton>
                                        <Menu
                                            id="menu-appbar"
                                            anchorEl={anchorEl}
                                            anchorOrigin={{
                                                vertical: "top",
                                                horizontal: "right",
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: "top",
                                                horizontal: "right",
                                            }}
                                            open={open}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={handlerProfile}>
                                                {t("profile")}
                                            </MenuItem>
                                            <MenuItem
                                                onClick={handleExit}
                                            >
                                                {t("exit")}
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                }

                                {
                                    !auth &&
                                        <Button
                                            className={classes.entry}
                                            onClick={() => history.push("/login")}
                                        >
                                            {t("enter")}
                                        </Button>
                                }

                                {
                                    location.pathname !== "/login" &&
                                    location.pathname !== "/profile" &&
                                        <div className={classes.switch}>
                                            <Link
                                                component="span"
                                                onClick={() => switchUser(false)}
                                                className={clsx(
                                                    classes.span,
                                                    "no-select"
                                                )}
                                                style={{ right: 150, color: "#ffffff" }}
                                            >
                                                {t("guide")}
                                            </Link>
    
                                            <Link
                                                component="span"
                                                onClick={() => switchUser(true)}
                                                className={clsx(
                                                    classes.span,
                                                    "no-select"
                                                )}
                                                style={{ right: 0, color: "#ffffff" }}
                                            >
                                                {t("listener")}
                                            </Link>
    
                                            <FormControlLabel
                                                control={
                                                    <IOSSwitch
                                                        value={thumb}
                                                        checked={state}
                                                        onChange={handleChange}
                                                    />
                                                }
                                                label=""
                                            />
                                        </div>                                        
                                }
                                
                            </Stack>
                        </Container>
                    </Toolbar>
            </AppBar>
        </Slide>
    );
};

export default Header;