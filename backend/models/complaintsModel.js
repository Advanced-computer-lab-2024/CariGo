const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for the complaint']
    },
    body: {
        type: String,
        required: [true, 'Please provide the details of the complaint']
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Resolved'],
        default: 'Pending'
    },
    reply: {
        type: String
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Complaint must belong to a user']
    }
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
