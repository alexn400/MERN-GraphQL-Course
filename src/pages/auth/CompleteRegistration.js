import React, {useState, useEffect, useContext} from 'react'
import {auth} from '../../firebase'
import {toast} from 'react-toastify'
import {useHistory} from 'react-router-dom'
import {AuthContext} from '../../context/authContext'

const CompleteRegistration = () => {

    const {dispatch} = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    let history = useHistory()

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'))
    }, [history])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // Validation
        if(!email || !password) {
            toast.error('Email and password is required')
            return
        }

        try {
            // Sign in user
            const result = await auth.signInWithEmailLink(email, window.location.href)
        
            // Set users password
            if(result.user.emailVerified) {
                // remove email from local storage
                window.localStorage.removeItem('emailForRegistration')

                let user = auth.currentUser
                await user.updatePassword(password)

                // Dispatch user with token and email
                const idTokenResult = await user.getIdTokenResult()
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        email: user.email,
                        token: idTokenResult.token,
                    }
                })
                // API request to store user in mongo db


                // Redirect user
                history.push('/')
            }
        
        } catch (error) {
            console.log('Registration complete error', error.message);
            setLoading(false)
            toast.error(error.message)
        }
    }

    return (
    <div className='container p-5'>
        <h4 className={loading? 'text-danger': ''}>{loading? 'Loading...' : 'Complete Registration'}</h4>
        <form onSubmit={handleSubmit}>
           <div className='form-group'>
               <label>Email Address</label>
               <input 
               type='email' 
               value={email} 
               onChange={(e)=>{setEmail(e.target.value)}} 
               className='form-control'
               placeholder='Enter email'
               disabled
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
               />
           </div>
           <button 
           className='btn btn-raised btn-primary'
           disabled={!email || loading}
           >Submit</button>
        </form>
    </div>
    )
}

export default CompleteRegistration