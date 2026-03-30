const features = [
  {
    title: 'Automated compatibility',
    description: 'Pair donors and acceptors using the WHO compatibility matrix with optional exact-match rules.',
  },
  {
    title: 'Modern ops console',
    description: 'Realtime dashboards, quick filters, and QR cards keep coordinators in sync.',
  },
  {
    title: 'Mobile-first experience',
    description: 'Optimized layouts adapt seamlessly from widescreen kiosks to handheld devices.',
  },
];

const About = () => (
  <section className="page">
    <div className="panel">
      <header>
        <p className="eyebrow">About</p>
        <h3>Why this project exists</h3>
      </header>
      <p>
        The Blood Bank Management System orchestrates donor registrations, patient requests, and compatibility
        checks for hospitals and NGOs. It is built on a MERN stack, uses MongoDB for resilient storage, Express for
        API orchestration, React for the operator console, and Node.js for automation workflows.
      </p>
    </div>
    <div className="grid three">
      {features.map((feature) => (
        <div className="panel" key={feature.title}>
          <p className="eyebrow">{feature.title}</p>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default About;
