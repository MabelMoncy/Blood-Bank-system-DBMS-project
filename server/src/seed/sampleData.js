const dotenv = require('dotenv');
const dayjs = require('dayjs');
const connectDB = require('../config/db');
const Donor = require('../models/Donor');
const Acceptor = require('../models/Acceptor');

dotenv.config();

const donors = [
  {
    name: 'Roy CJ',
    age: 29,
    gender: 'Male',
    bloodGroup: 'O+',
    phone: '7001234567',
    email: 'roy.cj@example.com',
    city: 'Pathanamthitta',
    lastDonationAt: dayjs().subtract(60, 'day').toDate(),
  },
  {
    name: 'Binoy Kurian',
    age: 34,
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '7012345678',
    email: 'binoy@example.com',
    city: 'Alappuzha',
    lastDonationAt: dayjs().subtract(45, 'day').toDate(),
  },
  {
    name: 'Riya Mathew',
    age: 23,
    gender: 'Female',
    bloodGroup: 'B-',
    phone: '7023456789',
    email: 'riya@example.com',
    city: 'Kochi',
  },
  {
    name: 'Sam Varghese',
    age: 32,
    gender: 'Male',
    bloodGroup: 'O-',
    phone: '7034567890',
    email: 'sam@example.com',
    city: 'Chengannur',
  },
  {
    name: 'Divya Nair',
    age: 27,
    gender: 'Female',
    bloodGroup: 'O-',
    phone: '7045678901',
    email: 'divya@example.com',
    city: 'Mavelikara',
  },
  {
    name: 'Indu Raj',
    age: 30,
    gender: 'Female',
    bloodGroup: 'O+',
    phone: '7056789012',
    email: 'indu@example.com',
    city: 'Kallisery',
  },
  {
    name: 'Ram Mohan',
    age: 35,
    gender: 'Male',
    bloodGroup: 'A-',
    phone: '7067890123',
    email: 'ram@example.com',
    city: 'Chengannur',
  },
  {
    name: 'Sanha Paul',
    age: 28,
    gender: 'Female',
    bloodGroup: 'A+',
    phone: '7078901234',
    email: 'sanha@example.com',
    city: 'Thiruvalla',
  },
];

const acceptors = [
  {
    name: 'Riya Mathew',
    age: 25,
    gender: 'Female',
    bloodGroup: 'A+',
    phone: '9089700001',
    email: 'riya.m@example.com',
    city: 'Pathanamthitta',
    hospital: 'City Hospital',
    urgencyLevel: 'high',
  },
  {
    name: 'Neha S',
    age: 21,
    gender: 'Female',
    bloodGroup: 'B-',
    phone: '9089700002',
    city: 'Kochi',
    hospital: 'Lakeside Care',
    urgencyLevel: 'medium',
  },
  {
    name: 'Vishnu V',
    age: 31,
    gender: 'Male',
    bloodGroup: 'AB+',
    phone: '9089700003',
    city: 'Thiruvalla',
    hospital: 'St. Marys',
    urgencyLevel: 'critical',
  },
  {
    name: 'Varun K',
    age: 29,
    gender: 'Male',
    bloodGroup: 'AB-',
    phone: '9089700004',
    city: 'Chengannur',
    hospital: 'Metro Care',
    urgencyLevel: 'high',
  },
  {
    name: 'James Thomas',
    age: 45,
    gender: 'Male',
    bloodGroup: 'AB+',
    phone: '9089700005',
    city: 'Mavelikara',
    hospital: 'Sunrise Clinic',
    urgencyLevel: 'medium',
  },
  {
    name: 'Rajeev S',
    age: 39,
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '9089700006',
    city: 'Kallisery',
    hospital: 'LifeCare',
    urgencyLevel: 'high',
  },
  {
    name: 'Shilpa Devi',
    age: 33,
    gender: 'Female',
    bloodGroup: 'AB-',
    phone: '9089700007',
    city: 'Kochi',
    hospital: 'City Hospital',
    urgencyLevel: 'medium',
  },
  {
    name: 'Suraj P',
    age: 37,
    gender: 'Male',
    bloodGroup: 'A+',
    phone: '9089700008',
    city: 'Thiruvalla',
    hospital: 'Metro Care',
    urgencyLevel: 'low',
  },
];

const seedDatabase = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    await Promise.all([Donor.deleteMany(), Acceptor.deleteMany()]);
    await Donor.insertMany(donors);
    await Acceptor.insertMany(acceptors);
    console.log('Sample data inserted');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed', error);
    process.exit(1);
  }
};

seedDatabase();
