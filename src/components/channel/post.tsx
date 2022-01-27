import { Button, Card, Form, Input, List } from 'antd';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;
interface IUser {
    id: number;
    name: string;
}

interface IReply {
    id: number;
    reply: string;
    user: IUser;
}

interface IPost {
    id: number;
    message: string;
    user: IUser;
    replies: IReply[];
}

export default function Post() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const posts: IPost[] = [
        {
            id: 321,
            message: 'Message',
            user: { id: 443, name: 'sam' },
            replies: [
                {
                    id: 9383,
                    reply: 'reply message',
                    user: { id: 443, name: 'Alpha' },
                },
            ],
        },
    ];

    const fetchPostsForChannel = () => {
        //todo fetch posts by channel id
    };

    const postToChannel = (postId: number) => {
        navigate(`/posts/${postId}`);
    };
    return (
        <>
            <List
                dataSource={posts}
                renderItem={(item) => (
                    <List.Item onClick={() => postToChannel(item.id)}>
                        {item.message}
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
