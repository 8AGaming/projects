import { useEffect, useState } from "react";
import { usePage } from "./PageContext";
import { useTrip } from "./TripContext";
import { useTrips } from "./TripsContext";
import TripInterface from "../trips/interfaces/TripInterface";

// With God's Help

// type TripsProviderProps = {
//   children: ReactNode;
// };

const Trips = () => {
  const reqOptions = () => {
    return {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        authorization: JSON.parse(
          localStorage.getItem("authorization") as string
        ),
      },
    };
  };
  const context = usePage();
  const { setPage } = context;
  const tripsContext = useTrips();
  const { trips, id, setId } = tripsContext;
  const TripContext = useTrip();
  const { setTrip, trip } = TripContext;
  const [inTrip, setInTrip] = useState(false);
  useEffect(() => {
    if (inTrip) {
      fetch(`http://localhost:3000/api/trips/${id}`)
        .then((data) => data.json())
        .then((trip) => {
          setTrip(trip), console.log(trip), setPage("tripDetail");
        })
        .catch((err) => console.error(err));
    }
  }, [inTrip, trip]);
  return (
    <>
      <div>
        <button
          onClick={() => {
            setPage("home");
          }}
        >
          Home
        </button>
        <button
          className="buttons"
          onClick={() => {
            setPage("createNewTrip");
          }}
        >
          Create New Trip
        </button>
      </div>
      <div>
        {trips &&
          trips.map((trip: TripInterface) => {
            return (
              <div
                onClick={() => {
                  setId(trip.id as string);
                  setInTrip(true);
                }}
                key={trip.id as unknown as string}
                className="trip_card"
              >
                <div className="trip_card_title">
                  {trip.name as unknown as string}
                </div>
                <div className="trip_card_text">
                  {trip.destination as unknown as string}
                </div>
                <img
                  className="trip_card_image"
                  src={trip.image as unknown as string}
                />
                <button
                  className="delete_buttons"
                  onClick={(e) => {
                    e.stopPropagation();
                    fetch(
                      `http://localhost:3000/api/trips/${trip.id}`,
                      reqOptions()
                    )
                      .then((data) => data.json())
                      .then((state) => console.log(state))
                      .catch((err) => console.error(err));
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Trips;
