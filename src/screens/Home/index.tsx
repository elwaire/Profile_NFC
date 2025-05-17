import { transitionPage } from "~/core/hoc";
import "./styles.scss";
import fakeData from "~/core/utils/fakeData";
import ItemSocialMedia from "./components/ItemSocialMedia";

const HomeScreen: React.FC = () => {
    return (
        <div className="home__container">
            <div className="home__container__head">
                <img
                    src="https://i.pinimg.com/736x/70/36/67/7036672cbad39617f1742c3b02aaa2bd.jpg"
                    alt=""
                    className="home__container__head__image"
                />
                <div className="home__container__head__avatar">
                    <img src="https://i.pinimg.com/736x/55/55/c2/5555c203a84e686e3231af8948c350d4.jpg" alt="" />
                </div>
                <div className="home__container__head__info">
                    <h1 className="home__container__head__info__title">Vo Ngoc Min Kien</h1>
                    <p className="home__container__head__info__description">
                        “A beautiful painting is made by the way you capture the beauty of the world on it.”
                    </p>
                </div>
            </div>
            <div className="home__container__content">
                {fakeData(3).map((_, index) => (
                    <ItemSocialMedia key={index} />
                ))}
            </div>
        </div>
    );
};

export default transitionPage({ OgComponent: HomeScreen });
