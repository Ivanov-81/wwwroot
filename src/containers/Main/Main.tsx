import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Fade, Zoom, Grid, Card,
    Button, Select, MenuItem, CardMedia,
    InputBase, FormControl, Container
} from "@mui/material";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: any) => ({
    wrapSearchBlock: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 860,
        height: 110,
        borderRadius: 8,
        zIndex: 2,
        backgroundColor: "rgba(0,0,0,0.3)"
    },
    searchBlock: {
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: 800,
        height: 50,
        border: "1px solid #ffffff",
        borderRadius: 5,
        zIndex: 2
    },
    search: {
        padding: "2px 15px",
        border: "1px solid #ffffff !important",
        textTransform: "none",
        height: 48,
        width: 120,
        color: "#ffffff !important",
        marginRight: "1px !important"
    },
    input: {
        color: "#ffffff !important",
        marginLeft: "15px !important",
    },
    formControl: {
        width: 200,
        height: 48,
        marginRight: "1px !important",
        "& div": {
            color: "#ffffff",
            height: 48,
            "& div": {
                height: 20,
                paddingRight: 32,
                paddingLeft: 10,
                padding: "8px 4px",
            },
        },
        "& select": {
            color: "#ffffff",
            fontSize: "14px",
        },
        "& svg": {
            color: "#ffffff",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#ffffff",
            },
            "&:hover fieldset": {
                borderColor: "#ffffff",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#ffffff",
                borderWidth: "1px",
            },
        },
    },
    cardMedia: {
        maxWidth: 350,
        maxHeight: 350
    }
}));

const Main = () => {

    const classes = useStyles();
    const { t } = useTranslation();
    
    const [search, setSearch] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [cities, setCities] = useState<any>([
        {id: 0, city: "moscow", photo: "./build/images/msk.png"},
        {id: 1, city: "st._petersburg", photo: "./build/images/spb.png"},
        {id: 2, city: "veliky_novgorod", photo: "./build/images/nsk.png"},
    ]);

    const handlerChangeInputText = (e: any): void => {

        switch (e.target.name) {

            case "search": {
                setSearch(e.target.value);
                break;
            }
            default: {
            }

        }

    };
    
    const switchCity = (e: any) => {
        setCity(e.target.value);
    }
    
    const clickOnSearch = () => {
        
    }
    
    return (
        <>
            {/*<Zoom*/}
            {/*    in={true}*/}
            {/*    // style={{ transitionDelay: '10ms' }}*/}
            {/*    timeout={{ enter: 150, exit: 100 }}*/}
            {/*>*/}
            <Fade in={true}>
                <div
                    style={{
                        height: 500,
                        width: "100vw",
                        backgroundImage: "url(build/images/logo_map.jpg)",
                        position: 'relative',
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "rgba(0,0,0,0.6)",
                            position: "absolute",
                            top: 49,
                            left: 0,
                            width: "100%",
                            height: "calc(100% - 49px)"
                        }}
                    />
                    <div className={classes.wrapSearchBlock}>
                        <div className={classes.searchBlock}>
                            <div style={{width: 450}}>
                                
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    name="search"
                                    value={search}
                                    autoFocus={true}
                                    fullWidth={true}
                                    placeholder={t("enter_text")}
                                    onChange={handlerChangeInputText}
                                    autoComplete="new-password"
                                    className={classes.input}
                                    inputProps={{
                                        maxLength: 100
                                    }}
                                />
                                
                            </div>
                            <div>
                                <FormControl
                                    variant="outlined"
                                    className={classes.formControl}
                                >
                                    <Select
                                        value={city}
                                        onChange={switchCity}
                                        displayEmpty
                                        renderValue={(selected: any) => {
                                            if (selected.length === 0) {
                                                return <em>{t("select_city")}</em>;
                                            }
                                            return cities[selected].city;
                                        }}
                                    >
                                        <MenuItem
                                            value=""
                                        >
                                            <em>{t("select_city")}</em>
                                        </MenuItem>
                                        {cities.map((item: any) => {
                                            return (
                                                <MenuItem
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {t(item.city)}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                                <Button
                                    className={classes.search}
                                    onClick={clickOnSearch}
                                >
                                    {t("search")}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>
            <Container>
                <Box sx={{ flexGrow: 1, paddingTop: 10, paddingBottom: 10 }}>
                    <Grid container spacing={1}>
                        <Grid container item spacing={3}>
                            <Grid item xs={12} md={4} lg={4}>
                                <Zoom
                                    in={true}
                                    style={{ transitionDelay: '100ms' }}
                                >
                                    <Card sx={{ maxWidth: 350, height: 350 }}>
                                        <CardMedia
                                            component="img"
                                            height="350"
                                            image={cities[0].photo}
                                            alt={t(cities[0].city)}
                                            className={classes.cardMedia}
                                        />
                                    </Card>
                                </Zoom>
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <Zoom
                                    in={true}
                                    style={{ transitionDelay: '200ms' }}
                                >
                                    <Card sx={{ maxWidth: 350, height: 350 }}>
                                        <CardMedia
                                            component="img"
                                            height="350"
                                            image={cities[1].photo}
                                            alt={t(cities[1].city)}
                                            className={classes.cardMedia}
                                        />
                                    </Card>
                                </Zoom>
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <Zoom
                                    in={true}
                                    style={{ transitionDelay: '300ms' }}
                                >
                                    <Card sx={{ maxWidth: 350, height: 350 }}>
                                        <CardMedia
                                            component="img"
                                            height="350"
                                            image={cities[2].photo}
                                            alt={t(cities[2].city)}
                                            className={classes.cardMedia}
                                        />
                                    </Card>
                                </Zoom>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default Main;
