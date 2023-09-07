import { usePage } from "./PageContext";
import { useTrip } from "./TripContext";

const TripDetail = () => {
  const context = usePage();
  const { setPage } = context;
  const TripContext = useTrip();
  const { trip } = TripContext;
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
            setPage("trips");
          }}
        >
          Back To Trips
        </button>
      </div>
      <div id="titles">TRIP DETAILS</div>
      <div id="trip_card_detail">
        <div className="trip_card_detail_title">{trip?.name}</div>
        <div className="trip_card_detail_text">{trip?.destination}</div>
        <img className="trip_card_detail_image" src={trip?.image} />
        <div className="trip_card_detail_text">{trip?.description}</div>
        <div className="trip_card_detail_text">
          <span className="trip_card_detail_small_title">Start Date:</span>{" "}
          {trip?.startDate}
        </div>
        <div className="trip_card_detail_text">
          <span className="trip_card_detail_small_title">End Date: </span>
          {trip?.endDate}
        </div>

        <div className="trip_card_detail_text">
          <span className="trip_card_detail_small_title">Price: </span> $
          {trip?.price}
        </div>
        <div className="trip_card_detail_text">
          <span className="trip_card_detail_title">Activities: </span>
          {/* {trip && trip.activities?.join(",")} */}
          {trip && trip.activities?.map((activity) => <div>{activity}</div>)}
        </div>
        <button
          onClick={() => {
            setPage("updateTrip");
          }}
        >
          UPDATE TRIP
        </button>
      </div>
    </>
  );
};

export default TripDetail;
