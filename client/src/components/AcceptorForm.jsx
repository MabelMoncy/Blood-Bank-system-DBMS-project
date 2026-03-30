import { useState } from 'react';
import { BLOOD_GROUPS, GENDERS, URGENCY_LEVELS } from '../constants';

const initialState = {
  name: '',
  age: 30,
  gender: 'Female',
  bloodGroup: 'A+',
  phone: '',
  email: '',
  city: '',
  hospital: '',
  urgencyLevel: 'medium',
};

const AcceptorForm = ({ onSubmit, loading }) => {
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
        <p className="eyebrow">New Request</p>
        <h3>Register acceptor</h3>
      </header>
      <div className="form-grid">
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Age
          <input name="age" type="number" min="1" max="99" value={form.age} onChange={handleChange} required />
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
          <input name="email" type="email" value={form.email} onChange={handleChange} />
        </label>
        <label>
          City
          <input name="city" value={form.city} onChange={handleChange} required />
        </label>
        <label>
          Hospital
          <input name="hospital" value={form.hospital} onChange={handleChange} />
        </label>
        <label>
          Urgency
          <select name="urgencyLevel" value={form.urgencyLevel} onChange={handleChange}>
            {URGENCY_LEVELS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button type="submit" className="primary" disabled={loading}>
        {loading ? 'Saving...' : 'Register Request'}
      </button>
    </form>
  );
};

export default AcceptorForm;
