import Image from 'next/image';
import React from 'react'
import LandingHeader from './components/LandingHeader';

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingHeader />
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block text-red-400 xl:inline">A smart system for academic </span>
              <span className="block text-blue-950 md:inline">collaboration and monitoring</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
              A centralized platform designed to facilitate seamless collaboration between students and lecturers in managing academic information, schedules, and daily educational activities efficiently and effectively.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start space-x-4">
              <button className="bg-red-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-500 transition-colors">
                Get Started
              </button>
              <a
                href="#landing-feature"
                className="inline-block bg-blue-950 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-900 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="mt-10 lg:mt-0 flex justify-center">
            <img src="/image/landing-image.png" alt="School Management System" className="w-full max-w-md lg:max-w-lg" />
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div id='landing-feature' className="py-12 bg-[#B6E2D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Main Features
            </h2>
            <p className="mt-3 text-xl text-gray-500 sm:m-8">
              A school management system that makes it easy for you to manage various aspects of your education.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Administrative Management */}
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-transform duration-300">
              <div className="w-32 h-32 mx-auto mb-4">
                <Image src="/image/landing-student.png" alt="Administrative Management" width={128} height={128} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 text-center">Administrative Management</h3>
              <p className="mt-2 text-gray-500 text-center">Manage school administration easily and efficiently through an integrated system.</p>
            </div>

            {/* Academic Information */}
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-transform duration-300">
              <div className="w-32 h-32 mx-auto mb-4">
                <Image src="/image/landing-academic.png" alt="Academic Information" width={128} height={128} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 text-center">Academic Information</h3>
              <p className="mt-2 text-gray-500 text-center">Access academic information in real-time to monitor learning progress.</p>
            </div>

            {/* Activity Digitalization */}
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-transform duration-300">
              <div className="w-32 h-32 mx-auto mb-4">
                <Image src="/image/landing-digitalization.png" alt="Activity Digitalization" width={128} height={128} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 text-center">Activity Digitalization</h3>
              <p className="mt-2 text-gray-500 text-center">Digitalize school activities for better efficiency and transparency.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 p-12 sm:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Trusted by Educational Institutions
            </h2>
          </div>
          <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
            <div className="flex flex-col">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                Schools
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-red-400">
                100+
              </dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                Active Users
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-blue-950">
                10k+
              </dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                Satisfaction
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-red-400">
                100%
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
