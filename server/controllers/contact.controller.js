import Contact from '../models/Contact.model.js';

const COLORS = ['#7F77DD','#1D9E75','#D85A30','#378ADD','#D4537E','#BA7517','#0F6E56'];
const getAvatarColor = (name) => COLORS[name.charCodeAt(0) % COLORS.length];

export const getContacts = async (req, res, next) => {
  try {
    const { search, tag, page = 1, limit = 20 } = req.query;
    const filter = { user: req.user.id, isDeleted: false };

    if (search) filter.$text = { $search: search };
    if (tag)    filter.tag = tag;

    const contacts = await Contact.find(filter)
      .sort({ pinned: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Contact.countDocuments(filter);
    res.json({ contacts, total, page: Number(page) });
  } catch (err) { next(err); }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, tag, notes } = req.body;
    const contact = await Contact.create({
      user: req.user.id, name, email,
      phone: phone || '',
      tag: tag || 'other',
      notes: notes || '',
      avatarColor: getAvatarColor(name),
    });
    res.status(201).json({ contact });
  } catch (err) { next(err); }
};

export const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, user: req.user.id });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ contact });
  } catch (err) { next(err); }
};

export const updateContact = async (req, res, next) => {
  try {
    const { name, email, phone, tag, notes, pinned } = req.body;
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { name, email, phone, tag, notes, pinned,
        avatarColor: getAvatarColor(name) },
      { new: true, runValidators: true }
    );
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ contact });
  } catch (err) { next(err); }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { isDeleted: true },
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Moved to trash' });
  } catch (err) { next(err); }
};

export const restoreContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { isDeleted: false },
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ contact });
  } catch (err) { next(err); }
};

export const getTrash = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ user: req.user.id, isDeleted: true })
      .sort({ updatedAt: -1 });
    res.json({ contacts });
  } catch (err) { next(err); }
};

export const getStats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const total = await Contact.countDocuments({ user: userId, isDeleted: false });
    const byTag = await Contact.aggregate([
      { $match: { user: userId, isDeleted: false } },
      { $group: { _id: '$tag', count: { $sum: 1 } } }
    ]);
    const recentCount = await Contact.countDocuments({
      user: userId, isDeleted: false,
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });
    res.json({ total, byTag, recentCount });
  } catch (err) { next(err); }
};
