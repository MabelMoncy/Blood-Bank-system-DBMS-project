import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMatches } from '../api/client';
import MatchList from '../components/MatchList';
import TogglePill from '../components/TogglePill';

const Matching = () => {
  const [filters, setFilters] = useState({ city: '', preferExact: false });

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['matches', filters],
    queryFn: () => fetchMatches({ ...filters }),
  });

  return (
    <section className="page">
      <div className="panel">
        <header>
          <p className="eyebrow">Matching center</p>
          <h3>Total matches: {data?.total ?? 0}</h3>
        </header>

        <div className="matching-controls">
          <input
            placeholder="Filter by city"
            value={filters.city}
            onChange={(event) => setFilters((prev) => ({ ...prev, city: event.target.value }))}
          />
          <TogglePill
            label="Prefer exact blood group"
            checked={filters.preferExact}
            onChange={(checked) => setFilters((prev) => ({ ...prev, preferExact: checked }))}
          />
          <button className="primary" onClick={() => refetch()} disabled={isFetching}>
            {isFetching ? 'Checking...' : 'Check matches now'}
          </button>
        </div>

        <MatchList matches={data?.matches} />
      </div>
    </section>
  );
};

export default Matching;
