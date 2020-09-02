import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import './NewPost.css';
import axios from 'axios';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
    }

    postHandler = () => {
        const post = {
            title: this.state.title,
            content: this.state.content,
            author: this.state.author
        }
        axios.post('https://jsonplaceholder.typicode.com/posts', post)
        .then(response => {
            console.log(response);
            this.props.history.push('/posts'); 
        }); 
    }

    render () {
        // let redirect = null;
        // if(this.state.submited) {
        //     redirect = <Redirect to="/posts"/>
        // }
        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postHandler}>Add Post</button>
            </div>
        );
    }
}

export default withRouter(NewPost); //withRouter로 <Suspense>안에서 이 컴포넌트를 호출해도, 이 컴포넌트 내에서 this.props를 받을 수 있다.