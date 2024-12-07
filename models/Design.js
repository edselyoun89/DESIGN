const mongoose = require('mongoose');

// Схема для дизайнов
const DesignSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Design', DesignSchema);
