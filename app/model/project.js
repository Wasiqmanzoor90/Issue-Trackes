import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
    title: String, // ✅ Fixed spelling
    description: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // ✅ Added required
    }
});

const Project = mongoose.model("Project", projectSchema);
export default Project;