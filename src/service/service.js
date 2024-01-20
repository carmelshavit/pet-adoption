function makeId() {
    return Math.random().toString(36).substring(2, 10)
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : undefined
}

export const petService = {
    saveToStorage,
    loadFromStorage,
    makeId
}

// change the name of file.