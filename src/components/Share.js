import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import VideoService from "../services/video.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};

const Share = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [url, setUrl] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (!user) {
      navigate("/login");
      window.location.reload();
    }
  }, []);

  const onChangeUrl = (e) => {
    const url = e.target.value;
    setUrl(url);
  };

  const handleShareVideo = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      VideoService.shareVideo(url).then(
        (response) => {
          setMessage("Video is shared!");
          setSuccessful(true);
          navigate("/videos");
          // window.location.reload();
        },
        (error) => {
          console.log(error.response.data);
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.messages &&
              error.response.data.messages.join(" and ")) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (

    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handleShareVideo} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="url">Youtube URL</label>
                <Input
                  type="text"
                  className="form-control"
                  name="url"
                  value={url}
                  onChange={onChangeUrl}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Share</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Share;
