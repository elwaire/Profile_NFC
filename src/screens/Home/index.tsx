import { transitionPage } from "~/core/hoc";
import "./styles.scss";
import ItemSocialMedia from "./components/ItemSocialMedia";
import { useParams } from "react-router-dom";
import { getDataFirebaseById } from "~/core/services";
import { useEffect, useState } from "react";
import { message, Spin } from "antd";

type dataDetail = {
    id: string;
    avatarUrl: string;
    bannerUrl: string;
    description: string;
    links: {
        image: string;
        title: string;
        url: string;
    }[];
    name: string;
};

const HomeScreen: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<dataDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!id) return;

        let isMounted = true;

        const fetchData = async () => {
            try {
                const docSnap = await getDataFirebaseById("items", id);
                if (docSnap.exists() && isMounted) {
                    const data = docSnap.data();
                    setData({ id: docSnap.id, ...(data as Omit<dataDetail, "id">) });
                } else {
                    message.warning("Không tìm thấy dữ liệu.");
                }
            } catch (error) {
                message.error("Lỗi khi lấy dữ liệu.");
                console.error(error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false; // tránh update khi unmounted
        };
    }, [id]);

    if (loading) return <Spin />;

    if (!data) return <div>Không có dữ liệu</div>;
    return (
        <div className="home__container">
            <div className="home__container__head">
                <img
                    src={data.bannerUrl || ""}
                    alt={data.name || "Anonymouse"}
                    className="home__container__head__image"
                />
                <div className="home__container__head__avatar">
                    <img src={data.avatarUrl || ""} alt={data.name} />
                </div>
                <div className="home__container__head__info">
                    <h1 className="home__container__head__info__title">{data.name || "Anonymouse"}</h1>
                    <p className="home__container__head__info__description">{data.description || ""}</p>
                </div>
            </div>
            <div className="home__container__content">
                {data.links.map((link, index) => (
                    <ItemSocialMedia key={index} {...link} />
                ))}
            </div>
        </div>
    );
};

export default transitionPage({ OgComponent: HomeScreen });
