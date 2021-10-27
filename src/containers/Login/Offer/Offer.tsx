import React, {useEffect} from "react";
import { useTranslation } from "react-i18next";
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
// import { withStyles } from "@mui/material";
import { makeStyles, withStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: any) => ({
    card: {
        zIndex: 1300,
        position: "fixed"
    },
    consent: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: 300,
        fontSize: 14,
        lineHeight: "14px",
        color: "#000000",
        textAlign: "left",
        paddingTop: "15px",
        marginLeft: "20px"
    },
    link: {
        color: "#613BE7",
        cursor: "pointer",
        fontWeight: 500,
    }
}));

// @ts-ignore
const RedCheckbox: any = withStyles({
    root: {
        color: "#ff0000",
        '&$checked': {
            color: "#707070",
        },
    }
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);


const Offer = (props: any) => {

    const classes = useStyles();
    const { t } = useTranslation();

    const [state, setState] = React.useState<any>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.checked);
        props.setChecked(event.target.checked);
    };
    
    return (
        <div className={classes.consent}>

            <RedCheckbox
                checked={state.consent}
                onChange={handleChange}
                name="consent"
            />

            <span className={classes.text}>
                Я даю свое согласие на передачу в ООО "Битник" данных,
                в том числе моей персональной информации, указанных в
                <a
                    download="agreements.pdf"
                    href="https://bitnic.ru/doc/agreements.pdf"
                    className={classes.link}
                >
                    {` настоящей форме`}
                </a>
                , и согласен с тем,
                что указанные данные, в том числе моя персональная информация,
                будут обрабатываться на условиях, определенных
                <a
                    download="confidential.pdf"
                    href="https://bitnic.ru/doc/confidential.pdf"
                    className={classes.link}
                >
                    {` Политикой конфиденциональности`}
                </a>.
            </span>
        </div>
    );
};

export default Offer;
