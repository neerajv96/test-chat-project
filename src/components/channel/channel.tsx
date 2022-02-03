import { Button, Form, Input, List } from 'antd';
import Layout, { Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../firebase';
import { createChannel } from '../../firebase/channels';
interface IUser {
    uid: string;
    name: string;
    email: string;
}

interface ChannelProps {
    user: IUser;
    domain: string;
}

const Channel = ({ user, domain }: ChannelProps) => {
    const [form] = Form.useForm();
    const [channels, setChannels] = useState<any[]>([]);
    const navigate = useNavigate();

    const createNewChannel = (values: { channelName: string }) => {
        form.resetFields();
        createChannel({
            name: values.channelName,
            domain,
            createdBy: user.uid,
        });
    };
    useEffect(() => {
        firestore
            .collection('channels')
            .where('domain', '==', domain)
            .onSnapshot(({ docs }) => {
                setChannels(
                    docs.map((doc) => {
                        return { id: doc.id, ...doc.data() };
                    })
                );
            });
    }, [domain]);

    const handleChannelClick = (id: string) => {
        navigate(`/channel/${id}`);
    };

    return (
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
                    <Header>My Channels</Header>
                    <List
                        dataSource={channels}
                        renderItem={(item) => (
                            <List.Item
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleChannelClick(item.id)}
                            >
                                {item.name}
                            </List.Item>
                        )}
                    />
                </div>
            </Sider>
        </Layout>
    );
};

export default Channel;
