const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        allowNull: false,
    }
});

module.exports = mongoose.model('Cart', cartSchema);