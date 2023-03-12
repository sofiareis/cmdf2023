import React from "react";
import './Feedback.css'
import { Progress, Button } from 'antd';

function Feedback() {
    return (
        <div className = "fb-background">
           
           <div className = "fb-header"> 
                <h1 className="fb-title">
                    Feedback:
                </h1>
                <p className = "fb-question">
                    Why are you interested in working for this company?
                </p>
            </div>

            <div className = "all-4-boxes"> 
                <div className = "box-2-in-a-row">
                    <div className = "box">
                        <div className="box-style"> 
                            <h2 className = "box-title">
                                Word Choice
                            </h2>
                            <p className = "box-desc">
                                Avoid slang and use professional language
                            </p>
                            <Progress percent={30} showInfo={false} strokeColor={"#4849B8"} className = "progress-bar"/>
                            <div className = "progress-desc"> 
                                <div> casual </div>
                                <div className = "progress-desc2">professional </div>
                            </div>     
                        </div>
                    </div>

                    <div className = "box">
                        <div className="box-style"> 
                            <h2 className = "box-title">
                                Clarity
                            </h2>
                            <p className = "box-desc">
                                Communicate clearly and avoid filler words
                            </p>
                            <Progress percent={30} showInfo={false} strokeColor={"#4849B8"} className = "progress-bar"/>
                            <div className = "progress-desc"> 
                                <div> unclear </div>
                                <div className = "progress-desc2">clear </div>
                            </div>     
                        </div>
                    </div>
                </div>

                <div className = "box-2-in-a-row">
                    <div className = "box">
                        <div className="box-style"> 
                            <h2 className = "box-title">
                                Tone
                            </h2>
                            <p className = "box-desc">
                                Speak with optimism and honesty
                            </p>
                            <Progress percent={30} showInfo={false} strokeColor={"#4849B8"} className = "progress-bar"/>
                            <div className = "progress-desc"> 
                                <div> negative </div>
                                <div className = "progress-desc2">positive </div>
                            </div>     
                        </div>
                    </div>

                    <div className = "box">
                        <div className="box-style"> 
                            <h2 className = "box-title">
                                Time
                            </h2>
                            <p className = "box-desc">
                                Aim to speak between 30s and 2 mins
                            </p>
                            <Progress percent={30} showInfo={false} strokeColor={"#4849B8"} className = "progress-bar"/>
                            <div className = "progress-desc"> 
                                <div> too short </div>
                                <div className = "progress-desc2">too long </div>
                            </div>     
                        </div>
                    </div>
                </div>
            </div>

            <div className = "buttons-in-a-row">
                <Button type="primary" size="large" style={{background: "#4849B8"}}>end interview</Button>
                <Button type="primary" size="large" style={{background: "#4849B8"}}>practice again</Button>
                <Button type="primary" size="large" style={{background: "#4849B8"}}>next question</Button>
            </div>
                
                
            
           
        </div>
    )
}

export default Feedback