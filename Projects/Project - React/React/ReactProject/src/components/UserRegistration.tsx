import { usePage } from "./PageContext";
import { useState } from "react";
const UserRegistration = () => {
  const context = usePage();
  const { setPage } = context;
  const [body, setBody] = useState<Record<string, unknown>>({});
  const reqOptions = (body: Record<string, unknown>) => {
    return {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        authorization: "test-token",
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
      </div>
      <div id="register_login">
        <input
          className="inputs"
          placeholder="Email..."
          onChange={(e) => {
            setBody({ ...body, ...{ email: e.target.value } });
          }}
        />
        <input
          className="inputs"
          type="password"
          placeholder="Password..."
          onChange={(e) => {
            setBody({ ...body, ...{ password: e.target.value } });
          }}
        />
        <button
          className="buttons"
          onClick={() => {
            fetch("http://localhost:3000/api/auth/register/", reqOptions(body))
              .then((data) => data.json())
              .then((state) => console.log(state, body))
              .catch((err) => console.error(err));
          }}
        >
          Sign Up
        </button>
      </div>
    </>
  );
};

export default UserRegistration;
