const { tasks } = require("../../templates/seedData");
const { v4: uuid } = require("uuid");
const logger = require("../../../utils/logger");

const postService = async (body, Category, Task) => {
	try {
		const categories = [];
		for (const category of body.categories) {
			const categoryId = uuid();
			categories.push({
				categoryId,
				categoryName: category.categoryName,
				category_templateId: body.templateId,
				categoryPriority: category.categoryPriority,
			});
			const existingCategory = await Category.findOne({
				where: {
					category_templateId: body.templateId,
					categoryName: category.categoryName,
				},
			});

			if (existingCategory) {
				throw new Error("Category already exists for this Template!");
			}
		}

		const categoryCreation = await Category.bulkCreate(categories);
		if (!categoryCreation.length > 0) {
			throw new Error("Something went wrong in category creation!");
		}
		return {
			message: "Category has been created successfully",
		};
	} catch (e) {
		throw e;
	}
};

const patchService = async (categoryId,body, Category) => {
	try {
		const category = await Category.findByPk(categoryId);
		if (!category) {
			throw new Error(
				"Oops! CategoryId not found or Something went wrong. Please try again with diffrent CategoryId !"
			);
		} else {
			const { templateId, categoryName } = body;
			const existingCategory = await Category.findOne({ where: { category_templateId:templateId, categoryName } });
			
			if (existingCategory && existingCategory.categoryId !== categoryId) {
			  throw new Error(`The category name '${categoryName}' already exists within this template.`);
			}
		}
			await category.update(body);
		return { message: "Category has been updated successfully" };
	}  catch (e) {
		throw e;
	}
};

const priorityPatchService = async (body, Category) => {
	try {
		let updatedCategories = body.map(async (category) => {
			const { categoryId, categoryPriority } = category;
			await Category.update({ categoryPriority }, { where: { categoryId } });
			logger.info(
				`Updated categoryPriority ${categoryPriority}  for categoryId: ${categoryId}`
			);
		});
		if (!updatedCategories.length > 0) {
			throw new Error(
				"Oops! Category priority data is null. Please try again with some priority changes!"
			);
		}
		return { message: "Category priority has been updated successfully" };
	} catch (e) {
		throw e;
	}
};

const deleteService = async (categoryId, Category) => {
	try {
		const category = await Category.findByPk(categoryId);
		if (!category) {
			throw new Error(
				"Oops! Category not found or Something went wrong. Please try again with diffrent CategoryId !"
			);
		} else {
			await category.destroy();
		}
		return { message: "Category has been deleted successfully" };
	} catch (e) {
		throw e;
	}
};

module.exports = {
	postService,
	patchService,
	priorityPatchService,
	deleteService,
};
