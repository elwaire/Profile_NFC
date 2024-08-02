import { PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { memo, useState, useEffect } from "react";
import { FormItem } from "~/core/components";
import { storage } from "~/core/configs/firebase";
import { useAppDispatch, useAppSelector } from "~/core/hooks";
import { TeamActions } from "~/core/store";

type UploadAvatarProps = {
    setImageFile: (file: string) => void;
    initialImage?: string | null;
};

const UploadAvatar: React.FC<UploadAvatarProps> = ({ setImageFile, initialImage }) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.root.team);
    const [fileList, setFileList] = useState<any[]>([]);

    useEffect(() => {
        if (initialImage) {
            setFileList([
                {
                    uid: "-1",
                    name: "image.png",
                    status: "done",
                    url: initialImage,
                },
            ]);
        }
    }, [initialImage]);

    const handleUploadImage = async (file: RcFile) => {
        dispatch(TeamActions.update({ loading: true }));
        try {
            const imageRef = ref(storage, `team_images/${file.name}`);

            await uploadBytes(imageRef, file);
            const downloadUrl = await getDownloadURL(imageRef);

            setImageFile(downloadUrl);
            setFileList([
                {
                    uid: "-1",
                    name: file.name,
                    status: "done",
                    url: downloadUrl,
                },
            ]);
        } catch (error) {
            console.error("Lỗi khi tải lên hình ảnh:", error);
            message.error("Đã xảy ra lỗi khi tải lên hình ảnh");
        } finally {
            dispatch(TeamActions.update({ loading: false }));
        }
    };

    return (
        <FormItem label="Ảnh">
            <Upload
                listType="picture-card"
                fileList={fileList}
                maxCount={1}
                beforeUpload={async (file) => {
                    await handleUploadImage(file);
                    return false;
                }}
                onRemove={() => {
                    setFileList([]);
                    setImageFile("");
                }}
                disabled={loading}
                className="upload_image__container__btn"
            >
                {fileList.length < 1 && (
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Tải lên</div>
                    </div>
                )}
            </Upload>
        </FormItem>
    );
};

export default memo(UploadAvatar);
