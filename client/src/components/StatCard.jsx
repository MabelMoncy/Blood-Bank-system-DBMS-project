const StatCard = ({ label, value, delta, icon: Icon, accent = 'var(--accent)' }) => (
  <div className="stat-card">
    <div className="stat-icon" style={{ background: accent }}>
      {Icon && <Icon size={18} />}
    </div>
    <div>
      <p className="label">{label}</p>
      <div className="stat-value">{value ?? '—'}</div>
      {delta && <p className="delta">{delta}</p>}
    </div>
  </div>
);

export default StatCard;
