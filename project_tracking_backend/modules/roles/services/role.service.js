const getService = async (Role) => {
	try {
		const lists = await Role.findAll();
		if (!lists.length > 0) {
			throw new Error(
				"Oops! No Role found  or Something went wrong. Please try again after Role creation!"
			);
		} else {
			return lists;
		}
	} catch (e) {
		throw e;
	}
};

const getByIdService = async (roleId, Role) => {
	try {
		const lists = await Role.findByPk(roleId);
		if (!lists) {
			throw new Error(
				"Oops! Role Id not found or Something went wrong. Please try again with diffrent Role Id!"
			);
		} else {
			return lists;
		}
	} catch (e) {
		throw e;
	}
};

const postService = async (body, Role) => {
	try {
		const { roleType } = body;
		const isExist = await Role.findOne({ where: { roleType } });
		if (isExist) {
			throw new Error(
				"Oops! Role  already exist. Please try again with diffrent Role!"
			);
		}
		const lists = await Role.create({
			roleType,
		});
		return { message: "Role has been created successfully" };
	} catch (e) {
		throw e;
	}
};

const patchService = async (roleId, body, Role) => {
	try {
		const role = await Role.findByPk(roleId);
		if (!role) throw { error: "Role Id Not Found" };
		else {
			const existingRole = await Role.findOne({
				where: { roleType: body.roleType },
			});
			if (existingRole && existingRole.roleId !== roleId) {
				throw new Error(
					"Role name already exists. Please choose a different name."
				);
			}
		}
		await role.update(body);
		return { message: "Role has been updated" };
	} catch (e) {
		return sendResponse(500, { error: e.message });
	}
};

const deleteService = async (roleId, Model) => {
	try {
		const role = await Model.findByPk(roleId);
		if (!role) {
			throw new Error("Role Id Not Found");
		  } else if (
			role.dataValues.roleType === "Admin" ||
			role.dataValues.roleType === "Project Manager" ||
			role.dataValues.roleType === "User"
		  ) {
			throw new Error(
			  `You cannot delete ${role.dataValues.roleType} role as it is a standard role of the system.`
			);
		  } else {
			await role.destroy();
			return { message: "Role has been deleted" };
		  }
	} catch (e) {
		throw e;
	}
};

module.exports = {
	getService,
	getByIdService,
	postService,
	patchService,
	deleteService,
};
