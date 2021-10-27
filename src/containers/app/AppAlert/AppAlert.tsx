import React, {useEffect} from "react";
import { useTranslation } from "react-i18next";
import { Alert, Slide } from "@mui/material";

interface IAlert {
    alert: boolean
    message: string
    close: Function
    severity: "success" | "info" | "warning" | "error"
}

const AppAlert = (props: IAlert) => {
    
    const { t } = useTranslation();
    
    useEffect(() => {
        if(props.alert){
            setTimeout(() => {
                props.close(false);
            }, 3500)            
        }
    },[props.alert])

    return (
        <Slide direction="left" in={props.alert} mountOnEnter unmountOnExit>
            <div style={{position: "fixed", zIndex: 1300, top: 8, right: 20}}>
                <Alert variant="filled" severity={props.severity}>
                    { props.message }
                </Alert>
            </div>
        </Slide>
    );
};

export default AppAlert;
