import User from "../models/user.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isActive: true }).select("-password");
    if (users.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error retrieving users: ${error.message}` });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.userId;

  if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: "Invalid user ID format" });
  }

  try {
    const user = await User.findOne({ _id: userId, isActive: true }).select(
      "-password"
    );
    if (!user) {
      return res.status(404).json({ msg: "User not found or inactive" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error retrieving user: ${error.message}` });
  }
};

const updateUserById = async (req, res) => {
  const userId = req.params.userId;

  if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: "Invalid user ID format" });
  }

  try {
    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    }).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found or inactive" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error updating user: ${error.message}` });
  }
};

const deleteUserById = async (req, res) => {
  const userId = req.params.userId;

  if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: "Invalid user ID format" });
  }

  if (req.query.destroy === "true") {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      return res.status(204).json();
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Error deleting user: ${error.message}` });
    }
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: false }
    );
    if (!user || user.isActive === false) {
      return res
        .status(404)
        .json({ msg: "User not found or already inactive" });
    }
    return res.status(204).json();
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error deactivating user: ${error.message}` });
  }
};

export { getAllUsers, getUserById, updateUserById, deleteUserById };
