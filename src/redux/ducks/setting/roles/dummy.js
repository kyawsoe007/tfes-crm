// Access Category
export const category = { id: "1", name: "CRM Access" };

// Access Rights
export const accessRights1 = {
  id: "1",
  name: "Lead",
  model: "lead",
  method: "read",
  editable: true,
  category: 1,
  description: "Lorem Ipsum"
};
export const accessRights2 = {
  id: "2",
  name: "Lead",
  model: "lead",
  method: "create",
  editable: true,
  category: 1,
  description: "Lorem Ipsum"
};
export const accessRights3 = {
  id: "3",
  name: "Lead",
  model: "lead",
  method: "update",
  editable: true,
  category: 1,
  description: "Lorem Ipsum"
};
export const accessRights4 = {
  id: "4",
  name: "Lead",
  model: "lead",
  method: "delete",
  editable: true,
  category: 1,
  description: "Lorem Ipsum"
};

// best case

const access1 = {
  id: "1",
  name: "CRM",
  description: "",
  accessRights: [
    {
      id: "1",
      name: "Lead",
      description: "action Description",
      method: [
        { name: "create", editable: true, access: true },
        { name: "read", editable: true, access: true },
        { name: "update", editable: true, access: true },
        { name: "delete", editable: true, access: true }
      ]
    },
    {
      id: "2",
      name: "Import",
      description: "action Description",
      method: { name: "import", access: true }
    }
  ]
};
const access2 = {
  id: "2",
  name: "Accounting",
  description: "",
  accessRights: [
    {
      id: "3",
      name: "Quotations",
      description: "action Description",
      method: [
        { name: "create", editable: true, access: true },
        { name: "read", editable: true, access: true },
        { name: "update", editable: true, access: true },
        { name: "delete", editable: true, access: true }
      ]
    },
    {
      id: "4",
      name: "Import",
      description: "action Description",
      method: { name: "import", access: true }
    }
  ]
};

const stateAccess = {
  crm: {
    lead: {
      read: true,
      update: true,
      delete: false
    }
  }
};

const rolerole = {
  name: "Sales Manager",
  id: "22",
  tier: 1,
  isAdmin: false,
  parentId: "1",
  accessRights: [access1, access2],
  children: []
};

const rolerole1 = {
  name: "One Manager",
  id: "2",
  tier: 1,
  isAdmin: false,
  parentId: "1",
  accessRights: [access1, access2],
  children: [
    {
      name: "test",
      id: "123",
      children: [],
      accessRights: [access1]
    }
  ]
};
const rolerole2 = {
  name: "Two Manager",
  id: "3",
  tier: 1,
  isAdmin: false,
  parentId: "1",
  accessRights: [access1, access2],
  children: []
};

export const bestCase = {
  name: "Company Manager",
  id: "1",
  tier: 0,
  isAdmin: true,
  accessRights: [access1, access2],
  children: [rolerole, rolerole1, rolerole2]
};
