import React, { useState, useEffect } from 'react';
import './Stopwatch.css';

const Stopwatch = ({ time }) => {
    return (
        <div className='stopwatch'>
            <div className='stopwatch-numbers font-face-apercu-bold'>
                <span>
                    {('0' + Math.floor((time / 60000) % 60)).slice(-2)}:
                </span>
                <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                <span>{('0' + ((time / 10) % 100)).slice(-2)}</span>
            </div>
        </div>
    );
};
export default Stopwatch;
