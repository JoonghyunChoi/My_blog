import React from 'react';
import './Layout.css';
import Toolbar from '../Toolbar/Toolbar';

class Layout extends React.Component {
    render() {
        return (
            <div className='container'>
                <Toolbar />
                {/* <Leftbar />
                <Rightbar /> */}
                {this.props.children}
            </div>
        )
    }
}

export default Layout;