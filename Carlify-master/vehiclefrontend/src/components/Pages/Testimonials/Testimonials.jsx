import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Happy Customer',
      content: 'I found my dream car at AutoMarket! The process was so easy and the staff was incredibly helpful. I would definitely recommend them to anyone looking for a quality used car.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Satisfied Buyer',
      content: 'The best car buying experience I\'ve ever had. No pressure sales, transparent pricing, and a great selection of vehicles. I\'ll be back for my next car!',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 3,
      name: 'Emily Chen',
      role: 'Repeat Customer',
      content: 'This was my second purchase from AutoMarket and just like the first time, everything went smoothly. Their quality inspection gave me peace of mind about my purchase.',
      image: 'https://randomuser.me/api/portraits/women/68.jpg'
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Our <span className="inline bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">Customers Say</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Don't just take our word for it
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;