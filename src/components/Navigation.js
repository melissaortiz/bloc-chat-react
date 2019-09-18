import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';


const Navigation = () => (
    <div>
    <AuthUserContext.Consumer>
    {   authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </AuthUserContext.Consumer>
    </div>
    )

const NavigationAuth = () => (
        <ul>
            <li>
                <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
            <li>
                <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
                <Link to={ROUTES.ADMIN}>Admin</Link>
            </li>
            <li>
                <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            <li>
            <SignOutButton />
            </li>
        </ul>
)

const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>LANDING</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_IN}>SIGN IN</Link>
        </li>
    </ul>
)

export default Navigation;