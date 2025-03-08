const {
  Family,
  User,
  FamilyUser,
  FamilyInvites,
  sequelize,
} = require("../models");
const {Op} = require("sequelize");

class FamilyServices {
  static createFamily = async (req, res) => {
    // userID is the owner ID !!
    const {family_name, user_id} = req.body;

    const findUser = await User.findOne({where: {id: user_id}});
    if (!findUser) throw new Error("User doesnt exits");

    const familyOwner = await Family.findOne({where: {owner_id: user_id}});
    if (familyOwner) throw new Error("You are owner of an family.");

    const userInFamily = await FamilyUser.findOne({where: {user_id: user_id}});
    if (userInFamily) throw new Error("You already belong in a family");

    // todo
    // use transaction
    const family = await Family.create({
      family_name: family_name,
      owner_id: user_id,
    });
    await FamilyUser.create({family_id: family.id, user_id: user_id});

    return "family created";
  };

  static getFamily = async (req, res) => {
    const {family_id} = req.query;

    const family = await Family.findOne({where: {id: family_id}});
    if (!family) throw new Error("Family doesnt exist");

    return family;
  };

  static updateFamily = async (req, res) => {
    const {family_id, family_name} = req.body;

    const family = await Family.findOne({where: {id: family_id}});

    if (!family) {
      throw new Error("family not found");
    }

    if (family.id === family_id && family.family_name === family_name) {
      throw new Error("Cannot update same information");
    }

    const result = await Family.update(
      {family_name: family_name},
      {where: {id: family_id}}
    );
  };

  static deleteFamily = async (req, res) => {
    const {family_id} = req.body;

    const family = await Family.destroy({where: {id: family_id}});

    if (!family) throw new Error("family not found");

    return `family - ${family_id} deleted succesfully`;
  };

  static addUserInFamily = async (req, res) => {
    // this api wont be used. invite logic below will
    const {family_id, user_id} = req.body;

    const userInFamily = await FamilyUser.findOne({where: {user_id: user_id}});

    if (userInFamily) throw new Error("user already belongs in a family");

    const insertUser = await FamilyUser.create({
      family_id: family_id,
      user_id: user_id,
    });

    return insertUser;
  };

  static getFamilyMembers = async (req, res) => {
    const {family_id} = req.query;

    const familyMembers = await FamilyUser.findAll({
      attributes: ["user_id"],
      where: {
        family_id: family_id,
      },
    });

    if (familyMembers.length < 1 || familyMembers === undefined)
      throw new Error("Family doesnt exist");

    const ids = familyMembers.map(row => row.user_id);

    const users = await User.findAll({
      attributes: ["email", "username", "full_name"],
      where: {
        id: ids,
      },
    });

    const result = await Promise.all(users);
    return result;
  };

  static isUserInFamily = async (req, res) => {
    const {user_id} = req.query;
    console.log(req);

    const userFamily = await FamilyUser.findOne({where: {user_id: user_id}});
    const inviteInFamily = await FamilyInvites.findOne({
      where: {user_id: user_id},
    });

    if (userFamily) {
      return {
        message: "User has a family",
        family_id: userFamily.family_id,
      };
    } else if (inviteInFamily) {
      return {
        message: "User has an active invite",
        family_id: inviteInFamily.family_id,
      };
    } else {
      return {
        message: "User doesn`t have an family",
      };
    }
  };

  static inviteUserInFamily = async (req, res) => {
    const {email, family_id} = req.body;
    const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now

    const userData = await User.findOne({
      attributes: ["id"],
      where: {email: email},
    });
    if (!userData) throw new Error("user doesnt exist");
    const userId = userData.id;

    const checkInvites = await FamilyInvites.findOne({
      where: {user_id: userId},
    });
    if (checkInvites) throw new Error("User has an pending family invite");

    const checkFamily = await FamilyUser.findOne({where: {user_id: userId}});
    if (checkFamily) throw new Error("User is already in a family");

    const result = await FamilyInvites.create({
      user_id: userId,
      family_id: family_id,
      expiresAt: expiresAt,
    });
    return "Family member has been invited";
  };

  static acceptFamilyInvite = async (req, res) => {
    const {user_id, family_id} = req.body;

    const invite = await FamilyInvites.findOne({where: {user_id: user_id}});
    if (!invite) throw new Error("Invite doesnt exist");

    await sequelize.transaction(async transaction => {
      await Promise.all([
        FamilyInvites.destroy({where: {user_id: user_id}, transaction}),
        FamilyUser.create(
          {user_id: user_id, family_id: family_id},
          {transaction}
        ),
      ]);
    });

    return "Invite Accepted";
  };

  static declineFamilyInvite = async (req, res) => {
    const {user_id, family_id} = req.body;

    const invite = await FamilyInvites.findOne({
      where: {user_id: user_id, family_id: family_id},
    });

    if (!invite) throw new Error("Invite not found");

    const deleteInvite = await FamilyInvites.destroy({where: {id: invite.id}});

    return "Invite Deleted Sucessfully";
  };

  static removeMemberFromFamily = async (req, res) => {
    const {username} = req.body;

    const result = await User.findOne({
      where: {username: username},
      include: [{model: FamilyUser}],
    });

    if (!result) throw new Error("Cant find user");
    if (!result.FamilyUser) throw new Error("User doesnt belong in any family");

    const isOwner = await Family.findOne({where: {owner_id: result.id}});

    if (isOwner) throw new Error("Cant delete family owner");

    const deleteMember = await FamilyUser.destroy({
      where: {id: result.FamilyUser.id},
    });
    if (!deleteMember) throw new Error("Cant find Family member");

    return "Member deleted";
  };

  static ownerChange = async (req, res) => {
    const {ownerUsername, newOwnerUsername} = req.body;

    const users = await User.findAll({
      where: {
        username: {
          [Op.or]: [ownerUsername, newOwnerUsername],
        },
      },
    });

    if (users.length < 2) throw new Error("One of users doesnt exist");

    const ownerId = users.filter(user => user.username === ownerUsername)[0].id;
    const newOwnerId = users.filter(
      user => user.username === newOwnerUsername
    )[0].id;

    const family = await Family.findOne({where: {owner_id: ownerId}});
    if (!family) throw new Error("Family not found");

    const newOwner = await Family.update(
      {owner_id: newOwnerId},
      {where: {owner_id: ownerId}}
    );
    return "Owner Changed";
  };

  static getInviteInformation = async (req, res) => {
    const {userId, familyId} = req.body;

    const invite = await FamilyInvites.findOne({
      where: {
        user_id: userId,
        family_id: familyId,
      },
      include: {
        model: Family,
        where: {
          id: familyId,
        },
      },
    });

    if (!invite) throw new Error("Invite doesnt exist");

    const now = new Date();
    const future = new Date(invite.expiresAt);

    const diffInMs = future - now;
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24)); // Convert to days

    const data = {
      familyName: invite.Family.family_name,
      expiryDate: diffInDays,
      createDate: invite.createdAt,
    };

    return data;
  };
}

module.exports = FamilyServices;
