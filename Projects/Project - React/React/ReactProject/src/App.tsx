// With God's Help
import "./App.css";
import Home from "./components/Home";
import Trips from "./components/Trips";
import { usePage } from "./components/PageContext";
import UserRegistration from "./components/UserRegistration";
import UserLogin from "./components/UserLogin";
import TripDetail from "./components/TripDetail";
import NewTrip from "./components/NewTrip";
import UpdateTrip from "./components/UpdateTrip";

function App() {
  const context = usePage();
  const { page } = context;

  if (page === "home") return <Home />;
  if (page === "trips") return <Trips />;
  if (page === "userRegistration") return <UserRegistration />;
  if (page === "userLogin") return <UserLogin />;
  if (page === "userRegistration") return <UserRegistration />;
  if (page === "tripDetail") return <TripDetail />;
  if (page === "createNewTrip") return <NewTrip />;
  if (page === "updateTrip") return <UpdateTrip />;
}

export default App;
