import React from 'react'
import ReactStarsRating from 'react-awesome-stars-rating';

const HotelCard = ({ place }) => {
    return (
        <div className='cursor-pointer  '>
            <img src={place.hotelImage} className="w-full h-[250px] object-cover " />
            <h2 className="font-semibold text-lg mb-1 w-full">
                {place.hotelName}
            </h2>
            <span className="flex items-center justify-start mb-2">
                <ReactStarsRating
                    value={place.rating}
                    className="flex mr-2 "
                    size={20}
                    isEdit={false}
                    primaryColor="#00afef"
                    secondaryColor="#e5e7eb"
                />
                ~ {place.noOfreviews} Reviews
            </span>
        </div>
    )
}

export default HotelCard