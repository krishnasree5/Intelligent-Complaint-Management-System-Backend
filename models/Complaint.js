import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District',
        required: true,
    }
});

export default mongoose.model('Complaint', complaintSchema);