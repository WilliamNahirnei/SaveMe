import React from 'react';

const Input = ({ id, label, type, placeholder, value, onChange, required, error }) => {
    return (
        <div className="m-3">
            <label htmlFor={id} className="form-label">{label}</label>
            <input
                id={id}
                type={type}
                className={`form-control ${error ? 'border-red-500' : ''}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default Input;