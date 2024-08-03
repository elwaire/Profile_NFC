import { Breadcrumb } from "antd";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Title } from "~/core/components";
import { storage } from "~/core/configs/firebase";
import { useAppDispatch } from "~/core/hooks";
import { ImagesActions } from "~/core/store";
import log from "~/core/utils/log";
import ListImages from "./components/ListImages";
import "./styles.scss";

const ImageManager: React.FC = () => {
    const [currentPath, setCurrentPath] = useState<string[]>([]);

    const dispatch = useAppDispatch();

    useEffect(() => {
        fetchItems();
    }, [currentPath]);

    const fetchItems = async () => {
        dispatch(ImagesActions.update({ loading: true }));
        try {
            const storageRef = ref(storage, currentPath.join("/"));
            const result = await listAll(storageRef);

            const fetchedItems = await Promise.all([
                ...result.prefixes.map(async (folder) => ({ type: "folder", name: folder.name })),
                ...(await Promise.all(
                    result.items.map(async (item) => {
                        const url = await getDownloadURL(item);
                        return { type: "image", name: item.name, fullPath: item.fullPath, url };
                    }),
                )),
            ]);

            dispatch(ImagesActions.update({ list: fetchedItems }));
        } catch (error) {
            log("error", error);
        } finally {
            dispatch(ImagesActions.update({ loading: false }));
        }
    };

    const renderBreadcrumb = () => (
        <Breadcrumb>
            <Breadcrumb.Item onClick={() => setCurrentPath([])}>Root</Breadcrumb.Item>
            {currentPath.map((path, index) => (
                <Breadcrumb.Item key={index} onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}>
                    {path}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );

    return (
        <div className="image_manager__container">
            <Title title="Image Manager" />
            {renderBreadcrumb()}
            <hr />
            <ListImages currentPath={currentPath} setCurrentPath={setCurrentPath} />
        </div>
    );
};

export default ImageManager;
