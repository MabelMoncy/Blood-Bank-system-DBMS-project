import { useState } from 'react';
import { BLOOD_GROUPS, GENDERS, AVAILABILITY_OPTIONS } from '../constants';

const initialState = {
  name: '',
  age: 25,
  gender: 'Male',
  bloodGroup: 'O+',
  phone: '',
  email: '',
  city: '',
  availabilityStatus: 'available',
};

const DonorForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form, () => setForm(initialState));
  };

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <header>
        <p className="eyebrow">New Donor</p>
        <h3>Register donor</h3>
      </header>
      <div className="form-grid">
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Age
          <input name="age" type="number" min="18" max="65" value={form.age} onChange={handleChange} required />
        </label>
        <label>
          Gender
          <select name="gender" value={form.gender} onChange={handleChange}>
            {GENDERS.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </label>
        <label>
          Blood Group
          <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange}>
            {BLOOD_GROUPS.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </label>
        <label>
          Phone
          <input name="phone" value={form.phone} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          City
          <input name="city" value={form.city} onChange={handleChange} required />
        </label>
        <label>
          Status
          <select name="availabilityStatus" value={form.availabilityStatus} onChange={handleChange}>
            {AVAILABILITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button type="submit" className="primary" disabled={loading}>
        {loading ? 'Saving...' : 'Register Donor'}
      </button>
    </form>
  );
};

export default DonorForm;
