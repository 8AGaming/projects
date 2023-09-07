// With God's Help
import { useState } from "react";
import { usePage } from "./PageContext";
import { useTrips } from "./TripsContext";
import { useTrip } from "./TripContext";
import TripInterface from "../trips/interfaces/TripInterface";

const UpdateTrip = () => {
  const [imageUrl, setImageUrl] = useState("");
  const context = usePage();
  const { setPage } = context;
  const { id } = useTrips();
  const { trip, setTrip } = useTrip();

  const [body, setBody] = useState<TripInterface | null>(null);

  const reqOptions = (body: TripInterface | null) => {
    return {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        authorization: JSON.parse(
          localStorage.getItem("authorization") as string
        ),
      },
      body: JSON.stringify(body),
    };
  };
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
            setPage("tripDetail");
          }}
        >
          Back To Details
        </button>
        <button
          className="buttons"
          onClick={() => {
            setPage("trips");
          }}
        >
          Back To Trips
        </button>
      </div>
      <div id="titles">UPDATE TRIP</div>
      <div>
        <form id="form">
          <input
            value={trip?.name}
            className="inputs"
            placeholder="Trip Name..."
            onChange={(e) => {
              setTrip({ ...trip!, ...{ name: e.target.value } });
            }}
          />
          <input
            value={trip?.destination}
            className="inputs"
            placeholder="Trip Destination..."
            onChange={(e) => {
              setTrip({ ...trip!, ...{ destination: e.target.value } });
            }}
          />
          <input
            value={trip?.image}
            className="inputs"
            placeholder="Trip Image URL..."
            onChange={(e) => {
              setImageUrl(e.target.value);
              setTrip({ ...trip!, ...{ image: e.target.value } });
              console.log(body);
            }}
          />
          <img id="image_input_preview" src={imageUrl} />
          <input
            value={trip?.startDate}
            className="inputs"
            placeholder="Trip Start Date..."
            onChange={(e) => {
              setTrip({ ...trip!, ...{ startDate: e.target.value } });
            }}
          />
          <input
            value={trip?.endDate}
            className="inputs"
            placeholder="Trip End Date..."
            onChange={(e) => {
              setTrip({ ...trip!, ...{ endDate: e.target.value } });
            }}
          />
          <input
            value={trip?.description}
            className="inputs"
            placeholder="Trip Description..."
            onChange={(e) => {
              setTrip({ ...trip!, ...{ description: e.target.value } });
            }}
          />
          <input
            value={trip?.price}
            className="inputs"
            placeholder="Trip Price..."
            onChange={(e) => {
              setTrip({ ...trip!, ...{ price: Number(e.target.value) } });
            }}
          />
          <input
            value={trip?.activities}
            className="inputs"
            placeholder="Trip Activities..."
            onChange={(e) => {
              const values = e.target.value.split(",");
              setTrip({ ...trip!, ...{ activities: values } });
            }}
          />
          <input
            type="button"
            value="UPDATE TRIP"
            id="form_button"
            onClick={() => {
              setBody(trip);
              fetch(`http://localhost:3000/api/trips/${id}`, reqOptions(trip))
                .then((data) => data.json())
                .then((state) => console.log(state))
                .catch((err) => console.error(err));
            }}
          />
        </form>
      </div>
    </>
  );
};

export default UpdateTrip;
