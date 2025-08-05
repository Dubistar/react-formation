/**
 * Input component for text input fields
 * @param {string} placeholder - Placeholder text for the input field
 * @param {string} value - Current value of the input field
 * @param {s:string => void} onChange - Callback function to handle changes in the input field
 */

export function Input({ placeholder, value, onChange }) {
  return (
    <input
      type="text"
      className="form-control"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
