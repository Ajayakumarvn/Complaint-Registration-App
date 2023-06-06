import Complaint from "../models/complaintModel.js";
import User from "../models/userModel.js";
import sendEmail from "../utils/email.js";

const regComplaint = async (req, res) => {
  try {
    req.body.createdBy = req.User.id;
    req.body.creator = req.User.name;
    req.body.creatorRole = req.User.role;

    if (req.User.role === "Village Officer") {
      req.body.status = "Verified By VO";
    }

    const newComplaint = await Complaint.create(req.body);
    console.log(newComplaint);
    res.status(201).json({
      status: "created",
      newComplaint,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const viewAllComplaints = async (req, res) => {
  try {
    const allComplaints = await Complaint.find({});
    console.log(allComplaints);
    res.status(200).json({
      status: "success",
      allComplaints,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const viewAllComplaintsPending = async (req, res) => {
  try {
    const pending = await Complaint.find({ status: "Pending" });
    console.log(pending);
    res.status(200).json({
      status: "success",
      pending,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const viewAllComplaintsVO = async (req, res) => {
  try {
    const verifiedVO = await Complaint.find({ status: /^Verified By VO/ });
    console.log(verifiedVO);
    res.status(200).json({
      status: "success",
      verifiedVO,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const viewAllComplaintsSC = async (req, res) => {
  try {
    const verifiedSC = await Complaint.find({ status: /^Verified By SC:/ });
    console.log(verifiedSC);
    res.status(200).json({
      status: "success",
      verifiedSC,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const viewOneComplaint = async (req, res) => {
  console.log(req);
  console.log("okkk");
  try {
    console.log("okkk");
    const complaint = await Complaint.findOne({ _id: req.params.id });

    res.status(200).json({
      status: "success",
      complaint,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const viewMyComplaints = async (req, res) => {
  try {
    const myComplaints = await Complaint.find({ createdBy: req.User.id });
    console.log(myComplaints);
    res.status(200).json({
      status: "success",
      myComplaints,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

// const addReportToComplaint = async (req, res) => {
//   try {
//     const complaintId = req.params.id;

//     if (req.User.role === "Village Officer") {
//       req.body.createdByVillage = req.User.id;
//       req.body.creatorVillage = req.User.name;
//       req.body.descriptionVillage = req.body.description;

//       const reportData = req.body

//       const complaint = await Complaint.findByIdAndUpdate(
//         complaintId,
//         { $push: { report: reportData } },
//         { new: true }
//       );
//       console.log(complaint);
//        req.body.status = "Verified By VO: " + req.User.name;
//     const verification = await Complaint.findByIdAndUpdate(
//       complaintId,
//       req.body,
//       { new: true }
//     );
//     console.log(verification);
//     const sc=await User.findOne({role:"Sub Collector"});
//     if (verification && verification.status.startsWith("Verified")) {
//       await sendEmail({
//         email: verification.email,
//         subject: "Complaint",
//         message: verification.report[0].descriptionVillage,
//       });

//       res.status(200).json({
//         status: "Success",
//         message: "Email sent and status updated.",
//       });
//     } else {
//       throw new Error("Failed to update the status.");
//     }
//     } else if (req.User.role === "Sub Collector") {
//       req.body.createdBySub = req.User.id;
//       req.body.creatorSub = req.User.name;
//       req.body.descriptionSub = req.body.description;

//       const reportData = req.body

//       const complaint = await Complaint.findByIdAndUpdate(
//         complaintId,
//         { $push: { report: reportData } },
//         { new: true }
//       );
//       console.log(complaint);

//        req.body.status = "Verified By SC: " + req.User.name;
//     const verification = await Complaint.findByIdAndUpdate(
//       complaintId,
//       req.body,
//       { new: true }
//     );
//     console.log(verification);
//     const collector=await User.findOne({role:"Collector"});
//     if (verification && verification.status.startsWith("Verified")) {
//       await sendEmail({
//         email: verification.email,
//         subject: "Complaint",
//         message: verification.report[1].descriptionVillage,
//       });

//       res.status(200).json({
//         status: "Success",
//         message: "Email sent and status updated.",
//       });
//     } else {
//       throw new Error("Failed to update the status.");
//     }
//     } else {
//       req.body.createdByCollector = req.User.id;
//       req.body.creatorCollector = req.User.name;
//       req.body.descriptionCollector = req.body.description;

//       const reportData = req.body

//       const complaint = await Complaint.findByIdAndUpdate(
//         complaintId,
//         { $push: { report: reportData } },
//         { new: true }
//       );
//       console.log(complaint);
//        req.body.status = "Verified By Collector: " + req.User.name;
//     const verification = await Complaint.findByIdAndUpdate(
//       complaintId,
//       req.body,
//       { new: true }
//     );
//     console.log(verification);
//     if (verification && verification.status.startsWith("Verified")) {
//       await sendEmail({
//         email: verification.email,
//         subject: "Complaint",
//         message: verification.report[2].descriptionVillage,
//       });

//       res.status(200).json({
//         status: "Success",
//         message: "Email sent and status updated.",
//       });
//     } else {
//       throw new Error("Failed to update the status.");
//     }
//     }

//     // res.status(200).json({ status: "success", complaint });
//   } catch (err) {
//     console.log(err.message);
//     res.status(400).json({ error: err.message });
//   }
// };

const addReportToComplaint = async (req, res) => {
  try {
    const complaintId = req.params.id;

    if (req.User.role === "Village Officer") {
      req.body.createdByVillage = req.User.id;
      req.body.creatorVillage = req.User.name;
      req.body.descriptionVillage = req.body.description;

      const reportData = req.body;

      const complaint = await Complaint.findByIdAndUpdate(
        complaintId,
        { $push: { report: reportData } },
        { new: true }
      );
      console.log(complaint);

      req.body.status = "Verified By VO: " + req.User.name;
      const verification = await Complaint.findByIdAndUpdate(
        complaintId,
        req.body,
        { new: true }
      );
      console.log(verification);
      const sc = await User.findOne({ role: "Sub Collector" });

      const recipients = [
        { email: sc.email, message: verification.report[0].descriptionVillage },
        {
          email: verification.email,
          message: `Your complaint is received,${req.body.status} and sent to subcollector`,
        },
      ];

      if (verification && verification.status.startsWith("Verified")) {
        await sendEmail({
          recipients,
          subject: "Complaint",
        });

        res.status(200).json({
          status: "Success",
          message: "Email sent and status updated.",
        });
      } else {
        throw new Error("Failed to update the status.");
      }
    } else if (req.User.role === "Sub Collector") {
      req.body.createdBySub = req.User.id;
      req.body.creatorSub = req.User.name;
      req.body.descriptionSub = req.body.description;

      const reportData = req.body;

      let complaint = await Complaint.findByIdAndUpdate(
        complaintId,
        { $push: { report: reportData } },
        { new: true }
      );
      complaint = await Complaint.findByIdAndUpdate(
        complaintId,
        { $push: { report: reportData } },
        { new: true }
      );
      console.log(complaint);

      req.body.status = "Verified By SC: " + req.User.name;
      const verification = await Complaint.findByIdAndUpdate(
        complaintId,
        req.body,
        { new: true }
      );
      console.log(verification);
      const collector = await User.findOne({ role: "Collector" });

      const recipients = [
        {
          email: collector.email,
          message: verification.report[1].descriptionSub,
        },
        {
          email: verification.email,
          message: `Your complaint is ${req.body.status} and sent to Collector`,
        },
      ];

      if (verification && verification.status.startsWith("Verified")) {
        await sendEmail({
          recipients,
          subject: "Complaint",
        });

        res.status(200).json({
          status: "Success",
          message: "Email sent and status updated.",
        });
      } else {
        throw new Error("Failed to update the status.");
      }
    } else {
      req.body.createdByCollector = req.User.id;
      req.body.creatorCollector = req.User.name;
      req.body.descriptionCollector = req.body.description;

      const reportData = req.body;

      const complaint = await Complaint.findByIdAndUpdate(
        complaintId,
        { $push: { report: reportData } },
        { new: true }
      );
      console.log(complaint);

      req.body.status = "Verified By Collector: " + req.User.name;
      const verification = await Complaint.findByIdAndUpdate(
        complaintId,
        req.body,
        { new: true }
      );
      console.log(verification);

      const recipients = [
        {
          email: verification.email,
          message: verification.report[2].descriptionCollector,
        },
      ];

      if (verification && verification.status.startsWith("Verified")) {
        await sendEmail({
          recipients,
          subject: "Complaint",
        });

        res.status(200).json({
          status: "Success",
          message: "Email sent and status updated.",
        });
      } else {
        throw new Error("Failed to update the status.");
      }
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

const rejectComplaint = async (req, res) => {
  try {
    console.log(req.params.id);
    req.body.status = "Rejected";
    const rejectedComplaint = await Complaint.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    console.log(rejectedComplaint);
    res.status(200).json({
      status: "Success",
      rejectedComplaint,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};
// const verificationByVillage = async (req, res) => {
//   try {
//     console.log(req.params.id);
//     req.body.status = "Verified By VO: " + req.User.name;
//     const verification = await Complaint.findByIdAndUpdate(
//       { _id: req.params.id },
//       req.body,
//       { new: true }
//     );
//     if (verification.status.startsWith("Verified")) {
//       await sendEmail({
//         email: verification.email,
//         subject: "complaint",
//         message:
//           "Your complaint is received ,verified and sent to subcollector",
//       });

//       res.status(200).json({
//         status: "Success",
//         message: "Email Sent and status is updated",
//       });
//     } else {
//       throw new Error("Not updated the status");
//     }
//   } catch (err) {
//     console.log(err.message);
//     res.status(400).json({ error: err.message });
//   }
// };

// const verificationByVillage = async (req, res) => {
//   try {
//     req.body.status = "Verified By VO: " + req.User.name;
//     const verification = await Complaint.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     console.log(verification);
//     if (verification && verification.status.startsWith("Verified")) {
//       await sendEmail({
//         email: verification.email,
//         subject: "Complaint",
//         message: verification.report[1].descriptionVillage,
//       });

//       res.status(200).json({
//         status: "Success",
//         message: "Email sent and status updated.",
//       });
//     } else {
//       throw new Error("Failed to update the status.");
//     }
//   } catch (err) {
//     console.log(err.message);
//     res.status(400).json({ error: err.message });
//   }
// };

// const verificationBySub = async (req, res) => {
//   try {
//     req.body.status = "Verified By SubCollector: " + req.User.name;
//     const verification = await Complaint.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (verification.status.startsWith("Verified")) {
//       await sendEmail({
//         email: verification.email,
//         subject: "complaint",
//         message: "Your complaint is received ,verified and sent to Collector",
//       });

//       res.status(200).json({
//         status: "Success",
//         message: "Email Sent and status is updated",
//       });
//       console.log(verification);
//     } else {
//       throw new Error("Not updated the status");
//     }
//   } catch (err) {
//     console.log(err.message);
//     res.status(400).json({ error: err.message });
//   }
// };

// const verificationByCollector = async (req, res) => {
//   try {
//     req.body.status = "Verified By Collector: " + req.User.name;
//     const verification = await Complaint.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (verification.status.startsWith("Verified")) {
//       await sendEmail({
//         email: verification.email,
//         subject: "complaint",
//         message: "Your complaint is received ,verified ",
//       });

//       res.status(200).json({
//         status: "Success",
//         message: "Email Sent and status is updated",
//       });
//     } else {
//       throw new Error("Not updated the status");
//     }
//   } catch (err) {
//     console.log(err.message);
//     res.status(400).json({ error: err.message });
//   }
// };

const subFeedback = async (req, res) => {
  try {
    const feedBack = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log(feedBack);
    res.status(204).json({
      status: "updated",
      feedBack,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

// const viewStatus = async (req, res) => {
//   try {
//     const user = await Complaint.findById({ _id: req.params.id });
//     const status = user.status;
//     res.status(200).json({
//       msg: "success",
//       status,
//     });
//   } catch (err) {
//     res.status(400).json({
//       error: err.message,
//     });
//   }
// };

// const updateStatus = async (req, res) => {
//   try {
//     const user = await Complaint.findByIdAndUpdate(
//       { _id: req.params.id },
//       req.body,
//       { new: true }
//     );
//     const status = user.status;
//     if (status == "verified") {
//       await sendEmail({
//         email: user.email,
//         subject: "complaint",
//         message: "Your complaint is received ,verified and set to subcollector",
//       });

//       res.status(200).json({
//         status,
//         message: "Email Sent and status is updated",
//       });
//     } else {
//       throw new Error("Not updated the status");
//     }
//   } catch (err) {
//     res.status(400).json({
//       error: err.message,
//     });
//   }
// };

const complaintControllers = {
  regComplaint,
  viewAllComplaints,
  viewOneComplaint,
  viewMyComplaints,
  addReportToComplaint,
  viewAllComplaintsPending,
  viewAllComplaintsVO,
  viewAllComplaintsSC,
  rejectComplaint,
  // verificationByVillage,
  // verificationBySub,
  // verificationByCollector,
  subFeedback,
};

export default complaintControllers;
