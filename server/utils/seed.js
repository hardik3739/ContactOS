import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.model.js';
import Contact from '../models/Contact.model.js';

dotenv.config();

const COLORS = ['#7F77DD', '#1D9E75', '#D85A30', '#378ADD', '#D4537E', '#BA7517'];
const getColor = (name) => COLORS[name.charCodeAt(0) % COLORS.length];

const demoContacts = [
  { name: 'Aryan Mehta',    email: 'aryan@work.com',   phone: '+91 98100 11111', tag: 'work'     },
  { name: 'Priya Sharma',   email: 'priya@gmail.com',  phone: '+91 98200 22222', tag: 'personal' },
  { name: 'Rahul Verma',    email: 'rahul@corp.io',    phone: '+91 98300 33333', tag: 'work'     },
  { name: 'Sneha Patel',    email: 'sneha@family.net', phone: '+91 98400 44444', tag: 'family'   },
  { name: 'Dev Anand',      email: 'dev@startup.in',   phone: '+91 98500 55555', tag: 'work'     },
  { name: 'Kavita Rao',     email: 'kavita@home.com',  phone: '+91 98600 66666', tag: 'family'   },
  { name: 'Nikhil Kumar',   email: 'nikhil@tech.co',   phone: '+91 98700 77777', tag: 'work'     },
  { name: 'Riya Joshi',     email: 'riya@design.io',   phone: '+91 98800 88888', tag: 'personal' },
  { name: 'Aditya Singh',   email: 'aditya@law.com',   phone: '+91 98900 99999', tag: 'other'    },
  { name: 'Meera Nair',     email: 'meera@hr.in',      phone: '+91 98000 00000', tag: 'work'     },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  
  let user = await User.findOne({ email: 'demo@contactos.app' });
  if (!user) {
    user = await User.create({ name: 'Demo User', email: 'demo@contactos.app', password: 'demo1234' });
  }

  await Contact.deleteMany({ user: user._id });

  const contacts = demoContacts.map(c => ({
    ...c, user: user._id, avatarColor: getColor(c.name)
  }));

  await Contact.insertMany(contacts);
  console.log('Seeded 10 demo contacts for demo@contactos.app / demo1234');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
