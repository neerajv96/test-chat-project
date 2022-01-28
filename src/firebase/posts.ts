import { firestore, firebase } from '../firebase';
import { getCurrentUser } from './users';

export const createPost = ({
  subject,
  body,
  channelId,
  userId,
  userName,
}: {
  subject: string;
  body: string;
  channelId: string | undefined;
  userId: string;
  userName: string;
}) => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    firestore
      .collection('posts')
      .doc()
      .set({
        subject,
        body,
        channelId,
        userId,
        userName,
        createdAt: new Date(),
      })
      .catch((err) => console.log('err >> ', err));
  }
};

export const addReply = ({
  postId,
  message,
  userId,
  userName,
}: {
  postId: string | undefined;
  message: string;
  userId: string;
  userName: string;
}) => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    firestore
      .collection('posts')
      .doc(postId)
      .set(
        {
          replies: firebase.firestore.FieldValue.arrayUnion({
            createdAt: new Date(),
            message,
            userId,
            userName,
          }),
        },
        { merge: true }
      )
      .catch((err) => console.log('err >> ', err));
  }
};
