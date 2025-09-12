import Complaint from "../models/Complaint.js";

// Submit a complaint
export const submitComplaint = async (req, res) => {
  const { title, description, location } = req.body;
  const userId = req.user.id; // Get userId from the authenticated user
  const district = req.user.district; // Get district from the authenticated user

  try {
    const newComplaint = new Complaint({
      userId,
      title,
      description,
      location,
      status: "Pending",
      createdAt: new Date(),
      district,
    });

    const savedComplaint = await newComplaint.save();
    res.status(201).json(savedComplaint);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting complaint", error: error.message });
  }
};

// Get all complaints for the logged-in user
export const getUserComplaints = async (req, res) => {
  const userId = req.user.id;

  try {
    const complaints = await Complaint.find({ userId });
    res.status(200).json(complaints);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving complaints", error: error.message });
  }
};

// Get details of a single complaint
export const getComplaintById = async (req, res) => {
  const { id } = req.params;

  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json(complaint);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving complaint", error: error.message });
  }
};
