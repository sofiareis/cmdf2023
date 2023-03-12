import React from 'react';

const StopwatchDisplay = ({ formatTime, currentTimeMin, currentTimeSec }) => {
    return (
        <div className='stopwatch_display'>
            <span>
                {formatTime(currentTimeMin)}:{formatTime(currentTimeSec)}:
            </span>
        </div>
    );
};

export default StopwatchDisplay;
