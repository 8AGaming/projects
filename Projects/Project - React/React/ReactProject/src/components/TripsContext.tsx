import {
  useState,
  useEffect,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch,
  FC,
  createContext,
} from "react";
import TripInterface from "../trips/interfaces/TripInterface";

type ContextValue = {
  trips: TripInterface[] | null;
  setTrips: Dispatch<SetStateAction<TripInterface[] | null>>;
  id: string | null;
  setId: Dispatch<SetStateAction<string | null>>;
};

const TripsContext = createContext<null | ContextValue>(null);
const { Provider } = TripsContext;

type TripsProviderProps = {
  children: ReactNode;
};

const TripsProvider: FC<TripsProviderProps> = ({ children }) => {
  const [trips, setTrips] = useState<TripInterface[] | null>(null);
  const [id, setId] = useState<string | null>(null);
  useEffect(() => {
    fetch("http://localhost:3000/api/trips")
      .then((data) => data.json())
      .then((trips) => setTrips(trips))
      .catch((err) => console.error(err));
  }, [trips]);
  return <Provider value={{ trips, setTrips, id, setId }}>{children}</Provider>;
};

export const useTrips = () => {
  const context = useContext(TripsContext);
  if (!context) throw new Error("useTrips must be used within a TripsProvider");
  return context;
};

export default TripsProvider;
