import React from "react";
import { Container } from "react-bootstrap";
//import videoSrc from '/image/video2.mp4'
import "./VideoIntro.css";
export default function VideoIntro() {
  return (
    <div className="video-header">
      <video src="./images/Restaurant_Ad.mp4" autoPlay muted></video>
      <div className="viewport-header">
        <div className="row no-gutters">
          <div className="col">
            <div className="mainHeading">
              <p>HungryHub</p>
            </div>
            {/* <div className="about">
                    <button class="btn btn-primary">
                      Know More
                    </button>
                    <button className="btn btn-primary">
                      <a href="src/signUp/index.html">Sign up</a>
                    </button>
                   </div>  */}
          </div>
        </div>
      </div>
    </div>
  );
}
