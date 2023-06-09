import React, { useEffect, useState } from "react";
import "../style/AppHome.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AppHome() {
  const [user, setUser] = useState("");
  const [applist, setApplist] = useState([]);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  function addApp() {
    navigate("/addApp");
  }

  useEffect(() => {
    axios
      .get("http://localhost:4000/getUser")
      .then((response) => {
        setUser(response.data.email);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post("http://localhost:4000/getApps", {
        email: user,
      })
      .then((response) => {
        console.log(response.data);
        setApplist(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  function handleLogout() {
    axios
      .post("http://localhost:4000/logout", { email: user })
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleHome() {
    navigate("/home");
  }

  return (
    <div className="container">
      <div>{user}</div>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={addApp}>Create App</button>
      <button onClick={handleHome}>Home</button>
      <div>
        <div>App Names</div>
        <div>
          {applist.length > 0 ? (
            applist.map((app) => (
              <div key={app.appId}>
                <Link to={`/app/${app.appId}`}>{app.appName}</Link>
              </div>
            ))
          ) : (
            <div>No Apps</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppHome;
