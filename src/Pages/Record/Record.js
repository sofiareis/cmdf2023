import React, { useEffect, useState, useRef, useCallback } from 'react';
import './Record.css';
import { QUESTION_BANK, shuffleNumbers } from '../../constants';
import { VideoRecorder } from '../../webcam/VideoRecorder';
import { Button, Radio, Space, Divider } from 'antd';
import {
    FastForwardOutlined,
    PlayCircleOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';
import SpeechRecognition, {
    useSpeechRecognition,
} from 'react-speech-recognition';

const RECORDING = 'recording';
const DONE = 'done';
const NEXT_QUESTION = 'next_question';

function Record() {
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
    const [feedback, setFeedback] = useState('');
    // capture states: recording, done, next_question
    const [capturing, setCapturing] = useState(NEXT_QUESTION);

    const {
        transcript,
        interimTranscript,
        finalTranscript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

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
        console.log(DONE);
        setCapturing(false);
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

    const sendVideoTranscript = (response) => {
        console.log('sending transcript to server');
        const encodedResponse = encodeURIComponent(response);
        fetch(`http://127.0.0.1:5000/feedback?answer=${encodedResponse}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response['sentiment']);
                setFeedback('sentiment: ' + response['sentiment']);
            });
    };

    const nextQuestion = () => {
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

    return (
        <div className='record-background'>
            <div className='record-spacer' />
            {capturing === RECORDING && (
                <Button
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
            )}
            <VideoRecorder webcamRef={webcamRef} />
            <div className='font-face-apercu record-question'>
                <p className='record-question-text' style={{ fontSize: 25 }}>
                    {question}
                </p>
            </div>
            {capturing === RECORDING ? (
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
                            color: '#4849B8',
                        }}
                    >
                        Restart
                    </Button>
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
                            color: '#4849B8',
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
            {recordedChunks.length > 0 && capturing !== RECORDING && (
                <div style={{ flexDirection: 'column' }}>
                    <button onClick={handleDownload}>Download</button>
                    <button onClick={() => sendVideoTranscript(transcript)}>
                        Submit Response
                    </button>
                </div>
            )}
            {/*<p>{transcript}</p>
            <p>{feedback}</p>*/}
        </div>
    );
}

export default Record;
