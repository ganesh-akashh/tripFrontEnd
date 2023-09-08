import logo from '../assets/img/logo.svg';
import { useState } from 'react';
import SignInModal from './SignInModal';
import { Link } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import state from '../store';
import userIcon from "../assets/img/userIcon.png"
import { AiOutlineLogout } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const Navbar = ({ sticky, border }) => {


    const navigate = useNavigate();

    const [scrolled, setScrolled] = useState(false);

    const [isMenuToggled, setIsMenuToggled] = useState(false);
    const snap = useSnapshot(state);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    if (sticky) {
        window.addEventListener('scroll', () => window.scrollY > 20 ? setScrolled(true) : setScrolled(false));
    }


    const openModal = () => {
        setIsModalOpen(true);
        setIsMenuToggled(false)
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handleToggleClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }
    const handleSignOutClick = (e) => {
        localStorage.clear();
        navigate('/');
        toast.success('Signed Out successfully. We hope to see you again!', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
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
        });
        state.userName = '';
        state.userEmail = '';
        state.isLoggedIn = false;
    }

    return (
        <nav className={`${((scrolled || border) && !isModalOpen) && 'border-b-2'} ${sticky && 'sticky top-0'} relative z-50  ${!isModalOpen && 'bg-white transition duration-700'}`}>
            <div className={`container mx-auto w-full top-0  flex justify-between items-center px-4 py-2`}>
                <Link to="/" >
                    <img src={logo} alt="Traveladvisor" className="w-[200px] sm:w-[220px] md:w-[240px]" />
                </Link>
                <ul className="hidden mmd:flex gap-1 items-center justify-center">
                    <Link to="/hotels">
                        <li className="rounded-full hover:bg-gray-300 py-2 px-2 cursor-pointer">
                            <p className="flex font-medium items-center ">
                                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-1">
                                    <path d="M20.587 12.139V4.144H3.424v7.986A3.805 3.805 0 002 15.097v4.755h1.906v-1.905h16.188v1.91H22v-4.76a3.804 3.804 0 00-1.413-2.958zm-1.906-6.09V8.83a5.048 5.048 0 00-2.865-.876c-1.565 0-2.952.69-3.816 1.749-.864-1.059-2.252-1.749-3.818-1.749-1.07 0-2.056.324-2.851.866V6.049h13.35zm-.258 5.248c-.077-.005-.155-.012-.234-.012h-4.971c.438-.838 1.437-1.426 2.598-1.426 1.168 0 2.173.593 2.607 1.438zm-7.643-.012H5.812c-.081 0-.159.007-.238.012.434-.844 1.438-1.438 2.606-1.438 1.163 0 2.163.588 2.6 1.426zM3.906 16.04v-.943c0-1.051.855-1.905 1.906-1.905h12.376c1.051 0 1.905.854 1.905 1.905v.943H3.906z"></path>
                                </svg>
                                Hotels
                            </p>
                        </li>
                    </Link>

                    <Link to="/restaurents">
                        <li className="rounded-full hover:bg-gray-300 py-2 px-2 cursor-pointer">
                            <p className="flex font-medium items-center">
                                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-1">
                                    <path d="M18.753 21.459l-5.502-5.504-2.85 2.851-1.663-1.662-4.315 4.315-1.343-1.344 4.316-4.316-4.004-4.003A4.718 4.718 0 012 8.438c0-1.269.494-2.461 1.392-3.358l.834-.835 7.362 7.362.866-.866c-1.099-1.719-.777-3.972.912-5.661l2.538-2.538 1.343 1.344-2.538 2.537c-.785.787-1.254 1.903-.852 2.916l4.423-4.422 1.343 1.344-4.429 4.428c.31.13.64.188.977.164.646-.043 1.299-.364 1.838-.904a630.937 630.937 0 002.642-2.653L22 8.631s-1.241 1.255-2.647 2.66c-.865.865-1.951 1.383-3.057 1.456a4.027 4.027 0 01-2.501-.66l-.864.862 7.166 7.166-1.344 1.344zM4.291 6.995A2.835 2.835 0 003.9 8.438c0 .762.296 1.478.835 2.015l5.666 5.667 1.506-1.507-7.616-7.618z"></path>
                                </svg>
                                Restaurants
                            </p>
                        </li>
                    </Link>

                    <Link to="/attractions">
                        <li className="rounded-full hover:bg-gray-300 py-2 px-2 cursor-pointer" >
                            <p className="flex font-medium items-center">
                                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-1">
                                    <circle cx="12" cy="8.5" r="1"></circle>
                                    <circle cx="12" cy="12" r="1"></circle>
                                    <circle cx="12" cy="15.5" r="1"></circle>
                                    <path d="M20 6.5V8c-1.5.7-2.5 2.3-2.5 4 0 1.8 1 3.3 2.5 4v1.5H4V16c1.5-.7 2.5-2.3 2.5-4 0-1.8-1-3.3-2.5-4V6.5h16m2-2H2v5c1.4 0 2.5 1.1 2.5 2.5S3.4 14.5 2 14.5v5h20v-5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5v-5z"></path>
                                </svg>
                                Attractions
                            </p>
                        </li>
                    </Link>



                    {snap.isLoggedIn === false ?
                        <li className={` ${!isModalOpen && 'bg-black text-white'} rounded-full cursor-pointer`}>
                            <button onClick={openModal} className=' px-2 py-2 '>
                                <p className='flex font-medium items-center justify-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='h-4 w-6 mr-1' viewBox="0 0 448 512" fill='currentColor'>
                                        <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                                    </svg>
                                    Sign In
                                </p>
                            </button>
                        </li>
                        :
                        <li
                            className='rounded-full  cursor-pointer'
                        >
                            <div
                                onClick={handleToggleClick}
                                className='relative'
                            >
                                <button className=' px-2 py-2 '>
                                    <p className='flex text-lg items-center justify-center font-semibold'>
                                        <img src={userIcon} className='w-12 h-12 rounded-full object-cover mr-3' />
                                        {snap.userName}
                                    </p>
                                </button>
                                {isDropdownOpen && (
                                    <div
                                        className="absolute bg-white border rounded-md border-gray-300 mt-2 py-2  text-gray-700 shadow-lg z-50 w-44 animate-slide-in"
                                        id="userOptions"
                                    >
                                        <Link to="/userProfile"><p className="px-4 py-2 font-medium hover:bg-gray-100 cursor-pointer  justify-between flex items-center">Profile<AiOutlineUser className='h-4 w-4' /></p></Link>
                                        <p className="px-4 py-2 font-medium  cursor-pointer flex  justify-between items-center hover:bg-gray-100  gap-3" onClick={handleSignOutClick} >Sign Out<AiOutlineLogout className='h-4 w-4 ' /></p>
                                    </div>
                                )}
                            </div>
                        </li>
                    }
                </ul>

                <div
                    className='mmd:hidden rounded-full hover:bg-gray-300 cursor-pointer p-2'
                    onClick={() => isMenuToggled ? setIsMenuToggled(false) : setIsMenuToggled(true)}
                >
                    {
                        !isMenuToggled ? (
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )
                    }

                </div>
            </div>

            {
                isMenuToggled && (
                    <div className='flex mmd:hidden flex-col absolute bg-white rounded-sm shadow-md right-0 animate-slide-in'>

                        <Link to={"/hotels"}>
                            <p className='flex font-medium items-center cursor-pointer px-3 py-3 hover:bg-gray-300'>
                                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2">
                                    <path d="M20.587 12.139V4.144H3.424v7.986A3.805 3.805 0 002 15.097v4.755h1.906v-1.905h16.188v1.91H22v-4.76a3.804 3.804 0 00-1.413-2.958zm-1.906-6.09V8.83a5.048 5.048 0 00-2.865-.876c-1.565 0-2.952.69-3.816 1.749-.864-1.059-2.252-1.749-3.818-1.749-1.07 0-2.056.324-2.851.866V6.049h13.35zm-.258 5.248c-.077-.005-.155-.012-.234-.012h-4.971c.438-.838 1.437-1.426 2.598-1.426 1.168 0 2.173.593 2.607 1.438zm-7.643-.012H5.812c-.081 0-.159.007-.238.012.434-.844 1.438-1.438 2.606-1.438 1.163 0 2.163.588 2.6 1.426zM3.906 16.04v-.943c0-1.051.855-1.905 1.906-1.905h12.376c1.051 0 1.905.854 1.905 1.905v.943H3.906z"></path>
                                </svg>
                                Hotels
                            </p>
                        </Link>

                        <Link to={"/restaurents"}>
                            <p className='flex font-medium items-center cursor-pointer px-3 py-3 hover:bg-gray-300'>
                                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2">
                                    <path d="M20.587 12.139V4.144H3.424v7.986A3.805 3.805 0 002 15.097v4.755h1.906v-1.905h16.188v1.91H22v-4.76a3.804 3.804 0 00-1.413-2.958zm-1.906-6.09V8.83a5.048 5.048 0 00-2.865-.876c-1.565 0-2.952.69-3.816 1.749-.864-1.059-2.252-1.749-3.818-1.749-1.07 0-2.056.324-2.851.866V6.049h13.35zm-.258 5.248c-.077-.005-.155-.012-.234-.012h-4.971c.438-.838 1.437-1.426 2.598-1.426 1.168 0 2.173.593 2.607 1.438zm-7.643-.012H5.812c-.081 0-.159.007-.238.012.434-.844 1.438-1.438 2.606-1.438 1.163 0 2.163.588 2.6 1.426zM3.906 16.04v-.943c0-1.051.855-1.905 1.906-1.905h12.376c1.051 0 1.905.854 1.905 1.905v.943H3.906z"></path>
                                </svg>
                                Restaurants
                            </p>
                        </Link>

                        <Link to={"/attractions"}>
                            <p className='flex font-medium items-center cursor-pointer px-3 py-3 hover:bg-gray-300'>
                                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2">
                                    <path d="M20.587 12.139V4.144H3.424v7.986A3.805 3.805 0 002 15.097v4.755h1.906v-1.905h16.188v1.91H22v-4.76a3.804 3.804 0 00-1.413-2.958zm-1.906-6.09V8.83a5.048 5.048 0 00-2.865-.876c-1.565 0-2.952.69-3.816 1.749-.864-1.059-2.252-1.749-3.818-1.749-1.07 0-2.056.324-2.851.866V6.049h13.35zm-.258 5.248c-.077-.005-.155-.012-.234-.012h-4.971c.438-.838 1.437-1.426 2.598-1.426 1.168 0 2.173.593 2.607 1.438zm-7.643-.012H5.812c-.081 0-.159.007-.238.012.434-.844 1.438-1.438 2.606-1.438 1.163 0 2.163.588 2.6 1.426zM3.906 16.04v-.943c0-1.051.855-1.905 1.906-1.905h12.376c1.051 0 1.905.854 1.905 1.905v.943H3.906z"></path>
                                </svg>
                                Attractions
                            </p>
                        </Link>

                        {snap.isLoggedIn === false ?
                                <p className='flex font-medium text-white bg-black  gap-2  items-center cursor-pointer px-3 py-3 hover:bg-gray-300' onClick={openModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='h-4 w-6 mr-1' viewBox="0 0 448 512" fill='currentColor'>
                                        <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                                    </svg>
                                    Sign In
                                </p>
                            
                            :
                            <div
                                className='cursor-pointer'
                            >
                                <div
                                    onClick={handleToggleClick}
                                >
                                        <p className='flex px-2 py-2 items-center gap-2 font-semibold'>
                                            <img src={userIcon} className='w-9 h-9 rounded-full object-cover' />
                                            {snap.userName}
                                        </p>
                                    {isDropdownOpen && (
                                        <div
                                            className="absolute animate-slide-in bg-white border rounded-md border-gray-300 mt-1 py-2  text-gray-700 shadow-lg z-50 w-44"
                                            id="userOptions"
                                        >
                                            <Link to="/userProfile"><p className="px-4 py-2 font-medium hover:bg-gray-100 cursor-pointer  justify-between flex items-center">Profile<AiOutlineUser className='h-4 w-4' /></p></Link>
                                            <p className="px-4 py-2 font-medium  cursor-pointer flex  justify-between items-center hover:bg-gray-100  gap-3" onClick={handleSignOutClick} >Sign Out<AiOutlineLogout className='h-4 w-4 ' /></p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        }


                    </div>
                )
            }
            <div >
                <SignInModal isOpen={isModalOpen} closeModal={closeModal} />
            </div>



        </nav>
    );
}

export default Navbar;
