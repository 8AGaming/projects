// With God's Help
import { useState } from "react";
import { usePage } from "./PageContext";

const NewTrip = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [body, setBody] = useState<Record<string, unknown>>({});
  const context = usePage();
  const { setPage } = context;
  const reqOptions = (body: Record<string, unknown>) => {
    return {
      method: "POST",
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
            setPage("trips");
          }}
        >
          Back To Trips
        </button>
      </div>
      <form id="form">
        <input
          className="inputs"
          placeholder="Trip Name..."
          onChange={(e) => {
            setBody({ ...body, ...{ name: e.target.value } });
          }}
        />
        <input
          className="inputs"
          placeholder="Trip Destination..."
          onChange={(e) => {
            setBody({ ...body, ...{ destination: e.target.value } });
          }}
        />
        <input
          className="inputs"
          placeholder="Trip Image URL..."
          onChange={(e) => {
            setImageUrl(e.target.value);
            setBody({ ...body, ...{ image: e.target.value } });
            console.log(body);
          }}
        />
        <img id="image_input_preview" src={imageUrl} />
        <input
          className="inputs"
          placeholder="Trip Start Date..."
          onChange={(e) => {
            setBody({ ...body, ...{ startDate: e.target.value } });
          }}
        />
        <input
          className="inputs"
          placeholder="Trip End Date..."
          onChange={(e) => {
            setBody({ ...body, ...{ endDate: e.target.value } });
          }}
        />
        <input
          className="inputs"
          placeholder="Trip Description..."
          onChange={(e) => {
            setBody({ ...body, ...{ description: e.target.value } });
          }}
        />
        <input
          className="inputs"
          placeholder="Trip Price..."
          onChange={(e) => {
            setBody({ ...body, ...{ price: Number(e.target.value) } });
          }}
        />
        <input
          className="inputs"
          placeholder="Trip Activities..."
          onChange={(e) => {
            const values = e.target.value.split(",");
            setBody({ ...body, ...{ activities: values } });
          }}
        />
        <input
          type="button"
          value="CREATE NEW TRIP"
          id="form_button"
          onClick={() => {
            fetch("http://localhost:3000/api/trips/", reqOptions(body))
              .then((data) => data.json())
              .then((state) => console.log(state))
              .catch((err) => console.error(err));
          }}
        />
      </form>
    </>
  );
};

export default NewTrip;
