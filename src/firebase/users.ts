import { auth, firestore } from '../firebase';

const usersRef = firestore.collection('users');
export const getCurrentUser = () => auth.currentUser;

export const fetchUserData = async () => {
    const currentUser = getCurrentUser();

    if (currentUser) {
        return await usersRef
            .doc(currentUser.uid)
            .get()
            .then(async (doc) => {
                const data = doc.data();
                if (data) {
                    return data;
                } else {
                    fetchUserData();
                }
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }
};
