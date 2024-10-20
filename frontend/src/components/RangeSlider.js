import React, { useState } from 'react';
import './styles/RangeSlider.css'; // Arquivo CSS separado para estilização

const RangeSlider = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className="slider-container">
            <div className="value-display">R${value}</div>
            <input
                type="range"
                min="0"
                max="500"
                value={value}
                className="slider"
                onChange={handleChange}
            />
        </div>
    );
};

export default RangeSlider;