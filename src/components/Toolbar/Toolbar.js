import React from 'react';
import './Toolbar.css';
import {NavLink} from 'react-router-dom';
import Search from '../../components/Input/Search/Search';
import Backdrop from './../../components/UI/Backdrop/Backdrop';
import Modal from './../../components/UI/Modal/Modal';
import Button from '../UI/Button/Button';
import Auth from '../../containers/Auth/Auth';

class Toolbar extends React.Component {
    state = {
        show: false,
    }
    BackdropClicked = () => {
        this.setState({show: false})
    }

    loginClickedHandler = () => {
        this.setState({show: true});
    }
    render() {
        return (
            <div className="Toolbar">
                <header>
                    <nav className="Nav">
                        <ul className="Nav--left">
                            <NavLink exact to={{
                                pathname: "/posts"
                            }}>CoDEV </NavLink>
                            <NavLink to={{
                                pathname: '/qa'
                            }}>질문게시판</NavLink>
                            <NavLink to={{
                                pathname: '/study'
                            }}>스터디</NavLink>
                            <NavLink to={{
                                pathname: '/job'
                            }}>구인구직</NavLink>
                        </ul>
                        <div className="Nav--right">
                            <Search />
                            <Button clicked={this.loginClickedHandler} btnType="Login">로그인</Button>
                        </div>
                    </nav>
                </header>
                <Backdrop clicked={this.BackdropClicked} show={this.state.show}/>
                <Modal show={this.state.show}> 
                    <Auth show={this.state.show}/>
                </Modal>
            </div>         
        )
    }
}

export default Toolbar;