import React from 'react';
import './styles/DateField.css';

function DateField({ label, value, onChange }) {
    return (
        <div className="date-field">
            <label>{label}</label>
            <input
                type="date"
                value={value}
                onChange={onChange}
                className="input-date"
            />
        </div>
    );
}

export default DateField;
