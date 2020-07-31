import React, { useState, useContext } from 'react'
import {AuthContext} from '../../context/authContext'
import {Link, useHistory} from 'react-router-dom'
import {toast} from 'react-toastify'
import {auth, googleAuthProvider} from '../../firebase'

const Login = ()=>{

    // Context
    const {dispatch} = useContext(AuthContext)

    // State
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    let history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            // Attempt to log in user
            const result = await auth.signInWithEmailAndPassword(email, password)
            const {user} = result
            const idTokenResult = await user.getIdTokenResult()

            dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                    email: user.email,
                    token: idTokenResult.token
                }
            })

            // Send user info to mongo db 

            // Redirect user
            history.push('/')

        } catch (error) {
            console.log('error', error);
            toast.error(error.message);
            setLoading(false)
        }
    }

    const googleLogin = async () => {
        try {
        const result = await auth.signInWithPopup(googleAuthProvider)
        const {user} = result
            const idTokenResult = await user.getIdTokenResult()

            dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                    email: user.email,
                    token: idTokenResult.token
                }
            })

            // Send user info to mongo db 

            // Redirect user
            history.push('/')

        } catch (error) {
            console.log('error', error);
            toast.error(error.message);
            setLoading(false)
        }
    }

 return (
     <div className='container p-5'>
        <h4>{loading ? 'loading...' : 'login'}</h4>
        <button className='btn btn-raised btn-danger mt-5' onClick={googleLogin}>Login with Google</button>
        <form onSubmit={handleSubmit}>
        <div className='form-group'>
            <label>Email Address</label>
            <input 
            type='email' 
            value={email} 
            onChange={(e)=>{setEmail(e.target.value)}} 
            className='form-control'
            placeholder='Enter email'
            disabled={loading}
            required
            />
        </div>
        <div className='form-group'>
            <label>Password</label>
            <input 
            type='password' 
            value={password} 
            onChange={(e)=>{setPassword(e.target.value)}} 
            className='form-control'
            placeholder='Enter password'
            disabled={loading}
            required
            />
        </div>
        <button 
                className='btn btn-raised btn-primary'
                >Login</button>
        </form>
     </div>
 )
}
export default Login