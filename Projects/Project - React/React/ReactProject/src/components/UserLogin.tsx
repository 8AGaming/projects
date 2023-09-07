import { usePage } from "./PageContext";
import { useState } from "react";

const UserLogin = () => {
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
            fetch("http://localhost:3000/api/auth/login/", reqOptions(body))
              .then((data) => data.json())
              .then((state) => {
                console.log(state, body);
                localStorage.setItem(
                  "authorization",
                  JSON.stringify(state.responseObj.token)
                );
              })
              .catch((err) => console.error(err));
          }}
        >
          Login
        </button>
      </div>
    </>
  );
};

export default UserLogin;
