import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    accountId: { type: String, required: true }
});

export const Device = mongoose.model('Device', deviceSchema);