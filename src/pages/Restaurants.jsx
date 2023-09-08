import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AttractionsLoader from "../components/Loaders/AttractionsLoader"
import map from "../assets/img/map.png"
import axios from "axios";
import ReactStarsRating from 'react-awesome-stars-rating';

const Restaurants = () => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            axios.get("http://localhost:8081/showEatDetails")
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
            <Navbar border />
            <div className="pb-4 transition duration-75 ">

                <div className="container mx-auto text-center my-10">
                    <h1 className="font-semibold text-lg md:text-3xl">
                         Restaurants near you
                    </h1>
                </div>

                <div className="">
                </div>
                {isLoading ? <AttractionsLoader /> :
                    <div className="container mx-auto pb-4 ">
                        <div>
                            <div className="px-4 lg:grid lg:grid-cols-12 lg:gap-3 flex flex-col-reverse ">
                                <div className="lg:col-span-3">
                                    <div className="w-full border shadow mt-2 p-2">
                                        <div className="relative">
                                            <img src={map} alt="Map" className="w-full h-40 lg:h-full object-cover" />
                                            <div className="absolute w-full h-full top-0 flex items-center justify-center">
                                                <button className="bg-white rounded-sm border border-black py-2 px-4 hover:bg-black "
                                                >
                                                    <p className="font-semibold flex items-center text-sm">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                        </svg>
                                                        View On Map
                                                    </p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="lg:col-span-9">
                                    {data.map((hotels, index) => (
                                        <div key={index} className="grid grid-cols-12 my-2 border border-gray-200 rounded shadow hover:shadow-xl cursor-pointer">
                                            <div className="col-span-12 md:col-span-4 h-[180px]">
                                                <img src={hotels.resImage} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="col-span-12 md:col-span-8 px-2 md:px-4 py-2">
                                                <h2 className="font-semibold text-lg md:text-xl">{hotels.resName}</h2>
                                                <p className="flex items-center my-1">
                                                    <span className="flex items-center mr-1">
                                                        <ReactStarsRating
                                                            value={hotels.rating}
                                                            className="flex mr-2 "
                                                            size={20}
                                                            isEdit={false}
                                                            primaryColor="#00afef"
                                                            secondaryColor="#e5e7eb"
                                                        />
                                                    </span>
                                                    <span className="text-sm mr-3">
                                                        {hotels.noOfReviews} Reviews
                                                    </span>
                                                </p>
                                                <div>
                                                    <div className="h-[1px] bg-gray-300 my-3" />
                                                    <p className="flex items-center text-sm font-medium">
                                                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                                            <path d="M2 11h5l-3 5h4l3-5V2H2zM13 2v9h5l-3 5h4l3-5V2z"></path>
                                                        </svg>
                                                        {data[index].review[0].reviewName} {/* Display the first review for this hotel */}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                            </div>
                        </div>
                    </div>

                }

            </div>

            <Footer />
        </>
    );
};

export default Restaurants;
