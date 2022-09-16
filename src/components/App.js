import React, { Component } from 'react';
import axios from "axios";

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

const BASE_URL = "https://practiceapi.devmountain.com/api";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(`${BASE_URL}/posts`)
    .then(res => {
      const posts = res.data;
      this.setState({ posts });
    });
  }

  updatePost( id, text ) {
    axios.put(`${BASE_URL}/posts?id=${id}`, {text})
    .then(res => {
      this.setState({ posts:res.data });
    });
  }

  deletePost( id ) {
    axios.delete(`${BASE_URL}/posts?id=${id}`)
    .then(res => {
      this.setState({ posts: res.data });
    });
  }

  createPost( text ) {
    axios.post(`${BASE_URL}/posts`, {text})
    .then(res => {
      this.setState({ posts: res.data });
    });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={ this.createPost } />
          {
            posts.map( post => (
              <Post 
              key={ post.id } 
              text={post.text} 
              date={post.date}
              id={post.id}
              updatePostFn={this.updatePost}
              deletePostFn={this.deletePost}
               />
            ))
          }

        </section>
      </div>
    );
  }
}

export default App;
