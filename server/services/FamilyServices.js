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

    if (!family_name || !user_id) return "information missing";

    const findUser = await User.findOne({where: {id: user_id}});
    if (!findUser) return "User doesnt exits";

    const familyOwner = await Family.findOne({where: {owner_id: user_id}});
    if (familyOwner) return "You are owner of an family.";

    const userInFamily = await FamilyUser.findOne({where: {user_id: user_id}});
    if (userInFamily) return "You already belong in a family";

    try {
      const family = await Family.create({
        family_name: family_name,
        owner_id: user_id,
      });
      await FamilyUser.create({family_id: family.id, user_id: user_id});
    } catch (error) {
      return error.message;
    }

    return "family created";
  };

  static getFamily = async (req, res) => {
    const {family_id} = req.query;
    if (!family_id) return "information missing";

    const family = await Family.findOne({where: {id: family_id}});
    if (!family) return "Family doesnt exist";

    return family;
  };

  static updateFamily = async (req, res) => {
    const {family_id, family_name} = req.body;

    const family = await Family.findOne({where: {id: family_id}});

    if (!family) {
      return "family not found";
    }

    if (family.id === family_id && family.family_name === family_name) {
      return "Cannot update same information";
    }

    try {
      const result = await Family.update(
        {family_name: family_name},
        {where: {id: family_id}}
      );

      return "Information updated";
    } catch (error) {
      return error;
    }
  };

  static deleteFamily = async (req, res) => {
    const {family_id} = req.body;

    try {
      const family = await Family.destroy({where: {id: family_id}});

      if (!family) {
        return "family not found";
      }

      return `family - ${family_id} deleted succesfully`;
    } catch (error) {
      return error;
    }
  };

  static addUserInFamily = async (req, res) => {
    // this api wont be used. invite logic below will
    const {family_id, user_id} = req.body;

    if (!family_id || !user_id) return "information missing";

    const userInFamily = await FamilyUser.findOne({where: {user_id: user_id}});

    if (userInFamily) return "user already belongs in a family";

    const insertUser = await FamilyUser.create({
      family_id: family_id,
      user_id: user_id,
    });

    return insertUser;
  };

  static getFamilyMembers = async (req, res) => {
    const {family_id} = req.query;
    if (!family_id) return "Information missing";

    const familyMembers = await FamilyUser.findAll({
      attributes: ["user_id"],
      where: {
        family_id: family_id,
      },
    });

    if (familyMembers.length < 1 || familyMembers === undefined)
      return "Family doesnt exist";

    const ids = familyMembers.map(row => row.user_id);

    const users = await User.findAll({
      attributes: ["email", "username", "full_name"],
      where: {
        id: ids,
      },
    });

    try {
      const result = await Promise.all(users);
      return result;
    } catch (error) {
      return error;
    }
  };

  static isUserInFamily = async (req, res) => {
    const {user_id} = req.query;

    if (!user_id) return "Information missing";

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

    if (!email || !family_id) return "Information missing";

    const userData = await User.findOne({
      attributes: ["id"],
      where: {email: email},
    });
    if (!userData) return "user doesnt exist";
    const userId = userData.id;

    const checkInvites = await FamilyInvites.findOne({
      where: {user_id: userId},
    });
    if (checkInvites) return "User has an pending family invite";

    const checkFamily = await FamilyUser.findOne({where: {user_id: userId}});
    if (checkFamily) return "User is already in a family";

    try {
      const result = await FamilyInvites.create({
        user_id: userId,
        family_id: family_id,
        expiresAt: expiresAt,
      });
      return "Family member has been invited";
    } catch (error) {
      return error;
    }
  };

  static acceptFamilyInvite = async (req, res) => {
    const {user_id, family_id} = req.body;

    if (!user_id || !family_id) return "Information missing";

    const invite = await FamilyInvites.findOne({where: {user_id: user_id}});
    if (!invite) return "Invite doesnt exist";

    try {
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
    } catch (error) {
      return error;
    }
  };

  static declineFamilyInvite = async (req, res) => {
    const {user_id, family_id} = req.body;

    if (!user_id || !family_id) return "Missing information";

    const invite = await FamilyInvites.findOne({
      where: {user_id: user_id, family_id: family_id},
    });

    if (!invite) return "Invite not found";

    const deleteInvite = await FamilyInvites.destroy({where: {id: invite.id}});

    return "Invite Deleted Sucessfully";
  };

  static removeMemberFromFamily = async (req, res) => {
    const {username} = req.body;
    if (!username) return "Information missing";

    const result = await User.findOne({
      where: {username: username},
      include: [{model: FamilyUser}],
    });

    if (!result) return "Cant find user";
    if (!result.FamilyUser) return "User doesnt belong in any family";

    const isOwner = await Family.findOne({where: {owner_id: result.id}});

    if (isOwner) return "Cant delete family owner";

    const deleteMember = await FamilyUser.destroy({
      where: {id: result.FamilyUser.id},
    });
    if (!deleteMember) return "Cant find Family member";

    return "Member deleted";
  };

  static ownerChange = async (req, res) => {
    const {ownerUsername, newOwnerUsername} = req.body;
    console.log(req.body);

    const users = await User.findAll({
      where: {
        username: {
          [Op.or]: [ownerUsername, newOwnerUsername],
        },
      },
    });

    if (users.length < 2) return "One of users doesnt exist";

    const ownerId = users.filter(user => user.username === ownerUsername)[0].id;
    const newOwnerId = users.filter(
      user => user.username === newOwnerUsername
    )[0].id;

    const family = await Family.findOne({where: {owner_id: ownerId}});
    if (!family) return "Family not found";

    try {
      const newOwner = await Family.update(
        {owner_id: newOwnerId},
        {where: {owner_id: ownerId}}
      );
    } catch (error) {
      return error.message;
    }

    return "Owner Changed";
  };

  static getInviteInformation = async (req, res) => {
    const {userId, familyId} = req.body;
    if (!userId || !familyId) return "Information missing";

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

    if (!invite) return "Invite doesnt exist";

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
