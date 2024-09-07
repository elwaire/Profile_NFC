import React, { useState } from "react";
import { Card, Avatar, Typography, Tag, Button, Spin, message, Form, Input } from "antd";
import { memo } from "react";
import { useInformationDetail, InformationDetailData } from "~/core/hooks/useInformationData";

const { Title, Paragraph } = Typography;

interface ItemProps {
    image: string;
    tag: string;
    title: string;
    description: string;
    buttonLabel: string;
    link: string;
}

const Item: React.FC<ItemProps> = memo(({ image, tag, title, description, buttonLabel, link }) => (
    <Card
        cover={<img alt={title} src={image} style={{ height: 200, objectFit: "cover" }} />}
        actions={[
            <Button type="link" href={link} target="_blank" rel="noopener noreferrer">
                {buttonLabel}
            </Button>,
        ]}
    >
        <Card.Meta
            title={
                <div className="flex flex-col gap-2 items-start w-[300px] justify-start">
                    <Tag color="blue">{tag}</Tag>
                    <p>{title}</p>
                </div>
            }
            description={
                <Paragraph ellipsis={{ rows: 2 }}>
                    <p className="max-w-[200px]">{description}</p>
                </Paragraph>
            }
        />
    </Card>
));

const InformationDetailBar: React.FC = () => {
    const { data, loading, saveData } = useInformationDetail();
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = async (values: InformationDetailData) => {
        try {
            await saveData(values);
            message.success("Dữ liệu đã được lưu thành công");
            setIsEditing(false);
        } catch (err) {
            message.error("Có lỗi xảy ra khi lưu dữ liệu");
        }
    };

    const renderContent = () => (
        <>
            <Card.Meta
                avatar={<Avatar size={64} src={data?.avatar} />}
                title={<Title level={3}>{data?.title || "Chưa có tiêu đề"}</Title>}
                description={<Paragraph>{data?.description || "Chưa có mô tả"}</Paragraph>}
            />
            <Title level={4} style={{ marginTop: 16 }}>
                {data?.titleContact || "Chưa có tiêu đề liên hệ"}
            </Title>
            <div className="flex gap-8">
                {data?.items.slice(0, 2).map((item, index) => <Item key={index} {...item} />) || (
                    <>
                        <Spin />
                        <Spin />
                    </>
                )}
            </div>
        </>
    );

    const renderForm = () => (
        <Form initialValues={data || {}} onFinish={handleSave} layout="vertical">
            <Form.Item name="avatar" label="Avatar URL">
                <Input />
            </Form.Item>
            <Form.Item name="title" label="Tiêu đề">
                <Input />
            </Form.Item>
            <Form.Item name="description" label="Mô tả">
                <Input.TextArea />
            </Form.Item>
            <Form.Item name="titleContact" label="Tiêu đề liên hệ">
                <Input />
            </Form.Item>
            {[0, 1].map((index) => (
                <Card key={index} title={`Item ${index + 1}`} style={{ marginBottom: 16 }}>
                    <Form.Item name={["items", index, "image"]} label="Hình ảnh URL">
                        <Input />
                    </Form.Item>
                    <Form.Item name={["items", index, "tag"]} label="Tag">
                        <Input />
                    </Form.Item>
                    <Form.Item name={["items", index, "title"]} label="Tiêu đề">
                        <Input />
                    </Form.Item>
                    <Form.Item name={["items", index, "description"]} label="Mô tả">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name={["items", index, "buttonLabel"]} label="Nhãn nút">
                        <Input />
                    </Form.Item>
                    <Form.Item name={["items", index, "link"]} label="Link">
                        <Input />
                    </Form.Item>
                </Card>
            ))}
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Lưu
                </Button>
                <Button onClick={() => setIsEditing(false)} style={{ marginLeft: 8 }}>
                    Hủy
                </Button>
            </Form.Item>
        </Form>
    );

    return (
        <Card
            extra={
                <Button onClick={() => setIsEditing(!isEditing)} loading={loading}>
                    {isEditing ? "Xem" : "Chỉnh sửa"}
                </Button>
            }
        >
            {isEditing ? renderForm() : renderContent()}
        </Card>
    );
};

export default memo(InformationDetailBar);
