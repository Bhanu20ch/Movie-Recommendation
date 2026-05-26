const User = require("../models/User");

const syncUser = async (req, res) => {
  try {
    const { clerkId, username, email } = req.body;

    let user = await User.findOne({ clerkId });

    if (!user) {
      user = await User.create({
        clerkId,
        username,
        email,
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  syncUser,
};
