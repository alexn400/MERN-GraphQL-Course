import React, { useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify';


const Register = ()=>{

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) =>{
        e.preventDefault()
        
        //Set loading state to true
        setLoading(true)

        //Send confirmation email to user

        const config = {
            url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
            handleCodeInApp: true
        }

        const result = await auth.sendSignInLinkToEmail(email, config)
        console.log('result', result);
        
        // Show toast notification to user about email sent
        toast.success(`Email is sent to ${email}. Click the link to complete your registration`)

        // Save user email to local storage
        window.localStorage.setItem('emailForRegistration', email)

        //Clear state
        setEmail('')
        setLoading(false)
    }

 return (
     <div className='container p-5'>
             <h4 className={loading? 'text-danger': ''}>{loading? 'Loading...' : 'Register'}</h4>
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
export default Register