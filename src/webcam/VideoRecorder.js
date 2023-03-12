import * as React from 'react';
import Webcam from 'react-webcam';

export const VideoRecorder = ({ webcamRef }) => {
    return (
        <div>
            <Webcam
                width={1200}
                height={700}
                mirrored={true}
                audio={true}
                ref={webcamRef}
            />
        </div>
    );
};
