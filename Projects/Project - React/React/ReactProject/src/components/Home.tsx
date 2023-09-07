import { usePage } from "./PageContext";
import { useTrips } from "./TripsContext";

const Home = () => {
  const context = usePage();
  const { setPage } = context;
  return (
    <>
      <header id="header">
        <div id="titles">Home</div>
        <nav>
          <button
            className="buttons"
            onClick={() => {
              setPage("trips");
            }}
          >
            Trips
          </button>
          <button
            className="nav-item"
            onClick={() => {
              setPage("userRegistration");
            }}
          >
            Sign Up
          </button>
          <button
            className="nav-item"
            onClick={() => {
              setPage("userLogin");
            }}
          >
            Login
          </button>
        </nav>
      </header>
    </>
  );
};

export default Home;
