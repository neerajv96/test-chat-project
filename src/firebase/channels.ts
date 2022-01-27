import { firestore } from '../firebase';
import { getCurrentUser } from './users';

const channelsRef = firestore.collection('channels');

export const createChannel = (name: string) => {
    const currentUser = getCurrentUser();

    if (currentUser) {
        console.log('currentUser:', currentUser);
        channelsRef.add({ name }).then((snap) => console.log(snap));
    }
};
