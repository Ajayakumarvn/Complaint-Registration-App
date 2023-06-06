import User from "../models/userModel.js";

const viewAuthorities = async (req, res) => {
  try {
    const authorities = await User.find({
      $or: [{ role: "Sub Collector" }, { role: "Village Officer" }],
    });
    console.log(authorities);
    res.status(200).json({
      status: "success",
      authorities,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

const viewUsers = async (req, res) => {
  try {
    const user = await User.find({ role: "Citizen" });
    console.log(user);
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

const deleteAuthorities = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "Deleted Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const userControllers = {
  viewAuthorities,
  viewUsers,
  deleteAuthorities,
};

export default userControllers;
