import { useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ClipboardCopy, QrCode } from 'lucide-react';
import { BLOOD_GROUPS, AVAILABILITY_OPTIONS } from '../constants';
import { createDonor, fetchDonors } from '../api/client';
import DonorForm from '../components/DonorForm';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import QRPreview from '../components/QRPreview';
import { formatDate } from '../utils/formatters';

const Donors = () => {
  const [filters, setFilters] = useState({ q: '', bloodGroup: '', status: '' });
  const [selectedDonor, setSelectedDonor] = useState(null);
  const queryClient = useQueryClient();

  const queryKey = useMemo(() => ['donors', filters], [filters]);

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => fetchDonors({ ...filters, limit: 50 }),
  });

  const createMutation = useMutation({
    mutationFn: createDonor,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const columns = [
    {
      key: 'name',
      label: 'Donor',
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
      key: 'phone',
      label: 'Phone',
    },
    {
      key: 'availabilityStatus',
      label: 'Status',
      render: (value) => <span className={`pill ${value}`}>{value}</span>,
    },
    {
      key: 'createdAt',
      label: 'Registered',
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

  const handleCopy = (donor) => {
    navigator.clipboard.writeText(`${donor.name} • ${donor.phone}`);
  };

  return (
    <section className="page">
      <div className="grid two">
        <div className="panel">
          <header>
            <p className="eyebrow">Directory</p>
            <h3>Donor records</h3>
          </header>

          <div className="filters">
            <input
              placeholder="Search name or city"
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
            <select value={filters.status} onChange={(event) => setFilters((prev) => ({ ...prev, status: event.target.value }))}>
              <option value="">All statuses</option>
              {AVAILABILITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {isLoading ? (
            <p>Loading donors...</p>
          ) : (
            <DataTable
              columns={columns}
              data={data?.data}
              renderActions={(row) => (
                <div className="action-bar">
                  <button className="ghost" onClick={() => handleCopy(row)} title="Copy contact">
                    <ClipboardCopy size={16} />
                  </button>
                  <button className="ghost" onClick={() => setSelectedDonor(row)} title="Show QR">
                    <QrCode size={16} />
                  </button>
                </div>
              )}
            />
          )}
        </div>
        <DonorForm onSubmit={handleSubmit} loading={createMutation.isPending} />
      </div>

      <Modal
        open={Boolean(selectedDonor)}
        onClose={() => setSelectedDonor(null)}
        title={selectedDonor ? `${selectedDonor.name} · ${selectedDonor.bloodGroup}` : 'Donor QR'}
      >
        {selectedDonor && <QRPreview donor={selectedDonor} />}
      </Modal>
    </section>
  );
};

export default Donors;
