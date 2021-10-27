import React, {lazy, useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import {
    Container,
    List,
    ListItem,
    Collapse,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Link,
    FormControlLabel,
    TextField
} from "@mui/material";
import clsx from "clsx";
import { styled } from "@mui/material/styles";
import Switch, {SwitchProps} from "@mui/material/Switch";
import { makeStyles, withStyles } from "@material-ui/styles";
import { TransitionGroup } from 'react-transition-group';
import { useHistory, useLocation } from "react-router-dom";
import { addUser, switchAuth } from "../../actions/actionCreator";
import { useDispatch } from "react-redux";

const AppAlert = lazy(() => import("../app/AppAlert/AppAlert"));
const Offer = lazy(() => import("./Offer/Offer"));

const useStyles = makeStyles((theme: any) => ({
    container: {
        display: "flex !important",
        flexDirection: "column",
        alignItems: "center",
        height: "70vh",
        marginTop: 100
    },
    switch: {
        position: "relative",
        display: "flex",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0)",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
        maxWidth: 460,
        "& span": {
            textDecoration: "none"
        },
        "& label": {
            margin: 0,
            minWidth: "100%",
            borderRadius: 4,
            boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
        },
    },
    span: {
        position: "absolute",
        color: "rgba(0, 0, 0, 0.87)",
        minWidth: "50%",
        height: "100%",
        cursor: "pointer",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2
    },
    card: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 26,
    },
    input: {
        position: "relative",
        display: "flex",
        alignSelf: "flex-start",
        fontWeight: 700,
        fontSize: "16px",
        textAlign: "left",
        color: "#000",
        margin: "0 0 18px 0 !important",
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
        margin: 0,
        width: "50%",
        height: "100%",
        borderRadius: 4,
        transitionDuration: '300ms',
        background: "rgb(207, 232, 252)",
        "& input": {
            width: "50%",
            left: 0,
            cursor: `${value}`
        },
        '&.Mui-checked': {
            transform: 'translateX(230px)',
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

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#c2c2c2',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#c2c2c2',
        },
        '& .MuiOutlinedInput-root': {
            height: 52,
            '& input': {
                height: 20,
            },
            '& fieldset': {
                borderColor: '#c2c2c2',
                top: -3
            },
            '&:hover fieldset': {
                borderColor: '#c2c2c2',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#c2c2c2',
            },
        },
    },
})(TextField);

interface RenderItemOptions {
    item: any
}

let elems: any = [
    {name: "login", name_ru: "Логин", type: "text", maxLength: 50},
    {name: "email", name_ru: "E-mail", type: "text", maxLength: 50},
    {name: "password", name_ru: "Пароль", type: "password", maxLength: 64}
];

const Login = () => {
    
    const { t } = useTranslation();
    const classes: any = useStyles();
    const history: any = useHistory();
    const dispatch: any = useDispatch();
    
    const [alert, setAlert] = useState<boolean>(false);
    const [offer, setOffer] = useState<boolean>(false);
    const [state, setState] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(false);
    const [inputsInLogin, setInputsInLogin] = useState(elems);
    const [dis, setDis] = React.useState<any>(false);
    
    const [values, setValues] = React.useState<any>({
        login: "",
        email: "",
        password: "",
        password2: ""
    });
    
    const [errors, setErrors] = React.useState<any>({
        login: "",
        email: "",
        password: "",
        password2: ""
    });
    
    const [helpers, setHelpers] = React.useState<any>({
        login: "",
        email: "",
        password: "",
        password2: ""
    });


    const handlerChangeInputText = (e: any): void => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handlerFocusInputText = (e: any): void => {
        console.log(e.target.name, e.target.value)
    };

    const handlerErrorText = (e: any): void => {
        setErrors({ ...errors, [e.target.name]: e.target.value });
    };

    const handlerHelperText = (e: any): void => {
        setHelpers({ ...helpers, [e.target.name]: e.target.value });
    };
    
    const handleAddElem = () => {
        elems.push({
            name: "password2",
            name_ru: "Повторите пароль",
            type: "password",
            maxLength: 64
        })
    };
    
    const handleDelElem = () => {
        elems.pop();
    };

    const switchRegsAuth = (bool: boolean) => {
        setState(bool);
        if(bool) handleAddElem();
        else handleDelElem();
    }
    
    const signIn = () => {
        dispatch(switchAuth(true));
        dispatch(addUser({
            name: "Олег",
            surname: "Иванов",
            patronymic: "Владимирович",
            email: "ivanov-81@mail.ru",
            role: "guide",
            filled: true
        }))
        history.push("/profile");
    }
    
    const regs = () => {
        setOffer(true);
    }
    
    const registration = () => {
        if(!checked) {
            setAlert(true);
            return
        }
        setDis(true);
        
        setTimeout(() => {
            handleDelElem();
            history.push("/profile");
            dispatch(switchAuth(true));
            dispatch(addUser({
                email: "ivanov-81@mail.ru",
                role: "guide",
                filled: false
            }))
        }, 1000)
    }
    
    useEffect(() => {
        console.log(inputsInLogin)
    },[inputsInLogin])

    const renderItem = ({ item }: RenderItemOptions) => {
        return (
            <CssTextField
                error={errors[item.name]}
                helperText={helpers[item.name]}
                name={item.name}
                type={item.type}
                label={item.name_ru}
                value={values[item.name]}
                className={classes.input}
                margin="normal"
                variant="outlined"
                onChange={handlerChangeInputText}
                onFocus={handlerFocusInputText}
                autoComplete="new-password"
                InputProps={{
                    inputProps: {
                        maxLength: `${item.maxLength}`,
                        autoComplete: "off"
                    },
                }}
            />
        );
    }

    return (
        <>
            <AppAlert
                alert={alert}
                severity={"error"}
                message={t("needs_consent")}
                close={setAlert}
            />
            <Container className={classes.container}>
    
                {
                    !offer ?
                        <>
                            <div className={classes.switch}>
                                <Link
                                    component="span"
                                    onClick={() => switchRegsAuth(false)}
                                    className={clsx(
                                        classes.span,
                                        "no-select"
                                    )}
                                    style={{ left: 0, color: "#555555" }}
                                >
                                    {t("auth")}
                                </Link>
    
                                <Link
                                    component="span"
                                    onClick={() => switchRegsAuth(true)}
                                    className={clsx(
                                        classes.span,
                                        "no-select"
                                    )}
                                    style={{ right: 0, color: "#555555" }}
                                >
                                    {t("regs")}
                                </Link>
    
                                <FormControlLabel
                                    control={
                                        <IOSSwitch
                                            checked={state}
                                        />
                                    }
                                    label=""
                                />
                            </div>
                            <Card
                                sx={{
                                    maxWidth: 408,
                                    minWidth: 408
                                }}
                                className={classes.card}
                            >
                                <CardMedia
                                    component="img"
                                    alt="dashed-line"
                                    height="140"
                                    image={
                                        state
                                            ? "/build/images/link.svg"
                                            : "/build/images/target.svg"
                                    }
                                    style={{
                                        height: 80,
                                        width: 80,
                                        marginTop: 18
                                    }}
                                />
                                <CardContent style={{width: "80%"}}>
                                    <TransitionGroup>
                                        {inputsInLogin.map((item: any, ind: number) => (
                                            <Collapse key={ind}>
                                                {
                                                    renderItem({ item })
                                                }
                                            </Collapse>
                                        ))}
                                    </TransitionGroup>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        onClick={
                                            state
                                                ? regs
                                                : signIn
                                        }
                                    >
                                        {
                                            state
                                                ? t("regs")
                                                : t("auth")
                                        }
                                    </Button>
                                </CardActions>
                            </Card>
                        </>
                        :
                        <Card
                            sx={{
                                maxWidth: 408,
                                minWidth: 408
                            }}
                            className={classes.card}
                        >
                            <CardContent style={{width: "100%"}}>
                                <Typography component="div" variant="body2" color="text.secondary">
                                    <Offer
                                        checked={checked}
                                        setChecked={setChecked}
                                    />
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    onClick={registration}
                                    disabled={dis}
                                >
                                    {t("register")}
                                </Button>
                            </CardActions>
                        </Card>
                }
    
            </Container>
        </>
    );
};

export default Login;
