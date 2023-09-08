import React, { useEffect } from 'react'
import axios from 'axios'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useState } from 'react'
import OwlCarousel from 'react-owl-carousel'
import PlaceCard from './PlaceCard';
import HomeLoader from './Loaders/HomeLoader';


const ToVisit = () => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const responsive = {
        0: {
            items: 1,
            margin: 15,
        },
        600: {
            items: 2,
            margin: 10,
        },
        768: {
            items: 3,
            margin: 10,
        },
        1000: {
            items: 4,
            margin: 10,
        }
    }
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
        <div className='container mx-auto p-4'>
            <h2 className='font font-semibold text-lg md:text-2xl'>
                Places to Visit
            </h2>
            <p className='text-sm text-dark mb-4'>
                These are some places you might want to visit
            </p>
            {isLoading ? <HomeLoader/> :

                <div className='relative  z-0'>
                        <OwlCarousel nav stagePadding={20}
                            navClass={["navStyle", "navStyle"]}
                            navContainerClass="navContainerStyle"
                            responsive={responsive}
                            slideBy={4}
                            navText={[
                                `<svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>`,
                                `<svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>`
                            ]}
                        >
                            {data.map((place, index) => (
                                <PlaceCard key={index} place={place} />
                            ))}
                        </OwlCarousel>
                </div>
            }
        </div>

    )
}

export default ToVisit