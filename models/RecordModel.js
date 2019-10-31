const mongoose = require('mongoose');
const { Schema } = mongoose;

const recordModel = new Schema({
    key: String,
    value: String,
    counts: [Number],
    createdAt: Date
});

mongoose.model('records', recordModel);
