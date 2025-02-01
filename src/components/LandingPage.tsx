import React, { useState } from 'react';
import { Utensils, MapPin, Users, Star, Search, Clock, Camera, MessageCircle, Heart, Mountain, Sunrise, Cloud, Coffee, Music, Compass, Wind } from 'lucide-react';
import { LoginForm } from './auth/LoginForm';
import { SignUpForm } from './auth/SignUpForm';
import { ForgotPasswordForm } from './auth/ForgotPasswordForm';

export const LandingPage: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'login' | 'signup' | 'forgot'>('login');
  const [activeTime, setActiveTime] = useState<'sunrise' | 'day' | 'sunset'>('day');

  // Dynamic time-based gradients
  const timeGradients = {
    sunrise: 'from-rose-500/90 via-purple-500/80 to-indigo-500/70',
    day: 'from-blue-500/90 via-indigo-500/80 to-purple-500/70',
    sunset: 'from-orange-500/90 via-red-500/80 to-purple-500/70'
  };

  return (
    <div className="min-h-screen bg-[#0B1121]">
      {/* Hero Section with Dynamic Sky Effect */}
      <div className="relative overflow-hidden min-h-screen">
        {/* Parallax Mountains */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-110"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1605640840605-14ac1855827b")',
            filter: 'brightness(0.4)'
          }}
        />
        
        {/* Animated Clouds */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-0 animate-float opacity-30">
            <Cloud className="w-24 h-24 text-white" />
          </div>
          <div className="absolute top-1/3 right-1/4 animate-float-slow opacity-20">
            <Cloud className="w-32 h-32 text-white" />
          </div>
        </div>

        {/* Time of Day Controls */}
        <div className="absolute top-4 right-4 flex gap-4 z-10">
          {[
            { time: 'sunrise', icon: Sunrise, label: 'Sunrise View' },
            { time: 'day', icon: Mountain, label: 'Day View' },
            { time: 'sunset', icon: Wind, label: 'Evening View' }
          ].map(({ time, icon: Icon, label }) => (
            <button
              key={time}
              onClick={() => setActiveTime(time as typeof activeTime)}
              className={`p-2 rounded-full transition-all duration-300 ${
                activeTime === time 
                  ? 'bg-white/20 text-white scale-110' 
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
              title={label}
            >
              <Icon className="w-6 h-6" />
            </button>
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-b ${timeGradients[activeTime]} backdrop-blur-sm`} />

        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Info */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg group hover:shadow-purple-500/50 transition-all duration-500">
                  <Mountain className="h-10 w-10 text-white transform group-hover:scale-110 transition-transform" />
                </div>
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  SE-Trails Pokhara
                </h1>
              </div>
              
              <h2 className="text-5xl font-bold text-white leading-tight">
                Experience the Magic of
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
                  Himalayan Flavors
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Journey through taste and tradition in the shadow of the Annapurnas
              </p>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Compass,
                    title: "Cultural Trails",
                    description: "Follow ancient food paths",
                    gradient: "from-blue-500 to-indigo-500"
                  },
                  {
                    icon: Coffee,
                    title: "Local Tastes",
                    description: "Authentic family recipes",
                    gradient: "from-purple-500 to-pink-500"
                  },
                  {
                    icon: Music,
                    title: "Folk Evenings",
                    description: "Dine with local music",
                    gradient: "from-pink-500 to-red-500"
                  }
                ].map((feature, index) => (
                  <div key={index} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500" />
                    <div className="relative bg-white/10 backdrop-blur-xl p-6 rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 hover:-translate-y-1">
                      <div className={`mb-4 p-3 bg-gradient-to-r ${feature.gradient} rounded-lg w-fit`}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2 text-white">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Auth Forms */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25" />
              <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20">
                {activeForm === 'login' && (
                  <LoginForm 
                    onSignUpClick={() => setActiveForm('signup')}
                    onForgotClick={() => setActiveForm('forgot')}
                  />
                )}
                {activeForm === 'signup' && (
                  <SignUpForm onSwitch={() => setActiveForm('login')} />
                )}
                {activeForm === 'forgot' && (
                  <ForgotPasswordForm onSwitch={() => setActiveForm('login')} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Experience Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1121] via-purple-900/20 to-[#0B1121]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Immersive Dining Experience</h2>
            <p className="text-gray-400">More than just food - it's a journey for all senses</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Mountain,
                title: "Peak Views",
                description: "Dine with panoramic Himalayan vistas",
                gradient: "from-blue-500 to-indigo-500"
              },
              {
                icon: Music,
                title: "Cultural Shows",
                description: "Live traditional performances",
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                icon: Camera,
                title: "Photo Spots",
                description: "Instagram-worthy locations",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Heart,
                title: "Local Stories",
                description: "Connect with tradition",
                gradient: "from-pink-500 to-red-500"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative bg-black/40 backdrop-blur-xl p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2">
                  <div className={`mb-4 p-3 bg-gradient-to-r ${feature.gradient} rounded-lg w-fit`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Signature Dishes Showcase */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1121] via-purple-900/10 to-[#0B1121]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Signature Dishes</h2>
            <p className="text-gray-400">Crafted with passion, served with pride</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Royal Thakali Feast",
                image: "https://images.unsplash.com/photo-1625398407796-82650a8c9285",
                description: "Complete traditional set with mountain herbs",
                price: "Rs. 850"
              },
              {
                name: "Himalayan Momo Platter",
                image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb",
                description: "Assorted momos with special achar",
                price: "Rs. 450"
              },
              {
                name: "Annapurna Special",
                image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
                description: "Fusion of traditional and modern tastes",
                price: "Rs. 750"
              }
            ].map((dish, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{dish.name}</h3>
                    <p className="text-gray-300 mb-2">{dish.description}</p>
                    <p className="text-lg font-semibold text-purple-300">{dish.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1121] to-purple-900/20"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-4xl font-bold text-white mb-6">Begin Your Culinary Adventure</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join our community of food explorers and embark on a journey through the flavors of Nepal
          </p>
          <button
            onClick={() => setActiveForm('signup')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
          >
            Start Your Journey
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};