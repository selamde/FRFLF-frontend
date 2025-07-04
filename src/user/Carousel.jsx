import React from 'react';
import Slider from 'react-slick';

const teamMembers = [
  {
    name: 'Selamsew Dagne',
    role: 'Frontend Developer and backend developer',
    image: '/u3.jpg',
  },
  {
    name: 'Leul Mesfin',
    role: 'UI/UX and python developer',
    image: '/u2.jpg',
  },
  {
    name: 'Dagim Girma ',
    role: 'UI/UX  Designer and forntend developer',
    image: '/u4.jpg',
  },
  {
    name: 'Natnael Aklilu ',
    role: 'UI/UX Designer',
    image: '/u1.JPG',
  },
   {
    name: 'Abinet Girma ',
    role: 'UI/UX Designer',
    image: '/u5.jpg',
  },
  
];

const TeamCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    pauseOnHover: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Meet our Development Team</h2>
      <Slider {...settings}>
        {teamMembers.map((member, index) => (
          <div key={index} className="p-4">
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TeamCarousel;
