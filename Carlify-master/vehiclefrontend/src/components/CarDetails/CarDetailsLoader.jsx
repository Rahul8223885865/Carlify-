import React from "react";

function CarDetailsLoader() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image and Price */}
        <div className="space-y-6">
          <div className="bg-gray-200 animate-pulse rounded-xl w-full h-[400px]" />
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="h-8 bg-gray-200 animate-pulse w-2/3 rounded" />
              <div className="h-8 bg-gray-200 animate-pulse w-1/4 rounded" />
            </div>
            <div className="mt-2 flex items-center">
              <div className="h-4 w-4 bg-gray-200 animate-pulse rounded mr-2" />
              <div className="h-4 bg-gray-200 animate-pulse w-1/3 rounded" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="h-12 bg-gray-200 animate-pulse w-1/2 rounded" />
            <div className="h-12 bg-gray-200 animate-pulse w-1/2 rounded" />
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="h-6 bg-gray-200 animate-pulse w-1/3 rounded mb-4" />
            <div className="grid grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="h-5 w-5 bg-gray-200 animate-pulse rounded" />
                  <div className="h-5 bg-gray-200 animate-pulse w-1/2 rounded" />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="h-6 bg-gray-200 animate-pulse w-1/3 rounded mb-4" />
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="h-5 w-5 bg-gray-200 animate-pulse rounded" />
                  <div className="h-5 bg-gray-200 animate-pulse w-1/2 rounded" />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="h-6 bg-gray-200 animate-pulse w-1/3 rounded mb-4" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="h-5 w-5 bg-gray-200 animate-pulse rounded" />
                  <div className="h-5 bg-gray-200 animate-pulse w-1/2 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CarDetailsLoader;
