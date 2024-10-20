import React from 'react';
import './styles/Dropdown.css';

function Dropdown({ label, options, value, onChange }) {
    return (
        <div className="dropdown-field">
            <label>{label}</label>
            <select value={value} onChange={onChange} className="dropdown-select">
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Dropdown;
