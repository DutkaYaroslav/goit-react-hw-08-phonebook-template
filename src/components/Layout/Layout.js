import {Fragment} from 'react';
import Navigation from '../navigation/Navigation'

const Layout = (props) => {
    // @ts-ignore
    return (
        <Fragment>
            <Navigation />
            <main>{props.children}</main>
        </Fragment>
    );
};

export default Layout;
