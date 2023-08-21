import React, { useState } from 'react';
import './Feedback.css';
import { Progress, Button, Modal, Input } from 'antd';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Feedback() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const location = useLocation();
    const question = location.state.question;
    const wordChoice = location.state.wordChoice;
    const tone = location.state.tone;
    const clarity = location.state.clarity;
    const structure = location.state.structure;
    const specific = location.state.specific;
    const timing = location.state.timing;
    const response = location.state.response;

    //console.log(location.state)
    //console.log(specific)
    
    let navigate = useNavigate();
    const recordAgain = () => {
        saveFeedback();
        navigate('/record');
    };

    const endInterview = () => {
        saveFeedback();
        setIsModalOpen(true);
        incrementQuestionIndex();
    };

    const nextQuestion = () => {
        saveFeedback();
        incrementQuestionIndex();
        navigate('/record');
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const sendEmailGoHome = () => {
        if (email) {
            // attempt to send
            const allFeedback = JSON.parse(
                localStorage.getItem('sessionFeedback')
            );
            console.log(allFeedback);
            console.log(email);

            // send email asynchronously
            fetch(`http://127.0.0.1:5000/email`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    feedback: allFeedback, // array of object feedbacks
                }),
            });
        }

        localStorage.removeItem('sessionFeedback'); // clear session storage
        navigate('/');
    };

    const incrementQuestionIndex = () => {
        let nextQuestionIndex =
            localStorage.getItem('currentQuestionIndex') * 1 + 1;

        if (nextQuestionIndex == 50) {
            nextQuestionIndex = 0;
        }

        localStorage.setItem('currentQuestionIndex', nextQuestionIndex);
    };

    // only persist feedback from current session
    // format is an array of {question, wordChoice, tone, clarity, timing}
    const saveFeedback = () => {
        let questionFeedback = {
            question: question,
            response: response,
            wordChoice:
                wordChoice.charAt(0).toUpperCase() + wordChoice.slice(1),
            tone: tone.charAt(0).toUpperCase() + tone.slice(1),
            clarity: clarity.charAt(0).toUpperCase() + clarity.slice(1),
            structure: structure.charAt(0).toUpperCase() + structure.slice(1),
            specific: specific.charAt(0).toUpperCase() + specific.slice(1),
            timing: timing,
        };
        let sessionFeedback = localStorage.getItem('sessionFeedback');

        if (!sessionFeedback) {
            localStorage.setItem(
                'sessionFeedback',
                JSON.stringify([questionFeedback])
            );
        } else {
            let itemFeedbacks = JSON.parse(sessionFeedback); // array of question feedbacks
            itemFeedbacks.push(questionFeedback);
            localStorage.setItem(
                'sessionFeedback',
                JSON.stringify(itemFeedbacks)
            );
        }
    };

    // returns a num between 1 and 100
    const mapFeedbackToProgress = (feedback) => {
        if (
            feedback === 'negative' ||
            feedback === 'casual' ||
            feedback == 'unclear' ||
            feedback == 'unstructured' ||
            feedback == 'generic'
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

                <div className='box-2-in-a-row'>
                    <div className='box'>
                        <div className='box-style'>
                            <h2 className='box-title'>Structure</h2>
                            <p className='box-desc font-face-apercu'>
                                Speak using the STAR method
                            </p>
                            <Progress
                                percent={mapFeedbackToProgress(structure)}
                                showInfo={false}
                                strokeColor={'#4849B8'}
                                className='progress-bar'
                            />
                            <div className='font-face-apercu progress-desc'>
                                <div>Unstructured</div>
                                <div>Structured</div>
                            </div>
                        </div>
                    </div>

                    <div className='box'>
                        <div className='box-style'>
                            <h2 className='box-title'>Specific and concrete</h2>
                            <p className='box-desc font-face-apercu'>
                                Give specific and concrete examples of your experience
                            </p>
                            <Progress
                                percent={mapTimeToProgress(specific)}
                                showInfo={false}
                                strokeColor={'#4849B8'}
                                className='progress-bar'
                            />
                            <div className='font-face-apercu progress-desc'>
                                <div>General</div>
                                <div>Specific</div>
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
            <Modal
                className='font-face-apercu'
                title='Save Your Feedback'
                open={isModalOpen}
                okText={email ? 'Send Email' : 'Go Home'}
                onOk={sendEmailGoHome}
                onCancel={handleCancel}
            >
                <p className='font-face-apercu'>
                    Email feedback results for this session:
                </p>
                <Input
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Modal>
        </div>
    );
}

export default Feedback;
