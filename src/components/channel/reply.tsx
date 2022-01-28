import { Button, Card, Form, Input, List } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../firebase';
import { addReply } from '../../firebase/posts';

const { TextArea } = Input;

export default function Reply() {
    const [form] = Form.useForm();
    const { id } = useParams();
    const [post, setPost] = useState<any>();

    const replyToPost = (values: { reply: string }) => {
        form.resetFields();
        const user: any = localStorage.getItem('user');
        const userData = JSON.parse(user);
        addReply({
            postId: id,
            message: values.reply,
            userId: userData.uid,
            userName: userData.displayName,
        });
    };
    useEffect(() => {
        firestore
            .collection('posts')
            .doc(id)
            .onSnapshot((response) => {
                setPost(response.data());
            });
    }, [id]);
    return (
        <>
            <b>Posted by</b>: {post?.userName}
            <br />
            <b>Subject</b>: {post?.subject}
            <br />
            <b>Body</b>: {post?.body}
            <List
                dataSource={post?.replies}
                renderItem={(item: any) => (
                    <List.Item>
                        <b>{item.userName}</b>: {item.message}
                    </List.Item>
                )}
            />
            <Form form={form} onFinish={replyToPost}>
                <Card
                    style={{
                        width: 300,
                        border: '1px solid black',
                        padding: '10px',
                    }}
                >
                    <Form.Item name="reply" rules={[{ required: true }]}>
                        <TextArea rows={3} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Reply
                        </Button>
                    </Form.Item>
                </Card>
            </Form>
        </>
    );
}
