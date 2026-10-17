import React from "react";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import { Award, Shield, Users, Car } from "lucide-react";

function AboutUs() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" >
        {/* Hero Section */}
        <div className="text-center mb-16"  data-aos="fade-up" data-aos-delay="50">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About <span className="inline bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
            Carlify
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in finding the perfect vehicle. We're committed
            to providing exceptional service and premium cars to our valued
            customers.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-xl shadow-md" data-aos="fade-up" data-aos-delay="100">
            <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-600">
              Only the finest vehicles make it to our showroom
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md" data-aos="fade-up" data-aos-delay="200">
            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Trusted Service</h3>
            <p className="text-gray-600">
              15+ years of trusted service in the industry
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md" data-aos="fade-up" data-aos-delay="300">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
            <p className="text-gray-600">
              Professional staff with deep automotive knowledge
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md" data-aos="fade-up" data-aos-delay="400">
            <Car className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
            <p className="text-gray-600">
              Extensive range of vehicles to choose from 
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16"  data-aos="fade-up" data-aos-offset="200">
          <div>
            <img
              src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80"
              alt="Modern Car Showroom"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Our <span className="inline bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
            Story
            </span></h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded in 2008, Carlify has grown from a small local
                dealership to one of the most trusted names in the automotive
                industry. Our journey began with a simple mission: to make car
                buying a transparent and enjoyable experience.
              </p>
              <p>
                Today, we serve thousands of customers annually, maintaining our
                commitment to quality and customer satisfaction. Our showroom
                features a carefully curated selection of premium vehicles, each
                meeting our rigorous standards.
              </p>
              <p>
                We believe in building lasting relationships with our customers,
                going beyond the initial sale to provide ongoing support and
                service. This dedication to excellence has earned us numerous
                industry awards and, more importantly, the trust of our
                community.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-12" data-aos="fade-up">Our <span className="inline bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
          Team
            </span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md" data-aos="fade-up" data-aos-delay="100">
              <img
                src="https://res.cloudinary.com/rohitmalviya2324/image/upload/v1737461741/ProfileImageRohit_klxlzw.png"
                alt="CEO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">Rohit Malviya</h3>
              <p className="text-blue-600 mb-2">CEO & Founder</p>
              <p className="text-gray-600">
                Full Stack Developer 
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md" data-aos="fade-up" data-aos-delay="200">
              <img
                src="https://res.cloudinary.com/rohitmalviya2324/image/upload/v1737461741/ProfileImageRohit_klxlzw.png"
                alt="COO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">Mohit Mehar</h3>
              <p className="text-blue-600 mb-2">Frontend Developer</p>
              <p className="text-gray-600">
                Expert in automotive operations and strategy
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md" data-aos="fade-up" data-aos-delay="300">
              <img
                src="https://res.cloudinary.com/rohitmalviya2324/image/upload/v1737461741/ProfileImageRohit_klxlzw.png"
                alt="CTO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">Michael Chen</h3>
              <p className="text-blue-600 mb-2">Chief Technology Officer</p>
              <p className="text-gray-600">
                Leading our digital transformation initiatives
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
