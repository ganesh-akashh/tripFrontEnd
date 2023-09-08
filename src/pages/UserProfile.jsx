import React from 'react';
import Navbar from '../components/Navbar';
import userIcon from '../assets/img/userIcon.png';
import { AiFillDelete } from 'react-icons/ai'; // Import the Delete icon
import state from '../store';
import Footer from '../components/Footer';
import HomeLoader from '../components/Loaders/HomeLoader';
import { deleteUser } from '../utilities';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {

    const navigate = useNavigate();
    const handleDeleteClick = (e) => {
        deleteUser();
        navigate("/");
    }
    return (
        <div>
            <Navbar sticky/>
            <div className='relative pb-2 mt-2\\ h-full justify-center items-center'>
                <div className='flex flex-col pb-5'>
                    <div className='relative flex flex-col mb-7'>
                        <div className='flex flex-col justify-center items-center'>
                            <img
                                src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                                className='w-full h-64 2xl:h-96 shadow-lg object-cover'
                                alt="banner"
                            />
                            <img
                                className='rounded-full  sm:w-36 w-28 sm:h-36 h-28 -mt-20 shadow-xl object-cover bg-dark '
                                src={userIcon}
                                alt="user-profile"
                            />
                            <h1 className='font-bold sm:text-3xl text-2xl text-center mt-3'>{state.userName}</h1>
                            <div className='absolute top-3 z-1 right-3 p-2 flex items-center w-44  justify-around cursor-pointer h-10 rounded-full bg-red-600' onClick={handleDeleteClick}>
                                <h3>Delete Account</h3>
                                <div style={{ fontSize: '20px' }}>
                                    <AiFillDelete
                                        className="cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container mx-auto'>
                        <h1 className='font-semibold  text-2xl mb-4'>Your Trips:</h1>
                        {/* <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                        </div> */}
                    </div>
                    <HomeLoader />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UserProfile;
