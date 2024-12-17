import jwt from "jsonwebtoken";

export const generateToken = async (user) => {
  const payload = {
    userid: user._id,
    name: user.name,
    role: user.role,
  };
  console.log("payload ==>", payload);

  const secretkey = process.env.SECRETKEY;

  const token = await jwt.sign(payload, secretkey, { expiresIn: "1h" });
  return token;
};
