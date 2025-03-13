import Entry from '../models/entry.model.js'

export const createEntry = async (req, res) => {
    try {
        const uid = req.user._id;
        let { date, text } = req.body;

        if (!date || !text) return res.status(400).json('All fields are required');

        const newEntry = new Entry({ text, date, uid });

        await newEntry.save();

        res.status(201).json({ newEntry });

    } catch (error) {
        if (error.name === 'ValidationError') return res.status(400).json({ message: 'Invalid datatype' });

        console.error('Error in creating new entry', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getDiary = async (req, res) => {
    try {
        const uid = req.user._id;

        const diary = await Entry.find({ uid });

        res.status(200).json({ diary });

    } catch (error) {
        console.error('Error in fetching diary', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateEntry = async (req, res) => {
    try {
        const { eid } = req.params;
        const uid = req.user._id;
        let { date, text } = req.body;

        if (!date || !text) return res.status(400).json('All fields are required');

        const updatedEntry = await Entry.findOneAndUpdate({ _id: eid, uid }, { date, text }, { new: true })

        if (!updatedEntry) return res.status(404).json({ message: 'Entry not found' });

        res.status(200).json({ updatedEntry });

    } catch (error) {
        if (error.name === 'ValidationError') return res.status(400).json({ message: 'Invalid datatype' });

        console.error('Error in updating entry', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteEntry = async (req, res) => {
    try {
        const { eid } = req.params;
        const uid = req.user._id;

        const deletedEntry = await Entry.findOneAndDelete({ _id: eid, uid });

        if (!deletedEntry) return res.status(404).json({ message: 'Entry not found' });
        res.status(200).json({ message: 'Entry deleted' });

    } catch (error) {
        console.error('Error in deleting entry', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteDiary = async (req, res) => {
    try {
        const uid = req.user._id;

        await Entry.deleteMany({ uid });

        res.status(200).json({ message: 'Diary deleted' });

    } catch (error) {
        console.error('Error in deleting diary', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
