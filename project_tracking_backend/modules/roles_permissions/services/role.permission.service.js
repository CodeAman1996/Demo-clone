const getService = async (Role, Permission) => {
	try {
		const lists = await Role.findAll({
			include: [
				{
					model: Permission,
					as: "permissions",
					through: {
						where: {
						  isChecked: true,
						},
						attributes: []
					  }, 
				},
			],
			
		});
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

const postService = async (body, RolePermission) => {
	try {
		const { role_id } = body;
		for (const permission of body.permissions) {
			const existingRecord = await RolePermission.findOne({
				where: {
					role_id: role_id,
					permission_id: permission.permission_id,
				},
			});

			if (existingRecord) {
				await existingRecord.update({ isChecked: permission.isChecked });
			} else {
				await RolePermission.create({
					role_id,
					permission_id: permission.permission_id,
					isChecked: permission.isChecked,
				});
			}
		}
		return { message: "Permissions has been updated successfully" };
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

const deleteService = async (id, Model) => {
	try {
		const role = await Model.findByPk(id);
		if (!role) throw { error: "Role Id Not Found" };
		else await role.destroy();
		return { message: "Role has been deleted" };
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
