import mongoose from 'mongoose';
const projectSchema = mongoose.Schema({

tittle: String,
description: String,
createdBy :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
}

});
const Project = mongoose.model("Project", projectSchema);

export default Project;