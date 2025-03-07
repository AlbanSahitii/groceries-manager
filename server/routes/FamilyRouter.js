const express = require("express");
const FamilyRouter = express.Router();
const Middleware = require("../middleware/Middleware");
const tryCatch = require("../utils/tryCatch");

const FamilyController = require("../controllers/Family/FamilyController");
const FamilyGroceriesController = require("../controllers/Family/FamilyGroceriesController");

const {familySchema} = require("../validation");

FamilyRouter.post(
  "/create",
  Middleware.jwtAuth,
  Middleware.validateRequest(familySchema.create),
  tryCatch(FamilyController.create)
);
FamilyRouter.get(
  "/get",
  Middleware.jwtAuth,
  Middleware.validateQuery(familySchema.get),
  tryCatch(FamilyController.get)
);
FamilyRouter.put(
  "/update",
  Middleware.jwtAuth,
  Middleware.validateRequest(familySchema.updateFamily),
  tryCatch(FamilyController.update)
);
FamilyRouter.delete(
  "/delete",
  Middleware.jwtAuth,
  Middleware.validateRequest(familySchema.delete),
  tryCatch(FamilyController.delete)
);
// --------
FamilyRouter.post(
  "/add_user",
  Middleware.jwtAuth,
  tryCatch(FamilyController.addUser)
); // this api wont be used. invite api will be used
// ---------
FamilyRouter.get(
  "/get_members",
  Middleware.jwtAuth,
  Middleware.validateQuery(familySchema.getFamilyMembers),
  tryCatch(FamilyController.getMembers)
);
FamilyRouter.get(
  "/check_user",
  Middleware.jwtAuth,
  Middleware.validateQuery(familySchema.checkUser),
  tryCatch(FamilyController.checkUser)
);
FamilyRouter.post(
  "/add_family_member",
  Middleware.jwtAuth,
  Middleware.validateRequest(familySchema.addFamilyMember),
  tryCatch(FamilyController.addFamilyMember)
);
FamilyRouter.post(
  "/accept_invite",
  Middleware.jwtAuth,
  Middleware.validateRequest(familySchema.acceptInvite),
  tryCatch(FamilyController.acceptInvite)
);
FamilyRouter.post(
  "/decline_invite",
  Middleware.jwtAuth,
  Middleware.validateRequest(familySchema.declineInvite),
  tryCatch(FamilyController.declineInvite)
);
FamilyRouter.post(
  "/remove_family_member",
  Middleware.jwtAuth,
  Middleware.validateRequest(familySchema.removeFromFamily),
  tryCatch(FamilyController.removeFromFamily)
);
FamilyRouter.post(
  "/change_owner",
  Middleware.jwtAuth,
  Middleware.validateRequest(familySchema.changeOwner),
  tryCatch(FamilyController.changeOwner)
);
FamilyRouter.post(
  "/get_invite_information",
  Middleware.jwtAuth,
  Middleware.validateRequest(familySchema.getInviteInformaiton),
  tryCatch(FamilyController.getInviteInformaiton)
);
FamilyRouter.use(Middleware.errorHandler);

module.exports = FamilyRouter;
