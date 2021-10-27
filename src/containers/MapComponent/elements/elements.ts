import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";

export const imageCircle = {
    radius: 6,
    fill: new Fill({color: 'red'}),
    stroke: new Stroke({
        color: [0,0,0], width: 2
    })
}