import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import icon from '../assets/img/icon.svg';
import { isSignUpValid } from '../utilities';
import { toast } from 'react-toastify';
import { isSignInValid } from '../utilities';
import 'react-toastify/dist/ReactToastify.css';
import state from '../store';

Modal.setAppElement('#root');

const SignInModal = ({ isOpen, closeModal }) => {
    const [signInForm, setSignInForm] = useState({
        email: '',
        password: '',
    });

   const disableBodyScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const enableBodyScroll = () => {
    document.body.style.overflow = 'visible';
  };

  useEffect(() => {
    if (isOpen) {
      disableBodyScroll(); 
    } else {
      enableBodyScroll(); 
    }
  }, [isOpen]);

    const clearSignInForm = () => {
        setSignInForm({
            email: '',
            password: '',
        });
    };

    useEffect(() => {
        try {
            const userDetailsFromStorage = JSON.parse(
                localStorage.getItem('userDetails')
            );
            if (userDetailsFromStorage && userDetailsFromStorage.userName) {
                state.isLoggedIn = true;
                state.userEmail = userDetailsFromStorage.userEmail;
                state.userName = userDetailsFromStorage.userName;
            }
        } catch (error) {
            console.error('Error parsing user details from localStorage:', error);
        }
    }, []);

    const clearSignUpForm = () => {
        setSignUpForm({
            userName: '',
            email: '',
            password: '',
        });
    };

    const handleClick = () => {
        closeModal();
        clearSignInForm();
        clearSignUpForm();
        setIsSignUp(false);
    }

    const [signUpForm, setSignUpForm] = useState({
        userName: '',
        email: '',
        password: '',
    });

    const [isSignUp, setIsSignUp] = useState(false);

    const signInHandleChange = (e) => {
        setSignInForm({ ...signInForm, [e.target.name]: e.target.value });
    };

    const signUpHandleChange = (e) => {
        setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
    };

    const signInSubmit = async (event) => {
        event.preventDefault();
        try {
            const isValid = await isSignInValid(signInForm);
            const checkEmailExists = await isSignUpValid(signInForm, "signIn");
            if (!checkEmailExists) {
                toast.error('Account not found. Please sign up for Trip Advisor.', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    style: {
                        backgroundColor: '#FF5252',
                        color: 'white',
                        borderRadius: '8px',
                        padding: '16px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                        fontFamily: 'Arial, sans-serif',
                        fontWeight: 'bold',
                        fontSize: '14px',
                    },
                });
            } else {
                if (isValid) {
                    toast.success(
                        `Welcome Back ${state.userName}`, {
                        position: 'top-right',
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        style: {
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            borderRadius: '8px',
                            padding: '16px',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                            fontFamily: 'Arial, sans-serif',
                            fontWeight: 'bold',
                            fontSize: '14px',
                        },
                    }
                    )
                    state.isLoggedIn = true;
                    state.userEmail = signInForm.email;
                    localStorage.setItem("userDetails", JSON.stringify(state));
                    handleClick();
                } else {
                    toast.error("Password doesn't match. Please check your password and try again.", {
                        position: 'top-right',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        style: {
                            backgroundColor: '#FF5252',
                            color: 'white',
                            borderRadius: '8px',
                            padding: '16px',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                            fontFamily: 'Arial, sans-serif',
                            fontWeight: 'bold',
                            fontSize: '14px',
                        },
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }

    };

    const signUpSubmit = async (event) => {
        event.preventDefault();
        try {
            const isValid = await isSignUpValid(signUpForm, "signUp");
            if (isValid) {
                const response = await axios.post('http://localhost:8081/addTripDetails', signUpForm);
                if (response.status === 200) {
                    toast.success(
                        "Sign-up Successful! Welcome to TravelAdvisor",
                        {
                            position: 'top-right',
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: false,
                            style: {
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                borderRadius: '8px',
                                padding: '16px',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                fontFamily: 'Arial, sans-serif',
                                fontWeight: 'bold',
                                fontSize: '14px',
                            },
                        }
                    );
                    localStorage.setItem("userDetails", JSON.stringify(signUpForm));
                    state.isLoggedIn = true;
                    state.userEmail = signUpForm.userEmail;
                    state.userName = signUpForm.userName;
                    handleClick();
                } else {
                    console.error('SignUp failed', response.status);
                }
            } else {
                toast.error('User already exists', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    style: {
                        backgroundColor: '#FF5252',
                        color: 'white',
                        borderRadius: '8px',
                        padding: '16px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                        fontFamily: 'Arial, sans-serif',
                        fontWeight: 'bold',
                        fontSize: '14px',
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
        clearSignUpForm();
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);

    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Sign In/Up Modal"
            appElement={document.getElementById('root')}
            className="fixed inset-0 flex items-center justify-center z-50 "
            overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 "
        >
            {isSignUp ? (
                <div className="bg-white p-8 rounded-lg shadow-md relative w-11/12 max-w-md sm:w-8/12 md:w-6/12 lg:w-4/12 ">
                    <form onSubmit={signUpSubmit}>
                        <button
                            onClick={handleClick}
                            className="absolute top-0 mt-2 mr-2 text-gray-500 hover:text-gray-700 right-0"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <img src={icon} alt="Close Icon" className="mx-auto mb-4 h-16" />
                        <h2 className="font-semibold mb-4 flex justify-center items-center text-2xl">
                            Sign Up
                        </h2>


                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Name</label>
                            <input
                                type="text"
                                name="userName"
                                value={signUpForm.userName}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-black"
                                placeholder="Enter your Name"
                                onChange={signUpHandleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-black"
                                placeholder="Enter your email"
                                name="email"
                                value={signUpForm.email}
                                required
                                onChange={signUpHandleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={signUpForm.password}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-black"
                                placeholder="Enter your password"
                                required
                                onChange={signUpHandleChange}
                            />
                        </div>
                        <button className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded w-full">
                            Sign Up
                        </button>
                    </form>
                    <p className="mt-4 text-center">
                        Already a member?
                        <span className="text-blue-500 cursor-pointer ml-1" onClick={toggleMode}>
                            Sign In
                        </span>
                    </p>
                </div>
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-md relative w-11/12 max-w-md sm:w-8/12 md:w-6/12 lg:w-4/12 ">
                    <form onSubmit={signInSubmit}>
                        <button
                            onClick={handleClick}
                            className="absolute top-0 mt-2 mr-2 text-gray-500 hover:text-gray-700 right-0"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <img src={icon} alt="Close Icon" className="mx-auto mb-4 h-16" />
                        <h2 className="font-semibold mb-4 flex justify-center items-center text-2xl">
                            Sign In
                        </h2>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-black"
                                placeholder="Enter your email"
                                name="email"
                                value={signInForm.email}
                                required
                                onChange={signInHandleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={signInForm.password}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-black"
                                placeholder="Enter your password"
                                required
                                onChange={signInHandleChange}
                            />
                        </div>
                        <button className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded w-full">
                            Sign In
                        </button>
                    </form>
                    <p className="mt-4 text-center">
                        Not a member?
                        <span className="text-blue-500 cursor-pointer ml-1" onClick={toggleMode}>
                            Sign Up
                        </span>
                    </p>
                </div>
            )}
        </Modal>
    );
};

export default SignInModal;
