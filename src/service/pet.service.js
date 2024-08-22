/** @format */

import Cookies from 'js-cookie';
import { localStorageService } from './localStorage';
const BASE_URL =
	process.env.NODE_ENV === 'production' ? '/' : '//localhost:3001/';

async function signUp(user) {
	try {
		const response = await fetch(`${BASE_URL}/user/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		if (!response.ok) {
			throw new Error(`Failed to save user. Status: ${response.status}`);
		}

		const newUser = await response.json();
		return newUser;
	} catch (error) {
		console.error('Error saving user:', error);
		throw error;
	}
}

async function login(email, password) {
	try {
		const response = await fetch(`${BASE_URL}/user/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});

		console.log('Response status:', response.status);

		if (!response.ok) {
			throw new Error(`Failed to login. Status: ${response.status}`);
		}

		const responseJson = await response.json();
		const user = responseJson.user;
		console.log(user);
		const token = responseJson.token;
		Cookies.set('access_token', token, {
			expires: new Date(Date.now() + 9999 * 24 * 60 * 60 * 1000),
		}); // setting expiration in milliseconds
		saveTokenAndUserToStorage(token, user.id);
		return user;
	} catch (error) {
		console.error('Error logging in user:', error);
		throw error;
	}
}

async function getPets(likedPetIds) {
	try {
		const response = await fetch(`${BASE_URL}/pet/like`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(likedPetIds),
		});

		if (!response.ok) {
			throw new Error(`Failed to get pet. Status: ${response.status}`);
		}

		const petData = await response.json(); // Parsing response data as JSON
		return petData; // Returning the pet data
	} catch (error) {
		console.error('Error getting pet:', error);
		throw error;
	}
}

async function addPet(pet) {
	try {
		console.log('add pet', pet);
		const token = localStorageService.loadTokenFromStorage();

		const response = await fetch(`${BASE_URL}/pet`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: 'Bearer ' + token,
			},
			body: JSON.stringify(pet),
		});

		console.log('line 91: Response status:', response.status);

		if (!response.ok) {
			throw new Error(`Failed to save pet. Status: ${response.status}`);
		}
		const newPet = await response.json();
		// console.log("line 77: New pet added:", newPet);
		return newPet;
	} catch (error) {
		console.error('Error adding pet:', error);
		throw error;
	}
}

async function adoptPet(petId) {
	console.log('add adopted', petId);
	try {
		const token = localStorageService.loadTokenFromStorage();

		const response = await fetch(`${BASE_URL}/pet/${petId}/adopt`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: 'Bearer ' + token,
			},
		});

		console.log('line 91: Response status:', response.status);

		if (!response.ok) {
			throw new Error(`Failed to adopted pet. Status: ${response.status}`);
		}
		const adoptedPet = await response.json();
		console.log('line 129:adoptedPet added:', adoptedPet);
		return adoptedPet;
	} catch (error) {
		console.error('Error adding pet:', error);
		throw error;
	}
}

async function returnPet(petId) {
	console.log('return adopted', petId);
	try {
		const token = localStorageService.loadTokenFromStorage();

		const response = await fetch(`${BASE_URL}/pet/${petId}/return`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: 'Bearer ' + token,
			},
		});

		console.log('line 91: Response status:', response.status);

		if (!response.ok) {
			throw new Error(`Failed to return pet. Status: ${response.status}`);
		}
		const returnPet = await response.json();
		console.log('line 77: New pet return:', returnPet);
		return returnPet;
	} catch (error) {
		console.error('Error returning pet:', error);
		throw error;
	}
}
// TODO- make combination between pet_status and user table with join. to get likesPet.

//TODO- implement getPetLikes from pet_status table

async function addPetLike(userId, petId) {
	try {
		const response = await fetch(`${BASE_URL}/pet/${petId}/save`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: 'Bearer ' + token,
			},
			body: JSON.stringify({ userId, petId }),
		});

		console.log('line 118: Response status:', response.status);

		if (!response.ok) {
			throw new Error(`Failed to save like. Status: ${response.status}`);
		}
		const newLike = await response.json();
		return newLike;
	} catch (error) {
		console.error('Error adding like:', error);
		throw error;
	}
}
async function removePetLike(userId, petId) {
	try {
		const response = await fetch(
			`${BASE_URL}/pet/${petId}/save?userId=${userId}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					authorization: 'Bearer ' + token,
				},
			}
		);

		console.log('line 169: Response status:', response.status);

		if (!response.ok) {
			throw new Error(`Failed to delete like. Status: ${response.status}`);
		}
		const newLike = await response.json();
		return newLike;
	} catch (error) {
		console.error('Error adding like:', error);
		throw error;
	}
}
async function getPetById(id) {
	try {
		console.log(id);

		const response = await fetch(`${BASE_URL}/pet/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		console.log('line 112: Response status:', response.status);

		if (!response.ok) {
			throw new Error(`Failed to get pet. Status: ${response.status}`);
		}

		const petData = await response.json(); // Renamed variable to avoid conflict
		console.log('line 118: pet data:', petData);
		return petData;
	} catch (error) {
		console.error('Error getting pet:', error);
		throw error;
	}
}
async function editPet(editedPet) {
	try {
		const token = localStorageService.loadTokenFromStorage();

		const response = await fetch(`${BASE_URL}/pet/${editedPet.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				authorization: 'Bearer ' + token,
			},
			body: JSON.stringify(editedPet),
		});

		console.log('line 138: Response status:', response.status);

		if (!response.ok) {
			throw new Error(`Failed to edit pet. Status: ${response.status}`);
		}

		const responseJson = await response.json();

		return responseJson;
	} catch (error) {
		console.error('Error getting pet:', error);
		throw error;
	}
}
async function getPetsBySearch(filters) {
	try {
		// Convert filters object to query parameters
		//    TODO:FILTER ALL THE FIELDS WITH VALUE== NULL
		const filteredFilters = {};
		Object.keys(filters).forEach((key) => {
			if (filters[key] !== null) {
				filteredFilters[key] = filters[key];
			}
		});

		const queryParams = new URLSearchParams(filteredFilters).toString();
		const response = await fetch(`${BASE_URL}/pet?${queryParams}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		// console.log("line 112: Response status:", response.status);

		if (!response.ok) {
			throw new Error(`Failed to get pets. Status: ${response.status}`);
		}
		const petsData = await response.json();
		return petsData;
	} catch (error) {
		console.error('Error getting pets:', error);
		throw error;
	}
}
async function getUsersBySearch(filters) {
	console.log(filters);
	try {
		const token = localStorageService.loadTokenFromStorage();
		// Convert filters object to query parameters
		//    TODO:FILTER ALL THE FIELDS WITH VALUE== NULL
		const filteredFilters = {};
		Object.keys(filters).forEach((key) => {
			if (filters[key] !== null) {
				filteredFilters[key] = filters[key];
			}
		});

		const queryParams = new URLSearchParams(filteredFilters).toString();
		const response = await fetch(`${BASE_URL}/user?${queryParams}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				authorization: 'Bearer ' + token,
			},
		});

		// console.log("line 112: Response status:", response.status);

		if (!response.ok) {
			throw new Error(`Failed to get users. Status: ${response.status}`);
		}
		const petsData = await response.json();
		console.log(petsData);
		return petsData;
	} catch (error) {
		console.error('Error getting pets:', error);
		throw error;
	}
}

async function getUserById(userId) {
	try {
		const response = await fetch(`${BASE_URL}/user/${userId}`, {
			method: 'GET', // Assuming you are retrieving user data, so using GET method
			headers: {
				'Content-Type': 'application/json',
			},
		});

		console.log('line 94: Response status:', response.status);

		if (!response.ok) {
			throw new Error(`Failed to get user. Status: ${response.status}`);
		}

		const userData = await response.json(); // Renamed variable to avoid conflict
		console.log('line 101: User data:', userData);
		return userData;
	} catch (error) {
		console.error('Error getting user:', error);
		throw error;
	}
}
async function getCurrentLoggedInUser() {
	try {
		const token = localStorageService.loadTokenFromStorage();
		const response = await fetch(`${BASE_URL}/user/me`, {
			method: 'GET', // Assuming you are retrieving user data, so using GET method
			headers: {
				'Content-Type': 'application/json',
				authorization: 'Bearer ' + token,
			},
		});

		console.log('line 94: Response status:', response.status);

		if (!response.ok) {
			throw new Error(`Failed to get user. Status: ${response.status}`);
		}
		const userData = await response.json(); // Renamed variable to avoid conflict
		return userData;
	} catch (error) {
		console.error('Error getting user:', error);
		throw error;
	}
}
async function editUser(editedUser) {
	console.log(editedUser.id);
	try {
		const token = localStorageService.loadTokenFromStorage();
		console.log('line 235', editedUser);
		const response = await fetch(`${BASE_URL}/user/${editedUser.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				authorization: 'Bearer ' + token,
			},
			body: JSON.stringify(editedUser),
		});

		console.log('line 94: Response status:', response.status);

		if (!response.ok) {
			throw new Error(`Failed to get user. Status: ${response.status}`);
		}
	} catch (error) {
		console.error('Error getting user:', error);
		throw error;
	}
}
function saveTokenAndUserToStorage(token, userId) {
	localStorage.setItem('userToken', token);
	localStorage.setItem('userId', userId);
	//add user instead userId and make sure dont have the password from backend.
}

export const petService = {
	login,
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
	getUsersBySearch,
	addPetLike,
	removePetLike,
	adoptPet,
	returnPet,
};
