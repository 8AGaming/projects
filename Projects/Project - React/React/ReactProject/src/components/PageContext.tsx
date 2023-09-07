import {
  useState,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch,
  FC,
  createContext,
} from "react";

type ContextValue = {
  page: string | null;
  setPage: Dispatch<SetStateAction<string | null>>;
};

const NameContext = createContext<null | ContextValue>(null);
const { Provider } = NameContext;

type PageProviderProps = {
  children: ReactNode;
};

const PageProvider: FC<PageProviderProps> = ({ children }) => {
  const [page, setPage] = useState<string | null>("home");

  return <Provider value={{ page, setPage }}>{children}</Provider>;
};

export const usePage = () => {
  const context = useContext(NameContext);
  if (!context) throw new Error("useName must be used within a NameProvider");
  return context;
};

export default PageProvider;
