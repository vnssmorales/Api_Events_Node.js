const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true},
    category: { type: String, required: true},
    date: { type: Date, required: true},
    description: String,
    image: String,
    place: String,
    price: Number,
    capacity: Number,
    assistance: Number,
    estimate: Number,
})

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;