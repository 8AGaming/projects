// With God's Help
import { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import { fromLonLat, transform } from "ol/proj";
import { setCoordinates } from "../store/coordinatesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Box, TextField, Typography } from "@mui/material";
import "ol/ol.css";
import { mapModel } from "../models/mapModel";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import { Point } from "ol/geom";
import { Vector as VectorSource } from "ol/source.js";
import { Vector as VectorLayer } from "ol/layer.js";
import Feature from "ol/Feature";
import targetIcon from "../images/1.webp";
import Buttons from "./Buttons";
import { getPlaceName } from "../utils/utils";

const MapComponent = () => {
  const coordinates = useAppSelector((store) => store.coordiantes).coordiantes;
  const dispatch = useAppDispatch();

  const mapRef = useRef<null | HTMLDivElement>(null);
  const [mapInst, setMap] = useState<null | Map>(null);
  const [placeName, setPlaceName] = useState("");
  const [lon, setLon] = useState(0);
  const [lat, setLat] = useState(0);
  const [mouseMoveCoord, setMouseMoveCoord] = useState<number[]>([0, 0]);

  const iconFeature = new Feature({
    geometry: new Point(coordinates),
    name: "",
    population: 4000,
    rainfall: 500,
  });

  const iconStyle = new Style({
    image: new Icon({
      anchor: [0, 0],
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      width: 70,
      src: targetIcon,
    }),
  });
  iconFeature.setStyle(iconStyle);
  const vectorSource = new VectorSource({
    features: [],
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });
  const jumpToByCoordinates = async () => {
    const newCoordinates = fromLonLat([lon, lat]);
    console.log(lon, lat);

    if (mapInst) {
      mapInst.getView().setCenter(newCoordinates);
      mapInst.getView().setZoom(12);
      const name = await getPlaceName(lon, lat);
      setPlaceName(name);
    }
    dispatch(setCoordinates([lon, lat]));
  };

  const addTarget = () => {
    if (mapInst) {
      const vectorSource = new VectorSource();
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      const feature = new Feature({
        geometry: new Point(fromLonLat(coordinates)),
      });

      feature.setStyle(
        new Style({
          image: new Icon({
            src: targetIcon,
            scale: 0.04,
          }),
        })
      );

      vectorSource.addFeature(feature);
      mapInst.addLayer(vectorLayer);
    }
  };

  useEffect(() => {
    if (mapInst)
      mapInst.on("click", async (event) => {
        const coord = transform(event.coordinate, "EPSG:3857", "EPSG:4326");
        const x = coord[0];
        const y = coord[1];
        dispatch(setCoordinates(coord));
        const name = await getPlaceName(x, y);
        setPlaceName(name);
      });
  });

  useEffect(() => {
    if (mapRef.current && !mapInst) {
      const map = mapModel(mapRef.current);
      setMap(map);
      map.addLayer(vectorLayer);
      map.on("pointermove", (event) => {
        setMouseMoveCoord(
          transform(event.coordinate, "EPSG:3857", "EPSG:4326")
        );
      });
    }
  }, []);

  return (
    <>
      <Box ref={mapRef} id="map"></Box>
      {!mapInst && <Typography>Oops...there is no map to view</Typography>}

      <Box id="details">
        <Typography id="titles">
          Current Coordinates:
          <Typography id="text">
            {mouseMoveCoord[0] + "," + mouseMoveCoord[1]}
          </Typography>
        </Typography>
        <Typography id="titles">
          Selected Coordinates:
          <br />
          <Typography id="text">
            {+coordinates[0] + "," + coordinates[1]}
          </Typography>
          <br />
        </Typography>

        <Typography id="titles">
          Place Name:
          <br />
          <Typography id="text">{placeName}</Typography>
          <br />
        </Typography>

        <TextField
          label="Coordinate Lon"
          className="input"
          onChange={(e) => setLon(Number(e.target.value))}
        ></TextField>
        <TextField
          label="Coordinate Lat"
          className="input"
          onChange={(e) => setLat(Number(e.target.value))}
        ></TextField>
        <Buttons
          text="JUMP"
          onClick={() => {
            jumpToByCoordinates();
          }}
        />
        <Buttons text="ADD TARGET" onClick={addTarget} />
      </Box>
    </>
  );
};

export default MapComponent;
