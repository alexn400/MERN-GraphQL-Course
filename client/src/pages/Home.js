import React, {useState, useContext} from 'react';
import {gql} from 'apollo-boost'
import {useQuery, useLazyQuery} from '@apollo/react-hooks'
import {AuthContext} from '../context/authContext'
import { UseHistory, useHistory}  from 'react-router-dom'

const GET_ALL_POSTS = gql`
  {
    allPosts {
      id
      title
      description
    }
  }
`

const Home = () => {

  const {data, loading, error} = useQuery(GET_ALL_POSTS)
  const [fetchPosts, {data: posts}] = useLazyQuery(GET_ALL_POSTS)

  const {state, dispatch} = useContext(AuthContext)

  let history = useHistory()

  const updateUserName = () => {
    dispatch({
      type: 'LOGGED_IN_USER',
      payload: 'Alex'
    })
  }

  if(loading){
    return (
      <p className={'p-5'}>Loading...</p>
    )
  }

  return (
    <div className={'container p-5'}>
      <div className={'row p-5'}>
      {data.allPosts.map((post)=>
        <div className={'col-md-4'} key={post.id}>
          <div className={'card'}>
            <div className={'card-body'}>
              <div className={'card-title'}>
                <h4>{post.title}</h4>
              </div>
              <p className={'card-text'}>{post.description}</p>
            </div>
          </div>
        </div>
      )}
      </div>
      <div className={'row p-5'}>
        <button onClick={fetchPosts} className={'btn btn-raised btn-primary'}>Fetch posts</button>
      </div>
      <hr/>
      {JSON.stringify(posts)}
      <hr/>
      {JSON.stringify(state.user)}
      <hr/>
      <button onClick={updateUserName} className={'btn btn-primary'}>Change user name</button>
      <hr/>
      {JSON.stringify(history)}
    </div>
  );
}

export default Home;
