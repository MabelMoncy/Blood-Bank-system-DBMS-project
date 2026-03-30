const EmptyState = ({ title = 'Nothing to show yet', message = 'When data arrives it will appear here.' }) => (
  <div className="empty-state">
    <p className="eyebrow">{title}</p>
    <p>{message}</p>
  </div>
);

export default EmptyState;
