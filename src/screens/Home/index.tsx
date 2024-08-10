import { transitionPage } from "~/core/hoc";
import "./styles.scss";
import { Title } from "~/core/components";
import TableSubcriptions from "./components/TableSubcriptions";
import Statisticals from "./components/Statisticals";

const HomeScreen: React.FC = () => {
    return (
        <div className="home__container">
            <Title title="Dashboard" />
            <div className="home__container__wrapper">
                <TableSubcriptions />
                <Statisticals />
            </div>
        </div>
    );
};

export default transitionPage({ OgComponent: HomeScreen });
