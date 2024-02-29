import Cookies from "js-cookie";
import { localStorageService } from "./localStorage";

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
      throw new Error(`Failed to save user. Status: ${response.status}`);
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
    const user = responseJson.user;
    console.log(user);
    const token = responseJson.token;
    Cookies.set("token", token);
    saveTokenAndUserToStorage(token, user.id);
    return user;
  } catch (error) {
    console.error("Error login user:", error);
    throw error;
  }
}

async function getPets() {
  try {
    const response = await fetch("http://localhost:3001/pet", {
      method: "GET", // Assuming you are retrieving user data, so using GET method
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log("line 94: Response status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to get pet. Status: ${response.status}`);
    }

    const petData = await response.json(); // Renamed variable to avoid conflict
    // console.log("line 101: User data:", petData);
    return petData;
  } catch (error) {
    console.error("Error getting pet:", error);
    throw error;
  }
}
async function addPet(pet) {
  try {
    // console.log(pet);
    const token = loadTokenFromStorage();

    const response = await fetch("http://localhost:3001/pet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify(pet),
    });

    console.log("line 91: Response status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to save pet. Status: ${response.status}`);
    }
    const newPet = await response.json();
    // console.log("line 77: New pet added:", newPet);
    return newPet;
  } catch (error) {
    console.error("Error adding pet:", error);
    throw error;
  }
}
async function getPetById(petId) {
  try {
    console.log(petId);

    const response = await fetch(`http://localhost:3001/pet/${petId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("line 112: Response status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to get pet. Status: ${response.status}`);
    }

    const petData = await response.json(); // Renamed variable to avoid conflict
    console.log("line 118: pet data:", petData);
    return petData;
  } catch (error) {
    console.error("Error getting pet:", error);
    throw error;
  }
}
async function editPet(editedPet) {
  try {
    console.log(editedPet);

    const response = await fetch(`http://localhost:3001/pet/${editedPet.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedPet),
    });

    console.log("line 138: Response status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to edit pet. Status: ${response.status}`);
    }

    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    console.error("Error getting pet:", error);
    throw error;
  }
}
async function getPetsBySearch(filters) {
  // console.log(filters);
  try {
    // Convert filters object to query parameters
    const queryParams = new URLSearchParams(filters).toString();

    const response = await fetch(`http://localhost:3001/pet?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("line 112: Response status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to get pets. Status: ${response.status}`);
    }

    const petsData = await response.json();
    console.log("line 118: Pets data:", petsData);
    return petsData;
  } catch (error) {
    console.error("Error getting pets:", error);
    throw error;
  }
}

async function getUserById(userId) {
  try {
    console.log(userId);

    const response = await fetch(`http://localhost:3001/user/${userId}`, {
      method: "GET", // Assuming you are retrieving user data, so using GET method
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("line 94: Response status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to get user. Status: ${response.status}`);
    }

    const userData = await response.json(); // Renamed variable to avoid conflict
    console.log("line 101: User data:", userData);
    return userData;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
}
async function getCurrentLoggedInUser() {
  try {
    const token = localStorageService.loadTokenFromStorage();
    const response = await fetch("http://localhost:3001/user/me", {
      method: "GET", // Assuming you are retrieving user data, so using GET method
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    });

    console.log("line 94: Response status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to get user. Status: ${response.status}`);
    }
    const userData = await response.json(); // Renamed variable to avoid conflict
    return userData;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
}
async function editUser(editedUser) {
  try {
    console.log("line 235", editedUser);
    const response = await fetch(
      `http://localhost:3001/user/${editedUser.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
      }
    );

    console.log("line 94: Response status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to get user. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
}
function saveTokenAndUserToStorage(token, userId) {
  localStorage.setItem("userToken", token);
  localStorage.setItem("userId", userId);
  //add user instead userId and make sure dont have the password from backend.
}

export const petService = {
  login,
  makeId,
  signUp,
  addPet,
  getUserById,
  editUser,
  getCurrentLoggedInUser,
  saveTokenAndUserToStorage,
  getPets,
  getPetById,
  editPet,
  getPetsBySearch,
};
