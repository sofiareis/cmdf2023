import * as React from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import SpeechRecognition, {
    useSpeechRecognition,
} from 'react-speech-recognition';

export const VideoRecorder = () => {
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [feedback, setFeedback] = useState('');

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
        resetTranscript();
        setCapturing(true);
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
    }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

    const handleStopCaptureClick = useCallback(() => {
        console.log('stop capture');
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

    return (
        <div>
            <Webcam
                height={700}
                width={900}
                mirrored={true}
                audio={true}
                ref={webcamRef}
            />
            {capturing ? (
                <button onClick={handleStopCaptureClick}>Stop Capture</button>
            ) : (
                <button onClick={handleStartCaptureClick}>Start Capture</button>
            )}
            {recordedChunks.length > 0 && !capturing && (
                <div style={{ flexDirection: 'column' }}>
                    <button onClick={handleDownload}>Download</button>
                    <button onClick={() => sendVideoTranscript(transcript)}>
                        Submit Response
                    </button>
                </div>
            )}
            <p>{transcript}</p>
            <p>{feedback}</p>
        </div>
    );
};
