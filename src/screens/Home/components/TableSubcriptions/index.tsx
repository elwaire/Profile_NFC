import React, { memo, useCallback, useEffect, useState } from "react";
import "./styles.scss";
import { Subscription } from "~/core/types";
import { deleteDocument, getDataFirebase } from "~/core/services";
import log from "~/core/utils/log";
import { Button, List, Tag, message } from "antd";
import { formatTime } from "~/core/utils";
import { DeleteOutlined } from "@ant-design/icons";

const TableSubscriptions: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSubscriptions = useCallback(async () => {
        try {
            setLoading(true);
            const snapShot = await getDataFirebase("subscribers");
            if (snapShot) {
                setSubscriptions(snapShot as Subscription[]);
            }
        } catch (error) {
            log("Failed to load subscriptions", error);
            message.error("Failed to load subscriptions");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDelete = useCallback(async (id: string) => {
        try {
            setLoading(true);
            await deleteDocument("subscribers", id);
            setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
            message.success("Subscription deleted successfully");
        } catch (error) {
            log("Failed to delete subscription", error);
            message.error("Failed to delete subscription");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const renderItem = useCallback(
        (item: Subscription) => (
            <List.Item>
                <List.Item.Meta title={item.email} />
                <Tag color="blue">{item.createdAt ? formatTime(item.createdAt) : "---"}</Tag>
                <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleDelete(item.id)} />
            </List.Item>
        ),
        [handleDelete],
    );

    return (
        <div className="table__subcriptions">
            <h1>List Subscriptions</h1>
            <List loading={loading} dataSource={subscriptions} renderItem={renderItem} />
        </div>
    );
};

export default memo(TableSubscriptions);
