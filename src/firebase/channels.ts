import { firestore } from '../firebase';
import { getCurrentUser } from './users';

export const createChannel = ({
  name,
  domain,
  createdBy,
}: {
  name: string;
  domain: string;
  createdBy: string;
}) => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    firestore
      .collection('channels')
      .doc()
      .set({
        name,
        domain,
        createdBy,
        createdAt: new Date(),
      })
      .catch((err) => console.log('err >> ', err));
  }
};
