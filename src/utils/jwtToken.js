export const generateAuthToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  res
    .status(statusCode)
    .cookie("authToken", token, {
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // Exactly 10 days from now
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
