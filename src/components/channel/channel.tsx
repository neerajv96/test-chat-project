import { Button, Form, Input, List } from 'antd';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import Post from './post';

interface IChannel {
    id: number;
    name: string;
}
interface IUser {
    id: number;
    name: string;
}

interface ChannelProps {
    user: IUser;
}

const Channel = ({ user }: ChannelProps) => {
    console.log('user:', user);
    const [form] = Form.useForm();
    const channels: IChannel[] = [{ id: 123, name: 'My Channel' }];

    const createNewChannel = (values: unknown) => {
        console.log('values:', values);
    };

    return (
        <Layout>
            <Header>My Channel</Header>
            <Layout>
                <Sider>
                    <div>
                        <Form form={form} onFinish={createNewChannel}>
                            <Form.Item
                                name="channelName"
                                label="Create New Channel"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    New Channel
                                </Button>
                            </Form.Item>
                        </Form>

                        <List
                            dataSource={channels}
                            renderItem={(item) => (
                                <List.Item>{item.name}</List.Item>
                            )}
                        />
                    </div>
                </Sider>
                <Content>
                    <Post />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Channel;
