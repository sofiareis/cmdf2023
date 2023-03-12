import React from 'react';
import './Landing.css';
import image from '../assets/image.svg';
import image2 from '../assets/Frame10.svg';
import icon1 from '../assets/icon1.svg';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
function Landing() {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `record`;
        navigate(path);
    };
    return (
        <div className='Landing'>
            <header className='Landing-header'>
                <div className='Landing-title'>
                    <div className='Landing-comp'>
                        <div className='Landing-wrap'>
                            <h1 className='Landing-h1 font-face-apercu-medium'>
                                CareerCue
                            </h1>
                            <p className='Landing-h1-desc font-face-apercu-light'>
                                Get interview-ready with ease - Your success
                                starts here
                            </p>
                            <Button
                                type='primary'
                                className='font-face-apercu Landing-button'
                                onClick={routeChange}
                            >
                                Begin Mock Interview
                            </Button>
                        </div>
                    </div>
                    <img src={image} className='Landing-logo' alt='image' />
                </div>
            </header>
            <body className='Landing-body'>
                <h2 className='font-face-apercu About-h2'>
                    CareerCue is built to help you prepare for your interviews
                </h2>
                <div className='Landing-about'>
                    <div className='About-wrapper'>
                        <div className='About-descr'>
                            <div className='About-container'>
                                <img
                                    src={icon1}
                                    className='About-Icon'
                                    alt='image2'
                                />
                                <p className='font-face-apercu-medium About-title'>
                                    Personalized Interview Prep
                                </p>
                            </div>
                            <p className='font-face-apercu About-desc'>
                                CareerCue offers a personalized approach to
                                interview preparation by allowing users to
                                record their answers to mock interview questions
                                and receive feedback on their responses
                            </p>
                        </div>
                        <div className='About-descr'>
                            <div className='About-container'>
                                <img
                                    src={icon1}
                                    className='About-Icon'
                                    alt='image2'
                                />
                                <p className='font-face-apercu-medium About-title'>
                                    AI Powered Feedback
                                </p>
                            </div>
                            <p className='font-face-apercu About-desc'>
                                By utilizing Cohere’s AI language models to
                                analyze the clarity, word choice, and sentiment
                                of responses, users can better understand how
                                their responses are being perceived and identify
                                areas for improvement
                            </p>
                        </div>
                        <div className='About-descr'>
                            <div className='About-container'>
                                <img
                                    src={icon1}
                                    className='About-Icon'
                                    alt='image2'
                                />
                                <p className='font-face-apercu-medium About-title'>
                                    Convenient and Accessible
                                </p>
                            </div>
                            <p className='font-face-apercu About-desc'>
                                CareerCue is free and accessible to anyone,
                                making it a convenient tool for users to use in
                                their interview preparation. Additionally, the
                                website is user-friendly and easy to navigate,
                                making it accessible to users of all skill
                                levels
                            </p>
                        </div>
                    </div>
                    <div className='About-Image'>
                        <img
                            src={image2}
                            className='Landing-image'
                            alt='image2'
                        />
                    </div>
                </div>
            </body>
        </div>
    );
}

export default Landing;
