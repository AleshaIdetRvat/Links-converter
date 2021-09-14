import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/auth.hook";
import { useRoutes } from "./routes";
import Header from "./Header/Header";
import Loader from "./components/common/Loader";
import "materialize-css";

const App = () => {
    const { token, login, logout, userId, ready } = useAuth();
    const isAuth = !!token; // equal -> Bollean(token)
    const routes = useRoutes(isAuth, logout);

    if (!ready) {
        return <Loader />;
    }

    return (
        <AuthContext.Provider value={{ token, login, logout, userId, isAuth, ready }}>
            <BrowserRouter>
                {isAuth ? <Header logout={logout} /> : ""}
                <div className="container">{routes}</div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default App;
