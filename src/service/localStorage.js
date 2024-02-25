function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function loadFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}
function saveTokenAndUserToStorage(token, userId) {
  localStorage.setItem("userToken", token);
  localStorage.setItem("userId", userId);
  //add user instead userId and make sure dont have the password from backend.
}
function loadTokenFromStorage() {
  return localStorage.getItem("userToken");
}
function loadUserFromStorage() {
  const data = localStorage.getItem("userId");
  return data;
}

export const localStorage = {
  saveToStorage,
  loadFromStorage,
  saveTokenAndUserToStorage,
  loadTokenFromStorage,
  loadUserFromStorage,
};
