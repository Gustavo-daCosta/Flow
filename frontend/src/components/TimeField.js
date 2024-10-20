import React from 'react';
import './styles/TimeField.css';

function TimeField({ label, value, onChange }) {
    return (
        <div className="time-field">
            <label>{label}</label>
            <input
                type="time"
                value={value}
                onChange={onChange}
                className="input-time"
            />
        </div>
    );
}

export default TimeField;
