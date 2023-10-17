import axios from "axios";
import { fromLonLat } from "ol/proj";
import { jumpToByCoordinatesProps } from "../types/types";

export const getPlaceName = async (x: number, y: number) => {
  const res = await axios(
    `https://nominatim.openstreetmap.org/reverse?format=json&lon=${x}&lat=${y}`
  );
  if (res.status === 200) {
    const data = await res.data;
    const name = data.display_name;
    return name;
  }
};

export const jumpToByCoordinates: jumpToByCoordinatesProps = async (
  lon,
  lat,
  mapInst,
  setPlaceName,
  dispatch
) => {
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
