export const orderStatuses = {
  cleared: {
    DBEnumIndex: 1,
    name: "cleared",
  },
  hold: {
    DBEnumIndex: 2,
  },
  unpaid: {
    DBEnumIndex: 3,
    name: "unpaid",
  },
  aborted: {
    DBEnumIndex: 4,
    name: "aborted",
  },
};

export const tableStatuses = {
  occupied: {
    DBEnumIndex: 1,
    name: "occupied",
  },
  unpaid: {
    DBEnumIndex: 2,
    name: "unpaid",
  },
  empty: {
    DBEnumIndex: 3,
    name: "empty",
  },
};
export const userTypes = {
  admin: "admin",
  cashier: "cashier",
  waiter: "waiter",
};
export const orderTypes = {
  table: "table",
  takeaway: "takeaway",
};
