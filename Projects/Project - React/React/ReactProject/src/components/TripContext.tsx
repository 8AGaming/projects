import {
  useState,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch,
  FC,
  createContext,
} from "react";

interface TripInterface {
  // Record<string, unknown> | undefined;
  id?: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  description: string;
  price: number;
  image: string;
  activities: string[];
}

type ContextValue = {
  trip: TripInterface | null;
  setTrip: Dispatch<SetStateAction<TripInterface | null>>;
};

const TripContext = createContext<null | ContextValue>(null);
const { Provider } = TripContext;

type TripProviderProps = {
  children: ReactNode;
};

const TripProvider: FC<TripProviderProps> = ({ children }) => {
  const [trip, setTrip] = useState<TripInterface | null>(null);

  return <Provider value={{ trip, setTrip }}>{children}</Provider>;
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) throw new Error("useTrip must be used within a TripProvider");
  return context;
};

export default TripProvider;
