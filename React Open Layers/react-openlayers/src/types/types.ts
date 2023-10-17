// With God's Help
import { Map } from "ol";

export type mapType = string | HTMLElement | undefined;

export type jumpToByCoordinatesProps = (
  lon: number,
  lat: number,
  mapInst: Map,
  setPlaceName: (name: string) => void,
  setCoordinates: (coord: number[]) => void,
  dispatch: (setCoordinates: (coord: number[]) => void) => void
) => void;
