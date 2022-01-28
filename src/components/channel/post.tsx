import { Button, Card, Form, Input, List } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { firestore } from '../../firebase';
import { createPost } from '../../firebase/posts';

const { TextArea } = Input;

export default function Post() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();

    const [post, setPosts] = useState<any[]>([]);
    const postToChannel = (values: any) => {
        const user: any = localStorage.getItem('user');
        const userData = JSON.parse(user);
        createPost({
            subject: values.subject,
            body: values.body,
            channelId: id,
            userId: userData.uid,
            userName: userData.displayName,
        });
        form.resetFields();
    };
    useEffect(() => {
        firestore
            .collection('posts')
            .where('channelId', '==', id)
            .onSnapshot(({ docs }) => {
                setPosts(
                    docs.map((doc) => {
                        return { id: doc.id, ...doc.data() };
                    })
                );
            });
    }, [id]);
    const handlePostClick = (id: string) => {
        navigate(`/posts/${id}`);
    };
    return (
        <>
            <List
                dataSource={post}
                renderItem={(item) => (
                    <List.Item
                        style={{ cursor: 'pointer' }}
                        onClick={() => handlePostClick(item.id)}
                    >
                        {item.subject}
                    </List.Item>
                )}
            />
            <Form form={form} onFinish={postToChannel}>
                <Card
                    title="My Channel"
                    style={{
                        width: 300,
                        border: '1px solid black',
                        padding: '10px',
                    }}
                >
                    <Form.Item
                        name="subject"
                        label="Subject"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="body"
                        label="Body"
                        rules={[{ required: true }]}
                    >
                        <TextArea rows={6} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Post
                        </Button>
                    </Form.Item>
                </Card>
            </Form>
        </>
    );
}
