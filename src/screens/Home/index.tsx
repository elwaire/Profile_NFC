import { transitionPage } from "~/core/hoc";
import "./styles.scss";

const HomeScreen: React.FC = () => {
    return <div className="home__container">Home</div>;
};

export default transitionPage({ OgComponent: HomeScreen });
