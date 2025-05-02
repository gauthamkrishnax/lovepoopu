import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save data into AsyncStorage
 * @param {string} key 
 * @param {any} value 
 */
export async function storeDataInStorage(key, value) {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
        console.log(`Data stored under key: ${key}`);
    } catch (e) {
        console.error('Error storing data', e);
    }
}

/**
 * Get data from AsyncStorage
 * @param {string} key 
 * @returns {Promise<any>}
 */
export async function getDataFromStorage(key) {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error('Error getting data', e);
        return null;
    }
}

/**
 * Removes a key from AsyncStorage.
 * @param {string} key - The key to remove from storage.
 */
export async function removeItemFromStorage(key) {
    try {
        await AsyncStorage.removeItem(key);
        console.log(`Removed key: ${key}`);
    } catch (error) {
        console.error(`Error removing key "${key}":`, error);
    }
}