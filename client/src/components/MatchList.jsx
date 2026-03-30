import { Sparkles, MapPin, Phone } from 'lucide-react';
import EmptyState from './EmptyState';

const MatchList = ({ matches }) => {
  if (!matches?.length) {
    return <EmptyState title="No compatible pairs" message="Adjust filters or sync new data to see matches." />;
  }

  return (
    <ul className="match-list">
      {matches.map((match) => (
        <li key={`${match.donor.id}-${match.acceptor.id}`}>
          <Sparkles size={16} />
          <div>
            <p>
              <strong>{match.donor.name}</strong> ({match.donor.bloodGroup}) → <strong>{match.acceptor.name}</strong> ({match.acceptor.bloodGroup})
            </p>
            <p className="meta">
              <MapPin size={14} /> {match.donor.city} → {match.acceptor.city} • {match.acceptor.urgencyLevel.toUpperCase()} urgency
            </p>
            <p className="meta">
              <Phone size={14} /> {match.donor.phone}
            </p>
          </div>
          <span className={`pill ${match.compatibility}`}>{match.compatibility}</span>
        </li>
      ))}
    </ul>
  );
};

export default MatchList;
