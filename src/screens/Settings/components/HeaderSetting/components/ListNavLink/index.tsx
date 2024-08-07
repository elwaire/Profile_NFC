import { DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Switch } from "antd";
import { memo, useCallback } from "react";
import { FormItem } from "~/core/components";
import { HeaderSettings, NavLink } from "~/core/types";
import "./styles.scss";

type ListNavLinkProps = {
    settings: HeaderSettings;
    setSettings: React.Dispatch<React.SetStateAction<HeaderSettings>>;
};

const ListNavLink: React.FC<ListNavLinkProps> = ({ settings, setSettings }) => {
    const [form] = Form.useForm();

    const handleNavLinkToggle = useCallback((id: string) => {
        setSettings((prev) => ({
            ...prev,
            navLinks: prev.navLinks.map((link) => (link.id === id ? { ...link, isActive: !link.isActive } : link)),
        }));
    }, []);

    const handleAddNavLink = useCallback(
        (values: { title: string; url: string }) => {
            const newLink: NavLink = {
                id: Date.now().toString(),
                ...values,
                isActive: true,
            };
            setSettings((prev) => ({
                ...prev,
                navLinks: [...prev.navLinks, newLink],
            }));
            form.resetFields();
        },
        [form],
    );

    const handleDeleteNavLink = useCallback((id: string) => {
        setSettings((prev) => ({
            ...prev,
            navLinks: prev.navLinks.filter((link) => link.id !== id),
        }));
    }, []);

    return (
        <section className="list_nav_link__container">
            <h3>Navigation Links</h3>
            {settings.navLinks.map((link) => (
                <div key={link.id} style={{ marginBottom: 10 }} className="list_nav_link__container_items">
                    <span>Label: {link.title}</span>
                    <Space>
                        <Switch
                            checked={link.isActive}
                            onChange={() => handleNavLinkToggle(link.id)}
                            style={{ marginLeft: 10, marginRight: 10 }}
                        />
                        <Button
                            icon={<DeleteOutlined />}
                            danger
                            size="small"
                            onClick={() => handleDeleteNavLink(link.id)}
                        />
                    </Space>
                </div>
            ))}
            <hr />

            <Form form={form} onFinish={handleAddNavLink} layout="inline" style={{ marginTop: 20 }}>
                <FormItem name="title" rules={[{ required: true, message: "Title is required" }]}>
                    <Input placeholder="Link Title" />
                </FormItem>
                <FormItem name="url" rules={[{ required: true, message: "URL is required" }]}>
                    <Input placeholder="Link URL" />
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">
                        Add Link
                    </Button>
                </FormItem>
            </Form>
        </section>
    );
};

export default memo(ListNavLink);
