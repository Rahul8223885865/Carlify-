import React from "react";

function Loader() {
  return (
    <>
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 "
            data-aos="fade-up"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-3">
              {/* Skeleton Image */}
              <div className="relative w-full h-56 bg-gray-300 animate-pulse rounded-xl"></div>

              {/* Skeleton Content */}
              <div className="my-4">
                <div className="h-6 w-60 bg-gray-300 animate-pulse rounded mb-2"></div>
                {/* Skeleton Price */}
                <div className="h-6 w-25 bg-gray-300 animate-pulse rounded mb-2"></div>
                {/* Skeleton Specifications */}
                <div className="flex flex-wrap">
                  <div className=" flex flex-wrap gap-2 mb-2">
                    <div className="flex items-center gap-2 h-6 w-20 bg-gray-300 animate-pulse rounded">
                      <span className="text-gray-600"></span>
                    </div>
                    <div className="flex items-center gap-2 h-6 w-20 bg-gray-300 animate-pulse rounded">
                      <span className="text-gray-600"></span>
                    </div>
                    <div className="flex items-center gap-2 h-6 w-20 bg-gray-300 animate-pulse rounded">
                      <span className="text-gray-600"></span>
                    </div>
                    <div className="flex items-center gap-2 h-6 w-20 bg-gray-300 animate-pulse rounded">
                      <span className="text-gray-600"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default Loader;
