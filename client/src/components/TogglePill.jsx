const TogglePill = ({ label, checked, onChange }) => (
  <label className={`toggle-pill ${checked ? 'checked' : ''}`}>
    <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
    <span />
    {label}
  </label>
);

export default TogglePill;
