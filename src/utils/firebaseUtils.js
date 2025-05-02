import { getApp } from '@react-native-firebase/app';
import { getFirestore, doc, setDoc, getDoc, getDocs, query, updateDoc, collection, where, onSnapshot, Timestamp } from '@react-native-firebase/firestore';



const app = getApp(); // Get the default Firebase app instance
const auth = app.auth();
const firestore = getFirestore();

// Sign Up function
export const signUp = async (email, password) => {
    try {
        await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
        throw error; // Rethrow the error to handle it in the calling function
    }
};

// Sign In function
export const signIn = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        throw error; // Rethrow the error to handle it in the calling function
    }
};

export const signInOrSignUp = async (email, password) => {
    try {
        // Attempt to sign in the user
        await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        try {
            await auth.createUserWithEmailAndPassword(email, password);
        } catch (error) {
            throw error; // Rethrow any other errors
        }
    }
}


/**
 * A utility function to set any data for the current user in Firestore.
 * @param {string} collectionName - The name of the Firestore collection (e.g., 'users')
 * @param {string} documentId - The document ID (e.g., user UID)
 * @param {Object} data - The data to set (e.g., { nickname: 'CoolUser' })
 */
export async function setUserData(collectionName, documentId, data) {
    try {

        // Use app's Auth and Firestore services
        const user = auth.currentUser; // Get the current authenticated user

        if (!user) {
            throw new Error('No authenticated user found');
        }

        const userRef = doc(firestore, collectionName, documentId);
        await setDoc(userRef, data, { merge: true }); // Merge the data with existing document

        console.log(`Data set successfully for ${documentId}`);
        return true;
    } catch (error) {
        throw error;
    }
}

export async function fetchUserData() {
    const user = auth.currentUser; // Get the current authenticated user

    if (!user) {
        throw new Error('No authenticated user found');
    }

    const userRef = doc(firestore, "users", user.uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
        return userSnapshot.data();
    } else {
        throw new Error('No such document!');
    }
    // The latest data after any update
}

export async function connectPartner(partnerCode, userData) {
    const user = auth.currentUser; // Get the current authenticated user

    if (!user) {
        throw new Error('No authenticated user found');
    }

    const q = query(collection(firestore, "users"), where("myReferenceId", "==", partnerCode));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        throw new Error('No partner found with this code');
    }

    const partnerDoc = querySnapshot.docs[0];
    const partnerUid = partnerDoc.id;

    if (partnerUid === user.uid) {
        throw new Error('You cannot connect with yourself');
    }

    try {
        // Update both users
        await updateDoc(doc(firestore, "users", user.uid), {
            partnerId: partnerUid,
            PartnerReferenceId: partnerCode,
            partnerName: partnerDoc.data().nickname,
            connected: true,
            connectedAt: Timestamp.now(),
            partnerFcmToken: partnerDoc.data().myfcmToken,
        });

        await updateDoc(doc(firestore, "users", partnerUid), {
            partnerId: user.uid,
            PartnerReferenceId: userData.myReferenceId,
            partnerName: userData.nickname,
            connected: true,
            connectedAt: Timestamp.now(),
            partnerFcmToken: userData.myfcmToken,
        });

    } catch (error) {
        throw error; // Rethrow the error to handle it in the calling function
    }
}

/**
 * Listen to the current user's document.
 * 
 * @param {Function} callback - Function that receives user data.
 * @returns {Function} unsubscribe function
 */
export function listenToUserDocument(callback) {
    const uid = auth.currentUser?.uid;
    if (!uid) {
        console.error("No authenticated user found.");
        return () => { }; // return a dummy unsubscribe
    }

    const userRef = doc(firestore, 'users', uid);

    const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            callback(userData);
        }
    });

    return unsubscribe;
}