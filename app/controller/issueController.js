
import Issue from "../model/issue.js";
import mongoose from "mongoose";
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
         const userId = req.params.id;

    const issues = await Issue.find({ assignedTo: userId })
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('projectId', 'name description')
      .sort({ createdAt: -1 });

    if (!issues.length) {
      return res.status(404).json({ message: "No issues assigned to this user" });
    }

    res.status(200).json({
      message: "Assigned issues fetched successfully",
      count: issues.length,
      issues,
    });
    } catch (error) {

        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


//update issue
export const updateIssue = async (req, res) => {
  const { issueId, userId } = req.params;
  const { title, description, projectId, assignedTo, priority, status } = req.body;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(issueId)) {
    return res.status(400).json({ message: "Invalid issue ID format" });
  }

  try {
    const issue = await Issue.findById(issueId);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    // Check if the user is allowed to update the issue
    if (issue.assignedTo?.toString() !== userId) {
      return res.status(403).json({ message: "Only the assigned user can update this issue" });
    }

    // Update fields only if provided
    if (title?.trim()) issue.title = title.trim();
    if (description?.trim()) issue.description = description.trim();
    if (projectId && mongoose.Types.ObjectId.isValid(projectId)) issue.projectId = projectId;
    if (assignedTo && mongoose.Types.ObjectId.isValid(assignedTo)) issue.assignedTo = assignedTo;
    if (["Low", "Medium", "High"].includes(priority)) issue.priority = priority;
    if (["Open", "In Progress", "Closed"].includes(status)) issue.status = status;

    await issue.save();

    res.status(200).json({
      message: "Issue updated successfully",
      issue,
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


export const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    const userId = req.user.id?.toString();
    const assignedTo = issue.assignedTo?.toString();
    const createdBy = issue.createdBy?.toString();

    // Allow delete if the user is either the assignee, the creator, or an admin
    if (userId !== assignedTo && userId !== createdBy && req.user.role !== "Admin") {
      return res.status(403).json({
        message: "Only assigned user, creator, or admin can delete this issue",
      });
    }

    await issue.deleteOne();
    return res.status(200).json({ message: "Issue deleted successfully" });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};