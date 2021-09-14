import React from "react"
import { Switch } from "react-router-dom"
import AuthPage from "./pages/AuthPage"
import CreatePage from "./pages/CreatePage"
import DetailPage from "./pages/DetailPage"
import LinksPage from "./pages/LinksPage"
import { Route, Redirect } from "react-router"
import Header from "./Header/Header"

export const useRoutes = (isAuth) => {
    return (
        <div>
            {isAuth ? (
                <>
                    <Switch>
                        <Route path="/links" exact>
                            <LinksPage />
                        </Route>
                        <Route path="/create" exact>
                            <CreatePage />
                        </Route>
                        <Route path="/detail/:id">
                            <DetailPage />
                        </Route>
                        <Redirect to="/links" />
                    </Switch>
                </>
            ) : (
                <Switch>
                    <Route path="/" exact>
                        <AuthPage />
                    </Route>
                    <Redirect to="/" />
                </Switch>
            )}
        </div>
    )
}
