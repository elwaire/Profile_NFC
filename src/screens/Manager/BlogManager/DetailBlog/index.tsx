import { Loading, Title } from "~/core/components";

import { Tag } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector, useCheckData } from "~/core/hooks";
import { getDataFirebaseById } from "~/core/services";
import { BlogsActions } from "~/core/store";
import { BlogPost } from "~/core/types";
import { formatTime } from "~/core/utils";
import log from "~/core/utils/log";
import "./styles.scss";

const DetailBlog: React.FC = () => {
    const [detailBlog, setDetailBlog] = React.useState<BlogPost>();

    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.root.blogs);

    const param = useParams();
    const { checkSnapshot } = useCheckData();

    const getDetailBlog = async () => {
        dispatch(BlogsActions.update({ loading: true }));
        try {
            const docSnap = await getDataFirebaseById("blogs", `${param.id}`);

            checkSnapshot(docSnap);

            if (docSnap.exists()) {
                const data = docSnap.data() as BlogPost;

                setDetailBlog(data);
            }
        } catch (error) {
            log("error", error);
        } finally {
            dispatch(BlogsActions.update({ loading: false }));
        }
    };

    useEffect(() => {
        if (param.id) {
            getDetailBlog();
        }
    }, [param.id]);

    return (
        <>
            {loading && <Loading />}
            <div className="detail_blog__container">
                <Title title={detailBlog?.title || "------"} backPage />
                <div className="detail_blog__container__wrapper">
                    <div className="detail_blog__container__wrapper__group">
                        <h1>{detailBlog?.title}</h1>
                        {detailBlog?.timeCreated && <Tag color="blue">{formatTime(detailBlog?.timeCreated)}</Tag>}
                    </div>
                    {detailBlog?.sections.map((section) => (
                        <div key={section.key} className="detail_blog__container__wrapper__section">
                            <div
                                className={
                                    section.images.length === 1
                                        ? "detail_blog__container__wrapper__section__images"
                                        : "detail_blog__container__wrapper__section__images_list"
                                }
                            >
                                {section.images.map((image) => (
                                    <img src={image.url} alt="section" key={image.uid} />
                                ))}
                            </div>
                            <div className="detail_blog__container__wrapper__section__content">
                                {section.contents.map((content, index) => (
                                    <p key={`detail-blog-"${index}`}>{content}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DetailBlog;
