import { auth, firestore } from '../firebase';

const usersRef = firestore.collection('users');
export const getCurrentUser = () => auth.currentUser;

export const fetchUsers = async () => {
    await usersRef
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => console.log(doc.data()));
        })
        .catch((err) => console.error(err));
};

export const fetchUser = async (uid: string) => {
    return await usersRef
        .doc(uid)
        .get()
        .then((doc) => {
            const data = doc.data();
            if (data) {
                return data;
            }
        })
        .catch((err) => console.error(err));
};

export const fetchUserData = async () => {
    const currentUser = getCurrentUser();

    if (currentUser) {
        console.log(currentUser.uid);
        return await usersRef
            .doc(currentUser.uid)
            .get()
            .then(async (doc) => {
                const data = doc.data();
                console.log(doc.data());
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
