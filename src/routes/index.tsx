import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { Spin } from 'antd';
import Login from '../components/login';
import { fetchUserData } from '../firebase/users';
import PrivateRoute from './PrivateRoute';
import Channel from '../components/channel/channel';
import Reply from '../components/channel/reply';
import Post from '../components/channel/post';

export default function PageRoutes() {
    const [user, setUser] = useState(null as any);
    const [domain, setDomain] = useState('');
    const [authState, setAuthState] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();

    useEffect(() => {
        setLoading(true);
        auth.onAuthStateChanged((user) => {
            if (user) {
                fetchUserData().then((res: any) => {
                    if (res) {
                        setUser(res);
                        localStorage.setItem('user', JSON.stringify(res));
                        const domain = res.email.split('@')[1].split('.')[0];
                        setDomain(domain);
                        setAuthState(true);
                        setLoading(false);
                        navigation('/channel');
                    }
                });
            } else {
                setAuthState(false);
                setLoading(false);
            }
        });
    }, []);

    return (
        <>
            {loading ? (
                <Spin
                    size="large"
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: '45%',
                    }}
                />
            ) : (
                <Routes>
                    <Route
                        path="/posts/:id"
                        element={
                            <PrivateRoute authState={authState}>
                                <Reply />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/channel/:id"
                        element={
                            <PrivateRoute authState={authState}>
                                <Post />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/channel"
                        element={
                            <PrivateRoute authState={authState}>
                                <Channel user={user} domain={domain} />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/" element={<Login />} />
                </Routes>
            )}
        </>
    );
}
