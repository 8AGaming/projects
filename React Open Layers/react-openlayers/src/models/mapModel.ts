// With God's Help

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM.js";

import "ol/ol.css";
import { mapType } from "../types/types";

export const mapModel = (current: mapType) =>
  new Map({
    target: current,
    layers: [
      new TileLayer({
        source: new OSM({}),
      }),
    ],
    view: new View({
      center: [3853975.3191505666, 3719839.9267464043],
      zoom: 12,
    }),
  });
