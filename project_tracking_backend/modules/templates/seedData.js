const tasks = [
  {
    taskId: "1",

    taskName: "Addenum",

    taskPriority: 1,
  },

  {
    taskId: "2",

    taskName: "Pricing",

    taskPriority: 2,
  },

  {
    taskId: "3",

    taskName: "Program",

    taskPriority: 3,
  },

  {
    taskId: "4",

    taskName: "PUMI / Sold to Certification",

    taskPriority: 4,
  },

  {
    taskId: "5",

    taskName: "New Vendor ID",

    taskPriority: 5,
  },

  {
    taskId: "6",

    taskName: "Web Content",

    taskPriority: 6,
  },
];

const json = {
  categories: [
    {
      categoryId: 1,

      categoryName: "Account Admin",
      categoryPriority: 1,
      tasks
    },

    {
      categoryId: 2,

      categoryName: "System",

      categoryPriority: 2,
      tasks
    },

    {
      categoryId: 3,

      categoryName: "SCM & Logistics",

      categoryPriority: 3,
      tasks
    },

    {
      categoryId: 4,

      categoryName: "Returns/Claims",

      categoryPriority: 4,
      tasks
    },

    {
      categoryId: 5,

      categoryName: "Support",

      categoryPriority: 5,
      tasks
    },
  ],
};



module.exports = { json, tasks };
