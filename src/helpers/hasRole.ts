export const isAdmin = (roleID: string) => {
  if (roleID === '0' || roleID === '2') {
    return true;
  }
  return false;
};

export const isMentor = (roleID: string) => {
  if (roleID === '1' || roleID === '2') {
    return true;
  }
  return false;
};
