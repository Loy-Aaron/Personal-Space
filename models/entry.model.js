import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    uid: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Entry = mongoose.model('Entry', entrySchema);

export default Entry;