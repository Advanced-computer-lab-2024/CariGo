const Complaint = require('../models/complaintsModel');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.fileComplaint = catchAsync(async (req, res, next) => {
    const { title, body } = req.body;
    
    const newComplaint = await Complaint.create({
        title,
        body,
        user: req.user._id
    });

    res.status(201).json({
        status: 'success',
        data: {
            complaint: newComplaint
        }
    });
});

exports.getAllComplaints = catchAsync(async (req, res, next) => {
    const complaints = await Complaint.find().sort('date');

    res.status(200).json({
        status: 'success',
        results: complaints.length,
        data: {
            complaints
        }
    });
});

exports.getComplaint = catchAsync(async (req, res, next) => {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
        return next(new AppError('No complaint found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            complaint
        }
    });
});

exports.updateComplaintStatus = catchAsync(async (req, res, next) => {
    const complaint = await Complaint.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    }, { new: true, runValidators: true });

    if (!complaint) {
        return next(new AppError('No complaint found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            complaint
        }
    });
});

exports.replyToComplaint = catchAsync(async (req, res, next) => {
    const complaint = await Complaint.findByIdAndUpdate(req.params.id, {
        reply: req.body.reply
    }, { new: true, runValidators: true });

    if (!complaint) {
        return next(new AppError('No complaint found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            complaint
        }
    });
});

exports.getComplaintsByStatus = catchAsync(async (req, res, next) => {
    const complaints = await Complaint.find({ status: req.params.status });

    res.status(200).json({
        status: 'success',
        results: complaints.length,
        data: {
            complaints
        }
    });
});

exports.getMyComplaints = catchAsync(async (req, res, next) => {
    const complaints = await Complaint.find({ user: req.user._id });

    res.status(200).json({
        status: 'success',
        results: complaints.length,
        data: {
            complaints
        }
    });
});
