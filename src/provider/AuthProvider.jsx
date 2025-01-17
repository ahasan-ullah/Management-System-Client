import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from '../firebase/firebase.init'
import { GoogleAuthProvider } from "firebase/auth";
import LoadingPage from "../pages/LoadingPage";

const googleProvider=new GoogleAuthProvider();

const AuthProvider = ({children}) => {
  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);

  //login method
  const loginUser=(email,password)=>{
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password);
  }

  //googlelogin
  const googleLogin=()=>{
    setLoading(true);
    return signInWithPopup(auth,googleProvider);
  }

  //signup method
  const createUser=(email,password)=>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth,email,password);
  }

  //update user method to add name and photo while registering
  const updateUser=(updateData)=>{
    setLoading(true);
    return updateProfile(auth.currentUser,updateData);
  }

  //logout method
  const logout=()=>{
    setLoading(true);
    return signOut(auth);
  }

  
  const authInfo={
    user,
    createUser,
    setUser,
    loading,
    updateUser,
    logout,
    loginUser,
    googleLogin,
  }

  // observer
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
      setUser(currentUser);
      setLoading(false);
    })
    return()=>{
      unsubscribe();
    }
  },[])

  if(loading){
    return <LoadingPage></LoadingPage>
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;