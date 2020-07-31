const { gql } = require('apollo-server-express');

const me = () => 'Alex';

module.exports = {
  Query: {
    me,
  },
};
