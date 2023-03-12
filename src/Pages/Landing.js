import React from "react";
import './Landing.css'
import image from './image.svg'
import { Button } from "antd";
function Landing() {
    return (
        <div className="Landing">
              <header className="Landing-header">
                <div className="Landing-title">
                  <div className="Landing-comp">
                    <div className="Landing-wrap">
                      <h1 className="Landing-h1">
                        CareerCue
                      </h1>
                      <p className="Landing-h1-desc">
                      Get interview-ready with ease - Your success starts here
                      </p>
                    </div>
                    <div className="Landing-button">
                      <Button type="primary">Press me</Button>
                    </div>
                  </div>
                  <img src={image} className="Landing-logo" alt="image" />
                </div>
              </header>
              <body className="Landing-about">

              </body>
            </div>
    )
}

export default Landing