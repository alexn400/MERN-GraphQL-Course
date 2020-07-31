// const { gql } = require('apollo-server-express');
const { posts } = require('../temp');

// Queries

const totalPosts = () => posts.length;

const allPosts = () => posts;

// Mutations
const newPost = (parent, { input: { title, description } }) => {
  // Create a new post object

  const post = {
    id: posts.length + 1,
    title,
    description,
  };

  // Push new post to post array
  posts.push(post);
  return post;
};

module.exports = {
  Query: {
    totalPosts,
    allPosts,
  },
  Mutation: {
    newPost,
  },
};
