import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BLOOD_GROUPS, URGENCY_LEVELS } from '../constants';
import { createAcceptor, fetchAcceptors } from '../api/client';
import AcceptorForm from '../components/AcceptorForm';
import DataTable from '../components/DataTable';
import { formatDate } from '../utils/formatters';

const Acceptors = () => {
  const [filters, setFilters] = useState({ q: '', bloodGroup: '', urgency: '' });
  const queryClient = useQueryClient();
  const queryKey = useMemo(() => ['acceptors', filters], [filters]);

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => fetchAcceptors({ ...filters, limit: 50 }),
  });

  const createMutation = useMutation({
    mutationFn: createAcceptor,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const columns = [
    {
      key: 'name',
      label: 'Patient',
      render: (_, row) => (
        <div>
          <strong>{row.name}</strong>
          <p>{row.city}</p>
        </div>
      ),
    },
    {
      key: 'bloodGroup',
      label: 'Group',
      render: (value) => <span className="pill">{value}</span>,
    },
    {
      key: 'hospital',
      label: 'Hospital',
    },
    {
      key: 'urgencyLevel',
      label: 'Urgency',
      render: (value) => <span className={`pill urgency ${value}`}>{value}</span>,
    },
    {
      key: 'createdAt',
      label: 'Requested',
      render: (value) => formatDate(value),
    },
  ];

  const handleSubmit = (payload, onDone) => {
    createMutation.mutate(payload, {
      onSuccess: () => {
        if (onDone) onDone();
      },
    });
  };

  return (
    <section className="page">
      <div className="grid two">
        <div className="panel">
          <header>
            <p className="eyebrow">Requests</p>
            <h3>Acceptor records</h3>
          </header>

          <div className="filters">
            <input
              placeholder="Search name, city, hospital"
              value={filters.q}
              onChange={(event) => setFilters((prev) => ({ ...prev, q: event.target.value }))}
            />
            <select value={filters.bloodGroup} onChange={(event) => setFilters((prev) => ({ ...prev, bloodGroup: event.target.value }))}>
              <option value="">All groups</option>
              {BLOOD_GROUPS.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
            <select value={filters.urgency} onChange={(event) => setFilters((prev) => ({ ...prev, urgency: event.target.value }))}>
              <option value="">Any urgency</option>
              {URGENCY_LEVELS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {isLoading ? <p>Loading acceptors...</p> : <DataTable columns={columns} data={data?.data} />}
        </div>
        <AcceptorForm onSubmit={handleSubmit} loading={createMutation.isPending} />
      </div>
    </section>
  );
};

export default Acceptors;
