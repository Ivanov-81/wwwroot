import React, {lazy, useEffect, useState} from "react";
import {
    Box,
    Tab,
    Tabs,
    Container,
    Typography
} from "@mui/material";
import Badge, { BadgeProps } from '@mui/material/Badge';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { IUser } from "../MapComponent/map-types";
import { makeStyles } from "@material-ui/styles";
import { styled } from '@mui/material/styles';
import ProfileUser from "./ProfileUser/ProfileUser";
import AppAlert from "../app/AppAlert/AppAlert";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    className?: any
}

const useStyles = makeStyles((theme: any) => ({
    container: {
        display: "flex !important",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        marginTop: 15
    },
    tabPanel: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
}));

function TabPanel(props: TabPanelProps) {
    
    const { children, value, index, ...other } = props;
    
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box component="div" sx={{ p: 3 }}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`
    };
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -40,
        top: -10,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
    box: {
        height: 50
    }
}));

const Profile = () => {
    
    const { t } = useTranslation();
    const classes: any = useStyles();
    const user = useSelector<IUser>((store: any) => store.app.user);

    const [alert, setAlert] = useState<boolean>(false);
    const [value_tab, setValueTab] = useState<number>(0);

    const handlerChange = (event: React.SyntheticEvent, newValue: number) => {
        setValueTab(newValue);
    };
    
    useEffect(() => {
        console.log(user);
        // @ts-ignore
        setAlert(!user.filled);
    }, []);
    
    return (
        <>
            <AppAlert
                alert={alert}
                severity={"error"}
                message={t("your_profile")}
                close={setAlert}
            />
            <Container className={classes.container}>
                <Box className={classes.box} sx={{width: '100%'}}>
                    <Tabs
                        value={value_tab}
                        onChange={handlerChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                        <Tab label={t('main')} {...a11yProps(0)} />
                        {// @ts-ignore
                            user.filled
                                ? <Tab label={t('profile')} {...a11yProps(1)} />
                                : <Tab
                                    label={t('profile')}
                                    {...a11yProps(1)}
                                    icon={<StyledBadge badgeContent={"!"} color="secondary" style={{ position: "absolute" }} />}
                                />
                        }
                        <Tab label={t('statistics')} {...a11yProps(2)} />
                        <Tab label={t('reviews')} {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <TabPanel value={value_tab} index={0} className={classes.tabPanel}>
                    {t('main')}
                </TabPanel>
                <TabPanel value={value_tab} index={1} className={classes.tabPanel}>
                    {t('profile')}
                    <ProfileUser />
                </TabPanel>
                <TabPanel value={value_tab} index={2} className={classes.tabPanel}>
                    {t('statistics')}
                </TabPanel>
                <TabPanel value={value_tab} index={3} className={classes.tabPanel}>
                    {t('reviews')}
                </TabPanel>
            </Container>
        </>
    );
};

export default Profile;
