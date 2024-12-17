// import UserModel from "../model/user.model.js";
// const gett = async (req, res) => {
//   try {
//     const users = await UserModel.find();
//     if (users) {
//       res.status(200).json({ msg: "users", users });
//       console.log(users);
//     }
//   } catch (error) {
//     console.log("something rong");
//   }
// };
// export default { gett };
//  $lookup: {
//           from: "users", // 'user' collection का नाम (case-sensitive)
//           localField: "senderId", // ShipmentModel का फील्ड जो UserModel से लिंक है
//           foreignField: "_id", // UserModel का `_id` फील्ड
//           as: "senderDetails", // Aggregated data will appear here
//         },
//       },
//       {
//         $lookup: {
//           from: "users", // 'user' collection का नाम
//           localField: "receiverId", // ShipmentModel का फील्ड जो UserModel से लिंक है
//           foreignField: "_id", // UserModel का `_id` फील्ड
//           as: "receiverDetails", // Aggregated data will appear here
//         },
//       },
