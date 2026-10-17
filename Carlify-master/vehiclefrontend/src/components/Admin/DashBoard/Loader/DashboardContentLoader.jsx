import React from 'react'

function DashboardContentLoader() {
  return (
    <>
      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array(4).fill(0).map((_, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-gray-200 rounded-lg" />
              <div className="h-6 w-16 bg-gray-200 rounded-full" />
            </div>
            <div className="h-8 w-24 bg-gray-200 mb-1" />
            <div className="h-5 w-32 bg-gray-200" />
          </div>
        ))}
      </div>

      {/* Recent Activity Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Listings Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 animate-pulse">
          <div className="p-6 border-b border-gray-200">
            <div className="h-6 w-40 bg-gray-200" />
          </div>
          <div className="p-6 space-y-4">
            {Array(3).fill(0).map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-gray-200 rounded-lg" />
                  <div>
                    <div className="h-5 w-32 bg-gray-200" />
                    <div className="h-4 w-24 bg-gray-200 mt-1" />
                  </div>
                </div>
                <div className="text-right">
                  <div className="h-5 w-16 bg-gray-200" />
                  <div className="h-5 w-12 bg-gray-200 mt-1 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 animate-pulse">
          <div className="p-6 border-b border-gray-200">
            <div className="h-6 w-40 bg-gray-200" />
          </div>
          <div className="p-6 space-y-4">
            {Array(3).fill(0).map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-gray-200 rounded-lg" />
                  <div>
                    <div className="h-5 w-32 bg-gray-200" />
                    <div className="h-4 w-24 bg-gray-200 mt-1" />
                  </div>
                </div>
                <div className="text-right">
                  <div className="h-5 w-24 bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardContentLoader
