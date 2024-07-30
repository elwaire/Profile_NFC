import { message } from "antd";
import Upload, { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { db, storage } from "../configs/firebase";
import { getDataFirebase } from "../services";
import log from "../utils/log";

interface Banner {
    id?: string;
    uid: string;
    imageUrl: string;
    link: string;
}

const useManagerBanner = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [link, setLink] = useState<string>("");
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        setLoading(true)
        try {
            const fetchedBanners = (await getDataFirebase("banners")) as Banner[];
            setBanners(fetchedBanners);
        } catch (error) {
            log(`Error fetch banner`)
        } finally {
            setLoading(false)
        }
    };

    const handleUpload = async (file: RcFile) => {
        setLoading(true)

        if (banners.length >= 3) {
            message.error("Chỉ được phép upload tối đa 3 banner");
            return Upload.LIST_IGNORE;
        }

        const imageName = `banner_${Date.now()}`;
        const imageRef = ref(storage, `banners/${imageName}`);

        try {
            await uploadBytes(imageRef, file);
            const url = await getDownloadURL(imageRef);
            const newBanner: Banner = { uid: imageName, imageUrl: url, link };

            // Lưu thông tin banner vào Firestore
            const docRef = await addDoc(collection(db, "banners"), newBanner);
            newBanner.id = docRef.id;

            setBanners([...banners, newBanner]);
            setLink("");
            message.success("Upload banner thành công");
        } catch (error) {
            message.error("Có lỗi xảy ra khi upload banner");
        } finally {
            setLoading(false)
        }

        return false;
    };

    const handleRemove = async (file: UploadFile) => {
        setLoading(true)

        const imageRef = ref(storage, `banners/${file.uid}`);
        try {
            await deleteObject(imageRef);

            // Xóa banner từ Firestore
            const bannerToDelete = banners.find((banner) => banner.uid === file.uid);
            if (bannerToDelete && bannerToDelete.id) {
                await deleteDoc(doc(db, "banners", bannerToDelete.id));
            }

            setBanners(banners.filter((banner) => banner.uid !== file.uid));
            message.success("Xóa banner thành công");
        } catch (error) {
            message.error("Có lỗi xảy ra khi xóa banner");
        } finally {
            setLoading(false)
        }
    };

    const uploadProps: UploadProps = {
        beforeUpload: handleUpload,
        onRemove: handleRemove,
        fileList: banners.map((banner) => ({
            uid: banner.uid,
            name: banner.uid,
            status: "done",
            url: banner.imageUrl,
        })),
    };

    return { uploadProps, link, setLink, banners, loading };
}

export default useManagerBanner;