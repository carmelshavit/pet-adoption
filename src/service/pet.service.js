function makeId() {
  return Math.random().toString(36).substring(2, 10);
}

async function signUp(user) {
  try {
    const response = await fetch("http://localhost:3001/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`Failed to save tweet. Status: ${response.status}`);
    }

    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }
}
async function login(email, password) {
  try {
    console.log("Login email and password", email, password);
    const response = await fetch("http://localhost:3001/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to save user. Status: ${response.status}`);
    }

    const responseJson = await response.json();
    console.log(responseJson);
    const user = responseJson.user;
    const token = responseJson.token;
    localStorage.setItem("userToken", token);

    console.log("New user data:", user);
    return user;
  } catch (error) {
    console.error("Error login user:", error);
    throw error;
  }
}

async function addPet(pet) {
  try {
    console.log(pet);
    const response = await fetch("http://localhost:3001/pets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pet),
    });

    console.log("line 68: Response status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to save pet. Status: ${response.status}`);
    }

    const newPet = await response.json();
    console.log("line 75: New pet add:", newPet);
    return newPet;
  } catch (error) {
    console.error("Error add pet:", error);
    throw error;
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}

export const petService = {
  login,
  makeId,
  signUp,
  saveToStorage,
  loadFromStorage,
  addPet,
};

// change the name of file.
