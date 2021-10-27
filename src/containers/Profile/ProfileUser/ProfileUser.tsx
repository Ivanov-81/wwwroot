import React, {useState, lazy, useEffect} from "react";
import { useTranslation } from "react-i18next";
import { Container } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import {useSelector} from "react-redux";
import {IUser} from "../../MapComponent/map-types";

const useStyles = makeStyles((theme: any) => ({
    container: {
        
    }
}));

const ProfileUser = () => {
    
    const { t } = useTranslation();
    const classes = useStyles();
    const user = useSelector<IUser>((store: any) => store.app.user);

    return (
        <>
            <Container>
    
            </Container>
        </>
    );
};

export default ProfileUser;
