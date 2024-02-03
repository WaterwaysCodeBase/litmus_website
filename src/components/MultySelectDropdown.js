import React from "react";
import Select from "react-select";
import { useField } from "formik";

const MultiSelectDropdown = ({ label, options, ...props }) => {
  const [field, meta, helpers] = useField(props);

  const handleChange = (selectedOptions) => {
    helpers.setValue(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <Select
        {...field}
        {...props}
        isMulti
        options={options}
        onChange={handleChange}
        onBlur={() => helpers.setTouched(true)}
      />
      {meta.touched && meta.error && (
        <div style={{ color: "red" }}>{meta.error}</div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
