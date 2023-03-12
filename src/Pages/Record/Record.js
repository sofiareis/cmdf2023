import React, { useEffect, useState, useRef, useCallback } from 'react';
import './Record.css';
import { QUESTION_BANK, shuffleNumbers } from '../../constants';
import { VideoRecorder } from '../../webcam/VideoRecorder';
import { Button, Spin } from 'antd';
import {
    FastForwardOutlined,
    PlayCircleOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';
import SpeechRecognition, {
    useSpeechRecognition,
} from 'react-speech-recognition';
import { useNavigate } from 'react-router-dom';
import Stopwatch from '../../webcam/Stopwatch';

const RECORDING = 'recording';
const DONE = 'done';
const NEXT_QUESTION = 'next_question';

function Record() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(() => {
        let startIndex = localStorage.getItem('currentQuestionIndex');

        if (!startIndex) {
            shuffleNumbers();
            startIndex = localStorage.getItem('currentQuestionIndex');
        }

        // cast to number
        return startIndex * 1;
    });
    const [question, setQuestion] = useState(QUESTION_BANK[questionIndex]);

    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
    // capture states: recording, done, next_question
    const [capturing, setCapturing] = useState(NEXT_QUESTION);

    // stopwatch
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);

    const {
        transcript,
        interimTranscript,
        finalTranscript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    let navigate = useNavigate();
    const routeChange = (wordChoice, tone, clarity, timing) => {
        navigate('/feedback', {
            state: {
                question: question,
                wordChoice: wordChoice,
                tone: tone,
                clarity: clarity,
                timing: timing,
            },
        });
    };

    // stopwatch
    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    useEffect(() => {
        if (finalTranscript !== '') {
            console.log('Got final result:', finalTranscript);
        }
    }, [interimTranscript, finalTranscript]);

    const handleDataAvailable = useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleStartCaptureClick = useCallback(() => {
        setCapturing(RECORDING);
        // start stopwatch
        setRunning(true);
        resetTranscript();
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: 'video/webm',
        });
        mediaRecorderRef.current.addEventListener(
            'dataavailable',
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
        SpeechRecognition.startListening({
            continuous: true,
            language: 'en-GB',
        });
    }, [
        webcamRef,
        setCapturing,
        mediaRecorderRef,
        handleDataAvailable,
        resetTranscript,
    ]);

    const handleStopCaptureClick = useCallback(() => {
        setCapturing(DONE);

        // stop stopwatch
        setRunning(false);

        mediaRecorderRef.current.stop();
        SpeechRecognition.stopListening();
    }, [mediaRecorderRef, setCapturing]);

    const handleDownload = useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: 'video/webm',
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.style = 'display: none';
            a.href = url;
            a.download = 'react-webcam-stream-capture.webm';
            a.click();
            window.URL.revokeObjectURL(url);
            setRecordedChunks([]);
        }
    }, [recordedChunks]);

    const mapTimeToSeconds = () => {
        const mins = ('0' + Math.floor((time / 60000) % 60)).slice(-2) * 1;
        const seconds = ('0' + Math.floor((time / 1000) % 60)).slice(-2) * 1;

        return mins * 60 + seconds;
    };

    const sendVideoTranscript = (response) => {
        setIsSubmitting(true);
        setCapturing(NEXT_QUESTION);
        console.log('sending transcript to server');
        let answer = response;
        if (!response) {
            answer = 'null';
        }

        const encodedResponse = encodeURIComponent(answer);
        fetch(`http://127.0.0.1:5000/feedback?answer=${encodedResponse}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then(async (response) => {
                console.log(response);
                routeChange(
                    response['word_choice'],
                    response['sentiment'],
                    response['clarity'],
                    mapTimeToSeconds(time)
                );
            });
    };

    const nextQuestion = () => {
        setCapturing(NEXT_QUESTION);
        // reset stopwatch
        setTime(0);
        // increment question index
        let nextQuestionIndex = questionIndex + 1;

        // wrap around if at the last question
        if (nextQuestionIndex == 50) {
            nextQuestionIndex = 0;
        }

        setQuestionIndex(nextQuestionIndex);
        localStorage.setItem('currentQuestionIndex', nextQuestionIndex);
        setQuestion(QUESTION_BANK[nextQuestionIndex]);
        console.log(nextQuestionIndex);
        console.log(question);
    };

    const restartQuestion = useCallback(() => {
        setCapturing(NEXT_QUESTION);
        // reset stopwatch
        setTime(0);
        mediaRecorderRef.current.stop();
        SpeechRecognition.stopListening();
    }, [mediaRecorderRef, setCapturing]);

    return (
        <div className='record-background'>
            <Spin
                className='font-face-apercu-medium spinner'
                size='large'
                tip='Getting feedback'
                spinning={isSubmitting}
            >
                <div className='record-spacer' />
                <VideoRecorder webcamRef={webcamRef} />
                <div className='record-centered'>
                    <div className='font-face-apercu record-question'>
                        <p
                            className='record-question-text'
                            style={{ fontSize: 25 }}
                        >
                            {question}
                        </p>
                    </div>
                    <Stopwatch time={time} />
                </div>
                {capturing === RECORDING ? (
                    <div className='record-action-buttons'>
                        <Button
                            onClick={handleStopCaptureClick}
                            type='primary'
                            icon={<CloseCircleOutlined />}
                            size={'large'}
                            className='font-face-apercu'
                            style={{
                                background: '#4849B8',
                                fontSize: 20,
                                paddingTop: 15,
                                paddingBottom: 15,
                                width: 200,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            Stop Recording
                        </Button>
                    </div>
                ) : capturing === DONE ? (
                    <div className='record-action-buttons'>
                        <Button
                            onClick={restartQuestion}
                            type='primary'
                            icon={<FastForwardOutlined />}
                            size={'large'}
                            className='font-face-apercu'
                            style={{
                                background: '#979FD4',
                                fontSize: 20,
                                paddingTop: 15,
                                paddingBottom: 15,
                                width: 200,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#000',
                            }}
                        >
                            Restart
                        </Button>
                        <Button
                            onClick={() => sendVideoTranscript(transcript)}
                            type='primary'
                            icon={<PlayCircleOutlined />}
                            size={'large'}
                            className='font-face-apercu'
                            style={{
                                background: '#4849B8',
                                fontSize: 20,
                                paddingTop: 15,
                                paddingBottom: 15,
                                width: 200,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            Submit
                        </Button>
                    </div>
                ) : (
                    <div className='record-action-buttons'>
                        <Button
                            onClick={nextQuestion}
                            type='primary'
                            icon={<FastForwardOutlined />}
                            size={'large'}
                            className='font-face-apercu'
                            style={{
                                background: '#979FD4',
                                fontSize: 20,
                                paddingTop: 15,
                                paddingBottom: 15,
                                width: 200,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#000',
                            }}
                        >
                            Skip Question
                        </Button>
                        <Button
                            onClick={handleStartCaptureClick}
                            type='primary'
                            icon={<PlayCircleOutlined />}
                            size={'large'}
                            className='font-face-apercu'
                            style={{
                                background: '#4849B8',
                                fontSize: 20,
                                paddingTop: 15,
                                paddingBottom: 15,
                                width: 200,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            Start Recording
                        </Button>
                    </div>
                )}
                {/*recordedChunks.length > 0 && capturing === DONE && (
                <div style={{ flexDirection: 'column' }}>
                    <button onClick={handleDownload}>Download</button>
                </div>
            )*/}
            </Spin>
        </div>
    );
}

export default Record;
