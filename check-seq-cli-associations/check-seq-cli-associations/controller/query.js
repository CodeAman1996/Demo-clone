const { User, Task } = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op

// Find all users with their associated tasks
// Raw SQL: SELECT * FROM "Users" JOIN "Tasks" ON "Tasks"."userId" = "Users".id;

const findAllWithTasks = async () => {
    const users = await User.findAll({
        include: [{
            model: Task
        }]
    });
    console.log("All users with their associated tasks:", JSON.stringify(users, null, 4));
}

// Find a task with its associated user
// Raw SQL: SELECT * FROM "Tasks" JOIN "Users" ON "Users"."id" = "Tasks"."userId";

const findTasksWithUser = async () => {
    const tasks = await Task.findAll({
        include: [{
            model: User
        }]
    });
    console.log("All tasks with their associated user:", JSON.stringify(tasks, null, 4));
}
const run = async () => {
    await findAllWithTasks()
    await findTasksWithUser()
    await process.exit()
}

run()

module.exports={findAllWithTasks,findTasksWithUser};