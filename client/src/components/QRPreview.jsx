import QRCode from 'react-qr-code';
import { formatDate } from '../utils/formatters';

const formatPayload = (donor) =>
  `DONOR\nName: ${donor.name}\nGender: ${donor.gender}\nGroup: ${donor.bloodGroup}\nCity: ${donor.city}\nPhone: ${donor.phone}\nEmail: ${donor.email}`;

const QRPreview = ({ donor }) => (
  <div className="qr-preview">
    <QRCode value={formatPayload(donor)} size={256} bgColor="#fff" fgColor="#d7263d" />
    <div className="qr-details">
      <p>
        <strong>{donor.name}</strong>
      </p>
      <p>{donor.city}</p>
      <p>{donor.email}</p>
      <p>Last donation: {formatDate(donor.lastDonationAt)}</p>
    </div>
  </div>
);

export default QRPreview;
