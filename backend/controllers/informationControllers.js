import Info from "../models/informationModel.js";

const addInfo = async (req, res) => {
  try {
    req.body.creator = req.User.name;
    req.body.role = req.User.role;
    const info = await Info.create(req.body);
    console.log(info);
    res.status(200).json({
      status: "success",
      info,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const viewInfo = async (req, res) => {
  try {
    const infos = await Info.find({});
    console.log(infos);
    res.status(200).json({
      status: "success",
      infos,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const deleteInfo = async (req, res) => {
  try {
    await Info.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "successfully Deleted",
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const informationControllers = {
  addInfo,
  viewInfo,
  deleteInfo,
};

export default informationControllers;
