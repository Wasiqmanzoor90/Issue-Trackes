import Project from '../model/project.js';


// Create a new project
export const createProject = async (req, res) => {
    try {
        const {title, description} = req.body;
        const newProject = new Project({
            title,
            description,
            createdBy: req.user.UserId // Use UserId instead of _id
        })
     await newProject.save(); 
        res.status(201).json({ message: 'Project created', project: newProject })
    } catch (error) {
        res.status(500).json({ message: 'Error creating project', error: error.message });
    }
};


// Get all projects
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('createdBy', 'name email');
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching projects', error: err.message });
    }
};



// Get all projects created by a specific user
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params; // 👈 this is userId

    const projects = await Project.find({ createdBy: id }).populate('createdBy', 'name email');

    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: 'No projects found for this user' });
    }

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user projects', error: error.message });
  }
};



//delete a project
// Ensure the user is authorized to delete the project
export const deleteProject = async (req, res) => {
    try {
      
        
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        
        // Add safety checks
        if (!project.createdBy) {
            return res.status(500).json({ message: 'Project missing createdBy field' });
        }
        
        if (!req.user.UserId) {
            return res.status(500).json({ message: 'User ID missing from token' });
        }
        
        if (project.createdBy.toString() !== req.user.UserId.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this project' });
        }
        
        await project.deleteOne();
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Delete error:', error); // Debug: see full error
        res.status(500).json({ message: 'Error deleting project', error: error.message });
    }
}