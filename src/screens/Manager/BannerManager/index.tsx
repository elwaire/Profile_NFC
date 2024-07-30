import { UploadOutlined } from "@ant-design/icons";
import { Input, Upload } from "antd";
import { Link } from "react-router-dom";
import { Title } from "~/core/components";
import { useManagerBanner } from "~/core/hooks";
import "./styles.scss";

const BannerManager: React.FC = () => {
    const { link, setLink, uploadProps, banners, loading } = useManagerBanner();

    return (
        <div className="banner_manager__container">
            <Title title="Banner Manager" />
            <div className="banner_manager__container__banner">
                <div className="banner__images">
                    {banners.map((banner) => (
                        <div key={banner.id} className="banner__images__items">
                            <img src={banner.imageUrl} alt={banner.uid} />
                            {banner.link ? (
                                <Link to={banner.link} target="_blank">
                                    <p>{banner.link}</p>
                                </Link>
                            ) : (
                                <p>------</p>
                            )}
                        </div>
                    ))}
                    {loading && banners.length < 3 && <div className="loading__banner_manager" />}
                </div>
                <hr />
                <div className="banner__form">
                    {banners.length < 3 && (
                        <Input
                            placeholder="Nhập link cho banner"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            style={{ marginTop: 16 }}
                            disabled={loading}
                        />
                    )}
                    <Upload {...uploadProps} listType="picture-card" disabled={loading}>
                        {banners.length < 3 && (
                            <div className="banner__form__image_upload">
                                <UploadOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                </div>
            </div>
        </div>
    );
};

export default BannerManager;
