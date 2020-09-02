import React, { Component, Suspense, lazy } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
import QA from './QA/QA';
import Message from './Message/Message';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import NewPost from './NewPost/NewPost' ;
// const NewPost = React.lazy(() => import('./NewPost/NewPost'));

class Blog extends Component {
    state = {
        auth: true
    }
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <NavLink exact to={{
                                pathname: '/posts',
                                hash: '#submit',
                                search: 'quick-services=true' //query string
                            }}>CoDEV </NavLink>
                            <NavLink to={{
                                pathname: '/qa'
                            }}>QA</NavLink>
                            <NavLink to={{
                                pathname: '/study'
                            }}>Study</NavLink>
                            <NavLink to={{
                                pathname: '/job'
                            }}>Job</NavLink>
                            <NavLink to={{
                                pathname: '/log-in'
                            }}>Log In</NavLink>
                            <NavLink to={{
                                pathname: '/sign-up'
                            }}>Sign Up</NavLink>
                        </ul>
                    </nav>
                </header>
                {/* <Suspense fallback={<h1>Loading...</h1>}>
                        <NewPost /> 
                </Suspense> */}
                <Switch>
                    {/* <Route render={() => <h1>Not Found</h1>}/> */}
                    
                    {this.state.auth ? <Route path='/new-post' exact component={NewPost}/> : null}
                    <Route path='/posts' component={Posts}/>
                    <Route path='/qa' component={QA}/>
                    <Route path='/message' component={Message}/>
                    {/* <Route path='/study' component={Study}/>
                    <Route path='/job' component={Job}/> */}
                    <Redirect from="/" to="/posts"/>
                </Switch>
            </div>
        )
    }
}

export default Blog;


