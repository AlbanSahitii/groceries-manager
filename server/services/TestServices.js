class TestServices {
  static test = async (req, res, next) => {
    const user = undefined;
    try {
      if (!user) {
        throw new Error("user not found");
      }
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = TestServices;
