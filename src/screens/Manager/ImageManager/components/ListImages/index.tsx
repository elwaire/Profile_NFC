import { Button, List, message, Modal } from "antd";
import { deleteObject, ref } from "firebase/storage";
import React, { memo } from "react";
import Images from "~/assets/imgs";
import { storage } from "~/core/configs/firebase";
import { useAppDispatch, useAppSelector } from "~/core/hooks";
import { ImagesActions } from "~/core/store";
import "./styles.scss";

type ListImagesProps = {
    currentPath: string[];
    setCurrentPath: React.Dispatch<React.SetStateAction<string[]>>;
};

const ListImages: React.FC<ListImagesProps> = ({ currentPath, setCurrentPath }) => {
    const dispatch = useAppDispatch();
    const { loading, list } = useAppSelector((state) => state.root.images);

    const handleItemClick = (item: any) => {
        if (item.type === "folder") {
            setCurrentPath([...currentPath, item.name]);
        }
    };

    const handleDeleteImage = async (item: any) => {
        Modal.confirm({
            title: "Bạn có chắc chắn muốn xóa ảnh này?",
            onOk: async () => {
                dispatch(ImagesActions.update({ loading: true }));
                try {
                    const imageRef = ref(storage, item.fullPath);
                    await deleteObject(imageRef);
                    message.success("Xóa ảnh thành công");
                    dispatch(ImagesActions.update({ list: list.filter((i) => i.name !== item.name) }));
                } catch (error) {
                    message.error("Có lỗi xảy ra khi xóa ảnh");
                } finally {
                    dispatch(ImagesActions.update({ loading: false }));
                }
            },
        });
    };

    return (
        <List
            loading={loading}
            grid={{ gutter: 16, column: 5 }}
            dataSource={list}
            renderItem={(item) => (
                <List.Item>
                    <div className="list_images__items" onClick={() => handleItemClick(item)}>
                        {item.type === "folder" ? (
                            <img src={Images.folder} alt="" className="list_images__items__folder" />
                        ) : (
                            <img src={item.url} alt="" className="list_images__items__image" />
                        )}
                        <div className="list_images__items__group">
                            <h1>{item.name}</h1>
                            {item.type === "image" && (
                                <Button type="primary" danger onClick={() => handleDeleteImage(item)}>
                                    Delete
                                </Button>
                            )}
                        </div>
                    </div>
                </List.Item>
            )}
        />
    );
};

export default memo(ListImages);
