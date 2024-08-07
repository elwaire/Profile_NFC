import { Loading, Title } from "~/core/components";

import { Tag } from "antd";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector, useCheckData } from "~/core/hooks";
import { getDataFirebaseById } from "~/core/services";
import { ProjectsActions } from "~/core/store";
import { ProjectPost } from "~/core/types/Entities/Project";
import { formatTime } from "~/core/utils";
import log from "~/core/utils/log";
import "./styles.scss";

const DetailProject: React.FC = () => {
    const [detailProject, setDetailProject] = React.useState<ProjectPost>();

    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.root.projects);

    const param = useParams();
    const { checkSnapshot } = useCheckData();

    const getDetailProject = async () => {
        dispatch(ProjectsActions.update({ loading: true }));
        try {
            const docSnap = await getDataFirebaseById("projects", `${param.id}`);

            checkSnapshot(docSnap);

            if (docSnap.exists()) {
                const data = docSnap.data() as ProjectPost;

                setDetailProject(data);
            }
        } catch (error) {
            log("error", error);
        } finally {
            dispatch(ProjectsActions.update({ loading: false }));
        }
    };

    useEffect(() => {
        if (param.id) {
            getDetailProject();
        }
    }, [param.id]);

    return (
        <>
            {loading && <Loading />}
            <div className="detail_project__container">
                <Title title={detailProject?.title || "------"} backPage />
                <div className="detail_project__container__wrapper">
                    <div className="detail_project__container__wrapper__group">
                        <h1>{detailProject?.title}</h1>
                        <p>{detailProject?.description || ""}</p>
                        <Link to={detailProject?.link || ""} target="_blank">
                            {detailProject?.link}
                        </Link>
                        {detailProject?.timeCreated && <Tag color="blue">{formatTime(detailProject?.timeCreated)}</Tag>}
                    </div>
                    {detailProject?.sections.map((section) => (
                        <div key={section.key} className="detail_project__container__wrapper__section">
                            <div
                                className={
                                    section.images.length === 1
                                        ? "detail_project__container__wrapper__section__images"
                                        : "detail_project__container__wrapper__section__images_list"
                                }
                            >
                                {section.images.map((image) => (
                                    <img src={image.url} alt="section" key={image.uid} />
                                ))}
                            </div>
                            <div className="detail_project__container__wrapper__section__content">
                                {section.contents.map((content, index) => (
                                    <p key={`detail-project-"${index}`}>{content}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DetailProject;
