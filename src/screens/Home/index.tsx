import { Title } from "~/core/components";
import { transitionPage } from "~/core/hoc";
import TableSubcriptions from "./components/TableSubcriptions";
import "./styles.scss";
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
