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
        type: String,
        ref: 'District',
        required: true,
    },
    urgencyScore: {
        type: Number,
        default: 0
    },
    urgencyLevel: {
        type: String,
        default: 'Low'
    }
});

export default mongoose.model('Complaint', complaintSchema);