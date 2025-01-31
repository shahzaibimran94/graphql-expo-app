import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }
});

export const Account = mongoose.model('Account', accountSchema);