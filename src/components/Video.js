import React, { useState, useEffect, Fragment } from "react";

import VideoService from "../services/video.service";

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [links, setlinks] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    VideoService.getVideos(page).then(
      (response) => {
        setVideos(response.data);
        setlinks(response.links)
      },
      (error) => {
        const _videos = [];

        setVideos(_videos);
      }
    );
  }, [page]);

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-center row">
        <h3>Enjoy Videos</h3>
        <div className="col-md-12">
          { videos.length > 0 ? (
            <Fragment>
              <div className="row p-2 bg-white rounded">
                <ul className="pagination" style={{width: "100%"}}>
                  <li className={"page-item ml-auto " + (page === 1 ? "disabled" : "")}>
                    <button className="page-link" onClick={() => setPage(links.prev)} tabIndex="-1">Previous</button>
                  </li>
                  {/* <li className="page-item active">
                    <button className="page-link" href="#">{page}<span className="sr-only">(current)</span></button>
                  </li> */}
                  <li className={"page-item mr-auto " + (page === links.last ? "disabled" : "")}>
                    <button className="page-link" onClick={() => setPage(links.next)}>Next</button>
                  </li>
                </ul>
              </div>
              {videos.map((video) => (
                <div className="row p-2 bg-white border rounded mt-2" key={video.id}>
                  <div className="col-md-4 mt-1">
                    <iframe className="img-fluid img-responsive rounded" width="420" height="315"
                      src={video.attributes.embed_url} title={video.attributes.title}>
                    </iframe> 
                  </div>
                  <div className="col-md-8 mt-1">
                    <h5>{ video.attributes.title }</h5>
                    <div className="mt-1 mb-1 spec-1">
                      <span>Shared by: { video.attributes.user_name }</span>
                    </div>
                      <p className="text-justify para mb-0">
                        {video.attributes.description}
                      </p>
                  </div>
                </div>
              ))}
            </Fragment>
          ) : (
            <div className="row p-2 bg-white border rounded">
              <h5>No videos are shared</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Video;
