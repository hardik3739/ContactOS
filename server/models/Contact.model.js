import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name:        { type: String, required: true, trim: true },
    email:       { type: String, required: true, lowercase: true, trim: true },
    phone:       { type: String, trim: true, default: '' },
    tag:         { type: String, enum: ['work', 'personal', 'family', 'other'], default: 'other' },
    notes:       { type: String, maxlength: 500, default: '' },
    avatarColor: { type: String, default: '#7F77DD' },
    pinned:      { type: Boolean, default: false },
    isDeleted:   { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Text index for full-text search
contactSchema.index({ name: 'text', email: 'text', phone: 'text' });
// Compound indexes for common queries
contactSchema.index({ user: 1, isDeleted: 1 });
contactSchema.index({ user: 1, tag: 1 });

export default mongoose.model('Contact', contactSchema);
