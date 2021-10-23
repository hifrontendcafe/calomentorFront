export const isAdmin = (roleID: string) => {
  if (roleID === "0" || roleID === "2") {
    return true;
  }
  return false;
};
