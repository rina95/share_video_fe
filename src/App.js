import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Share from "./components/Share";
import Video from "./components/Video";
import Notification from "./components/Notification";
// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import {API_WS_ROOT} from "./common/ShareVariable";


const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [notify, setNotify] = useState({});
  
  const ws = new WebSocket(API_WS_ROOT);

  ws.onopen = () => {
    console.log("Connected to websocket server");
    // ws.send(JSON.stringify(wsApiCall));

    ws.send(
      JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          channel: "NotificationsChannel",
        }),
      })
    );
  };

  ws.onmessage = (event) => {
    const json = JSON.parse(event.data);

    if (json.message && json.message.data){
      console.log(json.message.data)
      setNotify(json.message.data);
      console.log(notify)
    }
  };


  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    // console.log(socket);

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  useEffect(() => {
    setTimeout(function() {
      setNotify({});
    }, 5000);
  }, [notify]);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Funny Videos
        </Link>
        <div className="navbar-nav mr-auto">

          <li className="nav-item">
            <Link to={"/videos"} className="nav-link">
              Videos
            </Link>
          </li>

          {currentUser && (
            <li className="nav-item">
              <Link to={"/share"} className="nav-link">
                Share Video
              </Link>
            </li>
          )}  
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="#" className="nav-link">
                {currentUser.email}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      {/* <Notification cable={props.cable}></Notification> */}
      { notify.user_name && notify.title && (
        <div className="alert alert-success text-center" role="alert">
          { notify.user_name } just shared { notify.title }
        </div>
      )}

      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Video />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/share" element={<Share />} />
          <Route exact path="/videos" element={<Video />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
