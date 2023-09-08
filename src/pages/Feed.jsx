import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from "../components/Navbar"
import AttractionsLoader from '../components/Loaders/AttractionsLoader'
import axios from 'axios'
import Footer from '../components/Footer'
import map from "../assets/img/map.png"
import ReactStarsRating from 'react-awesome-stars-rating';
import Pagination from "react-js-pagination";
import "bootstrap/dist/css/bootstrap.css";



const Feed = () => {
  const { place } = useParams();

  const [hotelData, setHotelData] = useState([]);
  const [attractionsData, setAttractionsData] = useState([]);
  const [restaurantData, setRestaruantData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const currentPage = activePage - 1;

  const [isLoading, setLoading] = useState(true);
  console.log(attractionsData);


  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {

      axios.get(`http://localhost:8081/hotelPaging/${currentPage}/3`).then((response) => {
        setHotelData(response.data);
        setLoading(false);
      }).catch((error) => {
        console.error(error);
        setLoading(false);
      })

      axios.get(`http://localhost:8081/placesPaging/${currentPage}/4`).then((response) => {
        setAttractionsData(response.data);
        setLoading(false);
      }).catch((error) => {
        console.error(error);
        setLoading(false);
      })



    }, 1000);
    return () => clearTimeout(timer);
  }, [activePage])

  const handlePageChange = (pageNumber) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    setActivePage(pageNumber);
  };

  return (
    <div>
      <Navbar border />
      <div className='container mx-auto pb-4'>
        <div className='my-10'>
          <h1 className='font-semibold text-lg md:text-2xl'>
            Top result matching  "{place}"
          </h1>
        </div>
        {isLoading ? <AttractionsLoader /> :

          <div className="px-4 lg:grid lg:grid-cols-12 lg:gap-3">

            <div className='lg:col-span-9'>
              {hotelData.length === 0 && restaurantData.length === 0 ? (
                <div className="text-center mt-4">
                  <h1 className="text-2xl font-semibold text-red-600">No results found !!</h1>
                </div>

              ) :
                (
                  <>
                    {
                      hotelData.map((hotel, index) => (
                        <div key={index} className="grid grid-cols-12 my-2 border border-gray-200 rounded shadow cursor-pointer">
                          <div className='col-span-12 md:col-span-4 h-[150px]'>
                            <img src={hotel.hotelImage} alt={hotel.hotelName} className='w-full h-full object-cover' />
                          </div>
                          <div className="col-span-12 md:col-span-8 px-2 md:px-4 py-2">
                            <h2 className="font-semibold text-lg md:text-xl">{hotel.hotelName}</h2>
                            <p className="flex items-center my-1">
                              <span className="flex items-center mr-1">
                                <ReactStarsRating
                                  value={hotel.rating}
                                  className="flex mr-2"
                                  size={20}
                                  isEdit={false}
                                  primaryColor="#00afef"
                                  secondaryColor="#e5e7eb"
                                />
                              </span>
                              <span className="text-sm mr-3">
                                {hotel.noOfreviews} Reviews
                              </span>
                            </p>
                            <div>
                              <div className="h-[1px] bg-gray-300 my-3" />
                              <p className="flex items-center text-sm font-medium">
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                  <path d="M2 11h5l-3 5h4l3-5V2H2zM13 2v9h5l-3 5h4l3-5V2z"></path>
                                </svg>
                                {hotel.review[0].reviewName}
                              </p>
                            </div>
                          </div>
                        </div>

                      ))}
                    {
                      attractionsData.map((attractions, index) => (
                        <div key={index} className='grid grid-cols-12 my-2 border border-gray-200 rounded shadow  cursor-pointer'>
                          <div className='col-span-12 md:col-span-4 h-[150px]'>
                            <img src={attractions.imgUrl} alt={attractions.imgUrl} className='w-full h-full object-cover' />
                          </div>
                          <div className="col-span-12 md:col-span-8 px-2 md:px-4 py-2">
                            <h2 className="font-semibold text-lg md:text-xl">{attractions.placeName}</h2>
                            <p className="flex items-center my-1">
                              <span className="flex items-center mr-1">
                                <ReactStarsRating
                                  value={attractions.rating}
                                  className="flex mr-2"
                                  size={20}
                                  isEdit={false}
                                  primaryColor="#00afef"
                                  secondaryColor="#e5e7eb"
                                />
                              </span>
                              <span className="text-sm mr-3">
                                {attractions.noOfReviews} Reviews
                              </span>
                            </p>
                            <div>
                              <div className="h-[1px] bg-gray-300 my-3" />
                              <p className="flex items-center text-sm font-medium">
                                from ₹ {attractions.pricing} per adult
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </>
                )}

            </div>

            <div className='lg:col-span-3'>
              <div className='w-full border shadow mt-2 p-2'>
                <div className='relative'>
                  <img src={map} className='objec-cover w-full h-20 lg:h-full' />
                  <div className='absolute w-full h-full top-0 flex items-center justify-center'>
                    <button className="bg-white rounded-sm border border-black py-2 px-4 hover:bg-black hover:text-white"
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

          </div>
        }
        <div className="flex flex-col items-center justify-center p-4 font">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={10}
            totalItemsCount={30}
            pageRangeDisplayed={3}
            onChange={handlePageChange}
            itemClass="inline-block mx-2"
            activeClass="bg-blue-700 text-white rounded-full w-9 flex justify-center border border-blue-800"
            itemClassPrev="font-medium"
            itemClassNext="font-medium"
            prevPageText="Previous"
            nextPageText="Next"
          />
          <p className="text-gray-500 mt-2 font">
            Page {activePage} of 3
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Feed





