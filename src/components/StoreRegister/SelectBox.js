import React from 'react';

const SelectBox = ({ name, options, value, onChange }) => {
  return (
    <select name={name} value={value} onChange={onChange}>
      {
        options.map((opt)=> (
          <option
            key={opt.value}
            value={opt.value}
          >
            {opt.name}
          </option>
        ))
      }
    </select>
  );
};

export default SelectBox;