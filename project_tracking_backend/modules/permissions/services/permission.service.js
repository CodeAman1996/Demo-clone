const { v4: uuid } = require("uuid");
const { permissions } = require("./permission");
const getService = async (Permission) => {
	try {
		const lists = await Permission.findAll();
		if (!lists.length > 0) {
			throw new Error(
				"Oops! No Permission found  or Something went wrong. Please try again after create some permission!"
			);
		}
		const permissionTypes = ["Template", "Project", "Admin"];
		const transformedPermissions = {};
		permissionTypes.forEach((type) => {
			const permissionsOfType = lists.filter(
				(permission) => permission.permissionType === type
			);
			const transformedPermissionsOfType = permissionsOfType.map(
				(permission) => ({
					permissionId: permission.permissionId,
					permissionName: permission.permissionName,
				})
			);
			transformedPermissions[type] = transformedPermissionsOfType;
		});

		return transformedPermissions;
	} catch (e) {
		throw e;
	}
};

const getByIdService = async (permissionId, Permission) => {
	try {
		const lists = await Permission.findByPk(permissionId);
		if (!lists) {
			throw new Error(
				"Oops! PermissionId not found or Something went wrong. Please try again with diffrent PermissionId!"
			);
		} else {
			return lists;
		}
	} catch (e) {
		throw e;
	}
};

const postService = async (body, Permission) => {
	try {
		const permissionArray = [];
		for (const permision of permissions) {
			const permissionId = uuid();
			permissionArray.push({
				permissionId,
				permissionName: permision.permissionName,
				permissionType: permision.permissionType,
			});
			const existingPermission = await Permission.findOne({
				where: {
					permissionName: permision.permissionName,
				},
			});

			if (existingPermission) {
				throw new Error("Permission already exists!");
			}
		}
		const permissionCreation = await Permission.bulkCreate(permissionArray);
		if (!permissionCreation.length > 0) {
			throw new Error("Something went wrong in category creation!");
		}

		return { message: "New Permission has been created successfully" };
	} catch (e) {
		throw e;
	}
};

const patchService = async (permissionId, body, Permission) => {
	try {
		const permission = await Permission.findByPk(permissionId);
		if (!permission) {
			throw new Error(
				"Oops! PermissionId not found or Something went wrong. Please try again with diffrent PermissionId !"
			);
		} else {
			const existingPermission = await Permission.findOne({
				where: { permissionName: body.permissionName },
			});
			if (
				existingPermission &&
				existingPermission.permissionId !== permissionId
			) {
				throw new Error(
					"Permission name already exists. Please choose a different name."
				);
			}
		}
		await permission.update(body);
		return { message: "Permission has been updated successfully" };
	} catch (e) {
		throw e;
	}
};

const deleteService = async (permissionId, Permission) => {
	try {
		const permission = await Permission.findByPk(permissionId);
		if (!permission) {
			throw new Error(
				"Oops! PermissionId not found or Something went wrong. Please try again with diffrent PermissionId !"
			);
		} else {
			await permission.destroy();
		}
		return { message: "Template has been deleted successfully" };
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
