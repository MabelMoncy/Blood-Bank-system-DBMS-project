import { useQuery } from '@tanstack/react-query';
import { Users, UserCheck, Activity, Clock } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';
import { fetchStats } from '../api/client';
import StatCard from '../components/StatCard';
import FloatingBubbles from '../components/FloatingBubbles';
import EmptyState from '../components/EmptyState';
import { formatDate } from '../utils/formatters';

const Dashboard = () => {
  const { data: stats, isLoading } = useQuery({ queryKey: ['stats'], queryFn: fetchStats });

  const chartData = stats?.donorByGroup?.map((item) => ({ group: item._id, count: item.count })) ?? [];

  return (
    <section className="page dashboard">
      <FloatingBubbles />
      <div className="hero-card">
        <p className="eyebrow">Donate blood, save life</p>
        <h2>Coordinated donor and acceptor management made simple.</h2>
        <p>Track registrations, respond to urgent requests, and surface perfect matches in seconds.</p>
        <div className="hero-counters">
          <div>
            <span>Donors</span>
            <strong>{stats?.donorCount ?? '—'}</strong>
          </div>
          <div>
            <span>Acceptors</span>
            <strong>{stats?.acceptorCount ?? '—'}</strong>
          </div>
          <div>
            <span>Available</span>
            <strong>{stats?.availableDonors ?? '—'}</strong>
          </div>
        </div>
      </div>

      <div className="grid three">
        <StatCard label="Verified donors" value={stats?.donorCount ?? '—'} icon={Users} accent="var(--rose)" delta="+12 this month" />
        <StatCard label="Waiting acceptors" value={stats?.waitingAcceptors ?? '—'} icon={UserCheck} accent="var(--amber)" delta="4 critical" />
        <StatCard label="Available donors" value={stats?.availableDonors ?? '—'} icon={Activity} accent="var(--mint)" delta="Ready to deploy" />
      </div>

      <div className="panel chart">
        <header>
          <p className="eyebrow">Blood inventory snapshot</p>
          <h3>Donor mix by blood group</h3>
        </header>
        {isLoading ? (
          <EmptyState message="Loading statistics..." />
        ) : chartData.length ? (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData} margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff5c8d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ff5c8d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="group" stroke="var(--text-soft)" />
              <Tooltip formatter={(value) => [`${value} donors`, 'Count']} />
              <Area type="monotone" dataKey="count" stroke="#ff5c8d" fillOpacity={1} fill="url(#colorCount)" />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <EmptyState message="No donors yet. Add records to visualize the distribution." />
        )}
      </div>

      <div className="grid two">
        <div className="panel">
          <header>
            <p className="eyebrow">Recent donors</p>
            <h3>Latest registrations</h3>
          </header>
          {stats?.recentDonors?.length ? (
            <ul className="recent-list">
              {stats.recentDonors.map((donor) => (
                <li key={donor._id}>
                  <div>
                    <strong>{donor.name}</strong>
                    <p>{donor.city}</p>
                  </div>
                  <div>
                    <span className="pill">{donor.bloodGroup}</span>
                    <p>{formatDate(donor.createdAt)}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState message="No donor data yet." />
          )}
        </div>
        <div className="panel">
          <header>
            <p className="eyebrow">Incoming requests</p>
            <h3>New acceptors</h3>
          </header>
          {stats?.recentAcceptors?.length ? (
            <ul className="recent-list">
              {stats.recentAcceptors.map((acceptor) => (
                <li key={acceptor._id}>
                  <div>
                    <strong>{acceptor.name}</strong>
                    <p>{acceptor.city}</p>
                  </div>
                  <div>
                    <span className="pill urgency">{acceptor.urgencyLevel}</span>
                    <p>{formatDate(acceptor.createdAt)}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState message="No acceptor records yet." />
          )}
        </div>
      </div>

      <div className="panel subtle">
        <Clock size={18} />
        <div>
          <p className="eyebrow">Live status</p>
          <p>System time synced to {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
