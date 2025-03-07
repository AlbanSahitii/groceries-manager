const TestServices = require("../services/TestServices");

class TestController {
  static test = async (req, res, next) => {
    const response = await TestServices.test(req, res, next);
    res.json(response);
  };
}

module.exports = TestController;
