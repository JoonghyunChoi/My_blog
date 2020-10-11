import React, { Component } from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import './NewPost.css';
import axios from 'axios';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: '',
        email: 'sdfg4@naver.com',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhd3NTZXJ2ZXIiLCJleHAiOjE2MDExOTU0NTksImlhdCI6MTYwMTE5NDg1OX0.LgdsG-OWmYuYmnOkg8BMesAZTpqZFHjSOjopxPkhAmM',
    }

    postHandler = () => {
        const post = {
            title: this.state.title,
            contents: this.state.content,
            writer: this.state.author,
            email: this.state.email,        // this.props.
            token: this.state.token         // this.props.
        }
        axios.post('/frontQABoard/create', post)
        .then(response => {
            console.log(response);
            this.props.history.push('/qa'); 
        })
        .catch(error => console.log(error)) 
    }

    toListHandler = () => {
        this.props.history.push('/qa')
    }

    render () {
     /* let redirect = null;
        if(this.state.submited) {
            redirect = <Redirect to="/posts"/>
            } */
        return (
            <section>
                <div className="NewPost">
                    <h1>Add a Post</h1>
                    <label>Title</label>
                    <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                    <label>Content</label>
                    <textarea rows="10" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                    <label>Author</label>
                    <input type="text" value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}/>
                    <button onClick={this.postHandler}>Add Post</button>
                </div>
                <div className="tolist">
                    <button onClick={this.toListHandler}>To List</button>
                </div>
            </section>
        );
    }
}

export default NewPost

//export default withRouter(NewPost); withRouter로 <Suspense>안에서 이 컴포넌트를 호출해도, 이 컴포넌트 내에서 this.props를 받을 수 있다.

/*
{
	"writer": "nick",
	"title": "article3",
	"contents": "this is a first article gg",
    "email" : "sdfg4@naver.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhd3NTZXJ2ZXIiLCJleHAiOjE2MDExOTU0NTksImlhdCI6MTYwMTE5NDg1OX0.LgdsG-OWmYuYmnOkg8BMesAZTpqZFHjSOjopxPkhAmM"
}
*/