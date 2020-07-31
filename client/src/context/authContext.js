import React, {useReducer, createContext, useEffect} from 'react'
import {auth} from '../firebase'

// Reducer
const firebaseReducer = (state, action) => {
    switch(action.type) {
        case 'LOGGED_IN_USER':
            return {...state, user: action.payload}
        default:
            return state
    }
}

// State
const initialState = {
    user: null,
}

// Create context
const AuthContext = createContext()

// Context provider
const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(firebaseReducer, initialState)

    // Set logged in user on page refresh
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {

            if(user){
                // If there is a logged in user
                const idTokenResult = await user.getIdTokenResult() 
            
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        email: user.email,
                        token: idTokenResult.token
                    }
                })
            } else {
                // If there is no logged in user
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: null
                })

            }
        })

        // Clean up
        return () => unsubscribe()
    }, [])

    const value = {state, dispatch}
    return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
    )
}

// Export context and provider
export {AuthContext, AuthProvider}