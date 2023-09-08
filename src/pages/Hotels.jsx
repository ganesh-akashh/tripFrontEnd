import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AttractionsLoader from "../components/Loaders/AttractionsLoader"
import map from "../assets/img/map.png"
import axios from "axios";
import ReactStarsRating from 'react-awesome-stars-rating';

const HotelsList = () => {

    const [guestsToggle, setGuestsToggle] = useState(false);

    const [isLoading, setLoading] = useState(true);

    const [data, setData] = useState([]);

    const [isClicked, handleClicked] = useState(false);


    const [guestData, setGuestData] = useState({
        noOfRooms: 1,
        noOfAdults: 1,
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        const intValue = parseInt(value, 10);
        if (!isNaN(intValue) && intValue >= 0) {
            setGuestData({ ...guestData, [name]: intValue });
        }
    };

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            axios.get("http://localhost:8081/showHotelDetails")
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
    }, [isClicked]);


    return (
        <>
            <Navbar border />
            <div className="pb-4">

                <div className="container mx-auto text-center my-10">
                    <h1 className="font-semibold text-lg md:text-3xl">
                        Hotels and Places to stay
                    </h1>
                </div>

                <div className="">
                    <div className="container mx-auto grid grid-cols-1 gap-5 md:grid-cols-3 px-4 py-5">
                        <div className="w-full relative">
                            <span className="absolute text-xs bg-white font-semibold px-2 -top-2 left-2">
                                Check In
                            </span>
                            <input
                                type="date"
                                onChange={() => handleClicked(!isClicked)}
                                className="w-full rounded border shadow px-4 py-2 border-l-8 border-l-green-600 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                            />
                        </div>

                        <div className="w-full relative">
                            <span className="absolute text-xs bg-white font-semibold px-2 -top-2 left-2">
                                Check Out
                            </span>
                            <input
                                type="date"
                                onChange={() => handleClicked(!isClicked)}
                                className="w-full rounded border shadow px-4 py-2 border-l-8 border-l-red-600 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
                            />
                        </div>

                        <div className="w-full relative">
                            <span className="absolute text-xs bg-white font-semibold px-2 -top-2 left-2">
                                Guests
                            </span>
                            <input
                                type="text"
                                value={`${guestData.noOfRooms} room,${guestData.noOfAdults} adults `}
                                className="w-full rounded border shadow px-4 py-2 border-l-8 border-l-gray-500 focus:text-gray-700 focus:bg-white focus:border-gray-500 focus:outline-none"
                                onClick={() => setGuestsToggle(!guestsToggle)}
                            />
                            <span className="absolute top-3 right-4 cursor-pointer" onClick={() => setGuestsToggle(!guestsToggle)}>
                                <svg

                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            </span>
                            {guestsToggle && (
                                <div className="absolute z-20 w-full left-0 top-12" >
                                    <div className="h-4 w-4 bg-white shadow transform rotate-45 mx-auto -mb-2 border border-gray-200" />
                                    <div className="bg-white shadow-md w-full p-4 space-y-2 relative" >
                                        <p
                                            className="flex justify-end pb-2 relative"
                                            onClick={() => setGuestsToggle(false)}
                                        >
                                            <svg
                                                className="h-4 w-4 block cursor-pointer"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <p>Rooms</p>
                                            <input
                                                type="number"
                                                value={guestData.noOfRooms}
                                                onChange={handleChange}
                                                onClick={() => handleClicked(!isClicked)}
                                                name="noOfRooms"
                                                className="w-14 rounded border p-1 text-center focus:text-gray-700 focus:bg-white focus:outline-none"
                                            />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p>Adults</p>
                                            <input
                                                type="number"
                                                value={guestData.noOfAdults}
                                                onClick={() => handleClicked(!isClicked)}
                                                onChange={handleChange}
                                                name="noOfAdults"
                                                className="w-14 rounded border p-1 text-center focus:text-gray-700 focus:bg-white focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {isLoading ? <AttractionsLoader /> :
                    <div className="container mx-auto pb-4 ">
                        <div>
                            <div className="px-4 lg:grid lg:grid-cols-12 lg:gap-2 flex flex-col-reverse">
                                <div className="lg:col-span-3">
                                    <div className="w-full border shadow mt-2 p-2">
                                        <div className="relative">
                                            <img src={map} alt="Map" className="w-full h-30 lg:h-full object-cover" />
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
                                                <img src={hotels.hotelImage} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="col-span-12 md:col-span-8 px-2 md:px-4 py-2">
                                                <h2 className="font-semibold text-lg md:text-xl">{hotels.hotelName}</h2>
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
                                                        {hotels.noOfreviews} Reviews
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

export default HotelsList;
