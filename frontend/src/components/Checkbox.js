import React from 'react';
import './styles/Checkbox.css';

function Checkbox({ label, checked, onChange }) {
    return (
        <div className="checkbox-field">
            <label>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="checkbox-input"
                />
                {label}
            </label>
        </div>
    );
}

export default Checkbox;
