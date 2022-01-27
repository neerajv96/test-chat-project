import { firestore, firebase } from '../firebase';
import { getCurrentUser } from './users';

const postsRef = firestore.collection('posts');

interface Message {
    text: string;
    groupId: string;
}

export const createMessage = ({ text, groupId }: Message) => {
    const currentUser = getCurrentUser();

    if (currentUser) {
        //   const message = {
        //     text,
        //     groupId,
        //     createdBy: currentUser.uid,
        //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        //   };
        console.log('currentUser:', currentUser);
        //   postsRef.add(message).then((snap) => console.log(snap));
    }
};
