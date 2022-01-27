import { useState } from 'react';

import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { auth, firebase, firestore } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleGoogleSignIn = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const provider = new firebase.auth.GoogleAuthProvider();
        setGoogleLoading(true);
        auth.signInWithPopup(provider)
            .then(async (cred) => {
                console.log('cred.user:', cred.user);
                if (cred.user) {
                    console.log('cred.user:', cred.user);
                    const { uid, email, displayName, photoURL } = cred.user;
                    const userRef = firestore.collection('users').doc(uid);

                    const doesExist = await userRef.get();
                    console.log(doesExist);
                    if (!doesExist.data()) {
                        await userRef
                            .set({
                                uid,
                                email,
                                displayName,
                                photoURL,
                                contacts: [],
                            })
                            .then(() => {
                                navigate('/channel');
                            });
                    } else {
                        navigate('/channel');
                    }
                }
            })
            .catch((error) => {
                setGoogleLoading(false);
                console.error(error);
            });
    };

    return (
        <Button onClick={handleGoogleSignIn} block loading={googleLoading}>
            <GoogleOutlined style={{ fontSize: 22, marginTop: 2 }} />
        </Button>
    );
};

export default Login;
