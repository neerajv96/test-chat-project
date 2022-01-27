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

export default function Reply() {
    const [form] = Form.useForm();
    const post: IPost = {
        id: 321,
        message: 'Message',
        user: { id: 443, name: 'sam' },
        replies: [
            {
                id: 9383,
                reply: 'reply message',
                user: { id: 443, name: 'Alpha' },
            },
            {
                id: 9384,
                reply: 'reply message1',
                user: { id: 443, name: 'Beta' },
            },
            {
                id: 9385,
                reply: 'reply message2',
                user: { id: 443, name: 'Gamma' },
            },
        ],
    };
    const replyToPost = (values: unknown) => {
        console.log(values);
    };

    return (
        <>
            <List
                dataSource={post.replies}
                renderItem={(item) => (
                    <List.Item>
                        <span>{item.user.name}</span>: {item.reply}
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
