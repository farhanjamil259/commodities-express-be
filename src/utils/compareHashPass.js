import bcrypt from "bcryptjs";

const compareHashPass = async (pass, hash) => {
  if (!pass || !hash) return false;
  return await bcrypt.compare(pass, hash);
};

export default compareHashPass;
