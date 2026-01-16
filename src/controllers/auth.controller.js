const { registerUser, loginUser } = require("../services/auth.service");
const response = require("../utils/response.util");

const register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const user = await registerUser(email, password, role);

    response.success(res, "User registered successfully", {
      id: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);

    response.success(res, "Login successful", {
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res) => {
  response.success(res, "Profile fetched", req.user);
};

module.exports = {
  register,
  login,
  getProfile,
};
