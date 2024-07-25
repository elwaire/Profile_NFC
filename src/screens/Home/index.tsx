import { transitionPage } from "~/core/hoc";

const HomeScreen: React.FC = () => {
    return <div>home</div>;
};

export default transitionPage({ OgComponent: HomeScreen });
