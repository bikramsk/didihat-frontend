import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const { name, image, slug } = category;

  return (
    <Link 
      to={`/tour-packages/category/${slug}`}
      className="block group relative overflow-hidden rounded-xl aspect-[4/3]"
    >
     
      <div className="absolute inset-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
       
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
      </div>

    
      <div className="relative h-full p-6 flex flex-col justify-end">
        <h3 className="text-xl font-semibold text-white group-hover:translate-x-1 transition-transform">
          {name}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard; 