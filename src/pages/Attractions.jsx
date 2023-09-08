import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Navbar from '../components/Navbar';
import ReactStarsRating from 'react-awesome-stars-rating';
import AttractionsLoader from '../components/Loaders/AttractionsLoader'
import Footer from '../components/Footer';
const Attractions = () => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            axios.get("http://localhost:8081/showPlaceDetails")
                .then((response) => {
                    setData(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("An error occurred while fetching data:", error);
                    setLoading(false);
                });
        }, 1000);
        return () => clearTimeout(timer);
    }, []);


    return (
        <>

        <Navbar border/>
            <div className='container mx-auto pb-4'>
                <div className='text-center my-10'>
                    <h1 className='font-semibold text-lg md:text-3xl'>
                        Attractions near you
                    </h1>
                </div>
                {isLoading ? (<AttractionsLoader />) : (
                    <>
                        <div className='block md:grid md:grid-cols-12 md:px-4 my-2 gap-3'>
                            {data?.map((attraction, i) => (
                                <div key={i} className='md:col-span-6 lg:col-span-4 mb-4'>
                                    <div className='w-full h-[250px] md:h-[350px] object-cover'>
                                        <img src={attraction.imgUrl} className='w-full h-full object-cover cursor-pointer' />
                                    </div>
                                    <div className='px-4 md:px-0 py-2 space-y-1'>
                                        <h2 className='font-semibold md:text-lg'>
                                            {attraction.placeName}
                                        </h2>
                                        <p className='flex items-center text-xs'>
                                            <span className='items-center mr-1'>
                                                <ReactStarsRating
                                                  value={attraction.rating}
                                                  size={18}
                                                  className="flex mr-2"
                                                  isEdit={false}
                                                  primaryColor="#00afef"
                                                  secondaryColor="#e5e7eb"
                                                />
                                            </span>
                                            {attraction.noOfReviews} Reviews
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    )
}

export default Attractions