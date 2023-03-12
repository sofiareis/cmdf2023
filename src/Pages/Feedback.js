import React from 'react';
import './Feedback.css';
import { Progress, Button } from 'antd';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Feedback() {
    const location = useLocation();
    const question = location.state.question;
    const wordChoice = location.state.wordChoice;
    const tone = location.state.tone;
    const clarity = location.state.clarity;
    const timing = location.state.timing;

    let navigate = useNavigate();
    const recordAgain = () => {
        navigate('/record');
    };

    const endInterview = () => {
        incrementQuestionIndex();
        navigate('/');
    };

    const nextQuestion = () => {
        incrementQuestionIndex();
        navigate('/record');
    };

    const incrementQuestionIndex = () => {
        let nextQuestionIndex =
            localStorage.getItem('currentQuestionIndex') * 1 + 1;

        if (nextQuestionIndex == 50) {
            nextQuestionIndex = 0;
        }

        localStorage.setItem('currentQuestionIndex', nextQuestionIndex);
    };

    // returns a num between 1 and 100
    const mapFeedbackToProgress = (feedback) => {
        if (
            feedback === 'negative' ||
            feedback === 'casual' ||
            feedback == 'unclear'
        ) {
            return 20;
        } else if (feedback == 'neutral') {
            return 60;
        }
        // good feedback
        return 100;
    };

    const mapTimeToProgress = (time) => {
        if (time < 30) {
            return 10;
        } else if (time >= 30 && time <= 45) {
            return 60;
        } else if (time > 45 && time <= 90) {
            return 100;
        } else if (time > 90 && time <= 120) {
            return 75;
        } else {
            return 25;
        }
    };

    return (
        <div className='fb-background'>
            <div className='fb-header'>
                <h1 className='fb-title font-face-apercu-medium'>Feedback:</h1>
                <p className='fb-question font-face-apercu'>{question}</p>
            </div>

            <div className='all-4-boxes'>
                <div className='box-2-in-a-row'>
                    <div className='box'>
                        <div className='box-style'>
                            <h2 className='box-title'>Word Choice</h2>
                            <p className='box-desc font-face-apercu'>
                                Avoid slang and use professional language
                            </p>
                            <Progress
                                percent={mapFeedbackToProgress(wordChoice)}
                                showInfo={false}
                                strokeColor={'#4849B8'}
                                className='progress-bar'
                            />
                            <div className='font-face-apercu progress-desc'>
                                <div>Casual</div>
                                <div>Professional</div>
                            </div>
                        </div>
                    </div>

                    <div className='box'>
                        <div className='box-style'>
                            <h2 className='box-title'>Clarity</h2>
                            <p className='box-desc font-face-apercu'>
                                Communicate clearly and avoid filler words
                            </p>
                            <Progress
                                percent={mapFeedbackToProgress(clarity)}
                                showInfo={false}
                                strokeColor={'#4849B8'}
                                className='progress-bar'
                            />
                            <div className='font-face-apercu progress-desc'>
                                <div>Unclear</div>
                                <div>Clear</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='box-2-in-a-row'>
                    <div className='box'>
                        <div className='box-style'>
                            <h2 className='box-title'>Tone</h2>
                            <p className='box-desc font-face-apercu'>
                                Speak with optimism and honesty
                            </p>
                            <Progress
                                percent={mapFeedbackToProgress(tone)}
                                showInfo={false}
                                strokeColor={'#4849B8'}
                                className='progress-bar'
                            />
                            <div className='font-face-apercu progress-desc'>
                                <div>Negative</div>
                                <div>Positive</div>
                            </div>
                        </div>
                    </div>

                    <div className='box'>
                        <div className='box-style'>
                            <h2 className='box-title'>Time</h2>
                            <p className='box-desc font-face-apercu'>
                                Aim to speak between 30s and 2 mins
                            </p>
                            <Progress
                                percent={mapTimeToProgress(timing)}
                                showInfo={false}
                                strokeColor={'#4849B8'}
                                className='progress-bar'
                            />
                            <div className='font-face-apercu progress-desc'>
                                <div>Too Short/Long</div>
                                <div>Perfect Timing</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='buttons-in-a-row'>
                <Button
                    onClick={endInterview}
                    className='font-face-apercu'
                    type='primary'
                    size='large'
                    style={{
                        fontSize: 20,
                        paddingTop: 25,
                        paddingBottom: 25,
                        width: 175,
                        background: '#4849B8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    End Interview
                </Button>
                <Button
                    onClick={recordAgain}
                    className='font-face-apercu'
                    type='primary'
                    size='large'
                    style={{
                        fontSize: 20,
                        paddingTop: 25,
                        paddingBottom: 25,
                        width: 175,
                        background: '#4849B8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    Practice Again
                </Button>
                <Button
                    onClick={nextQuestion}
                    className='font-face-apercu'
                    type='primary'
                    size='large'
                    style={{
                        fontSize: 20,
                        paddingTop: 25,
                        paddingBottom: 25,
                        width: 175,
                        background: '#4849B8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    Next Question
                </Button>
            </div>
        </div>
    );
}

export default Feedback;
