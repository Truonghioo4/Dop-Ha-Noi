import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const HomePage = () => {
  const [featuredTours, setFeaturedTours] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch tours
        const toursResponse = await fetch("/api/tour/get-tours");
        const toursData = await toursResponse.json();
        setFeaturedTours(toursData.tours.slice(0, 4)); // Get first 4 tours

        // Fetch blogs
        const blogsResponse = await fetch("/api/blog/get-blogs");
        const blogsData = await blogsResponse.json();
        setBlogs(blogsData.blogs.slice(0, 6)); // Get first 6 blogs
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Featured Tours Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tours nổi bật nhất</h2>
          <Link 
            to="/tour" 
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span className="mr-2 text-orange-500">Xem thêm</span>
            <FaArrowRight className="text-sm text-orange-500" />
          </Link>
        </div>
        <div className="grid grid-cols-12 gap-4">
          {/* Large Featured Tour */}
          {featuredTours[0] && (
            <Link 
              to={`/tour/${featuredTours[0].slug}`}
              className="col-span-6 relative h-[400px] rounded-lg overflow-hidden group"
            >
              <img
                src={featuredTours[0].image[0]}
                alt={featuredTours[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex items-end p-6">
                <h3 className="text-white text-xl font-semibold">
                  {featuredTours[0].title}
                </h3>
              </div>
            </Link>
          )}

          {/* Grid of Smaller Tours */}
          <div className="col-span-6 grid grid-cols-2 gap-4">
            {featuredTours.slice(1, 5).map((tour) => (
              <Link
                key={tour._id}
                to={`/tour/${tour.slug}`}
                className="relative h-[190px] rounded-lg overflow-hidden group"
              >
                <img
                  src={tour.image[0]}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex items-end p-4">
                  <h3 className="text-white font-medium text-sm">
                    {tour.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Blog</h2>
          <Link 
            to="/blog" 
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span className="mr-2 text-orange-500">Xem thêm</span>
            <FaArrowRight className="text-sm text-orange-500" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/blog/${blog.slug}`}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all hover:-translate-y-1 duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {blog.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tours gần đây Section */}
      <section className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tours gần đây</h2>
          <Link 
            to="/tour" 
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span className="mr-2 text-orange-500">Xem thêm</span>
            <FaArrowRight className="text-sm text-orange-500" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTours.slice(0, 3).map((tour) => (
            <Link
              key={tour._id}
              to={`/tour/${tour.slug}`}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={tour.image[0]}
                  alt={tour.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{tour.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-orange-500 font-bold">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(tour.price)}
                    /Khách
                  </span>
                  <span className="text-gray-600 text-sm">{tour.duration}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;