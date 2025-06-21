
import Issue from "../model/issue.js";

//create issue
export const createIssue = async (req, res) => {
 const { title, description, projectId, assignedTo, priority = 'Medium', status = 'open' } = req.body;
    try {
        if (!title || !description || !projectId || !assignedTo) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newIssue = new Issue({
            title,
            description,
            projectId,
            assignedTo,
            priority,
            status,
            createdBy: req.user._id
        })
        await newIssue.save();
        res.status(201).json({ message: "Issue Created", newIssue });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


//get all issues per project
export const getIssueByProject = async (req, res) => {
    try {

        const filter = {}
        if (req.query.projectId) {
            filter.projectId = req.query.projectId;
        }
        const issues = await Issue.find(filter)
            .populate('createdBy', 'name')
            .populate('assignedTo', 'name')
            .populate('projectId', 'name');
        res.status(200).json({ message: "Issues fetched successfully", issues });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


//get issue by id
export const getIssueById = async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id)
            .populate('createdBy', 'name')
            .populate('assignedTo', 'name')
            .populate('projectId', 'name');
        if (!issue) {
            return res.status(404).json({ message: "Issue not found" });
        }
        res.status(200).json({ message: "Issue fetched successfully", issue });

    } catch (error) {

        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


//update issue
export const updateIssue = async (req, res) => {
      const { title, description, projectId, assignedTo, priority, status } = req.body;
    try {

        const updateIssue = await Issue.findByIdAndUpdate(
            req.params.id,
            {
                ...(title && { title }),
                ...(description && { description }),
                ...(projectId && { projectId }),
                ...(assignedTo && { assignedTo }),
                ...(priority && { priority }),
                ...(status && { status })
            },
            { new: true }
        );
        if (!updateIssue) {
            return res.status(404).json({ message: "Issue not found" });
        }
        res.status(200).json({ message: "Issue updated successfully", updateIssue });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

//delete issue
export const deleteIssue = async (req, res) => {
    try {
        const deleteIssue = await Issue.findById(req.params.id);
        if (!deleteIssue) {
            return res.status(404).json({ message: "Issue not found" });
        }
        if (deleteIssue.createdBy.toString() !== req.user.userId && req.user.role !== 'Admin') {
            return res.status(403).json({ message: "You are not authorized to delete this issue" });
        }
        await deleteIssue.deleteOne();
        res.status(200).json({ message: "Issue deleted successfully" });

    } catch (error) {

        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}