import mongoose from "mongoose";
import dotenv from "dotenv/config";
import UserModel from "../../model/user.model.js";
import bcrypt from "bcrypt";
export class DBConnection {
  async databaseConnection() {
    try {
      await mongoose.connect(process.env.DBURL);
      console.log("Database Connected Successfully!!");

      const exitsSuperAdmin = await UserModel.find({ role: "superadmin" });
      console.log("exits super admin ========>", exitsSuperAdmin);

      if (exitsSuperAdmin <= 0) {
        const phoneno = 12345678910;
        const email = "admin@gmail.com";
        const password = "admin123";
        const name = "Logistic_CRM";
        const hashpassword = await bcrypt.hash(password, 10);

        console.log("hashpassword ====>", hashpassword);

        const user = new UserModel({
          _id: new mongoose.Types.ObjectId("64d33173fd7ff3fa0924a110"),
          phoneno: phoneno,
          email: email,
          password: hashpassword,
          name: name,
          role: "superadmin",
        });

        console.log("user ===>",user);
        await user.save();
        console.log("Admin Created Successfully !!");
      } else {
        console.log("Super Admin Already Created !!");
        
      }
    } catch (error) {
      console.log("Found Error While Database Connect", error);
    }
  }
}
