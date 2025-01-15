const CarCard = ({ car }) => {
  const { theme } = useTheme();

  return (
    <div className={`p-4 mb-4 rounded w-full transform transition-all duration-300
      hover:scale-105 cursor-pointer
      ${theme === 'dark' 
        ? 'bg-gray-800 text-white shadow-lg hover:shadow-2xl hover:shadow-blue-500/20' 
        : 'bg-white text-gray-900 shadow-lg hover:shadow-2xl hover:shadow-gray-400/50'}`}>
      <img
        src={car.image}
        alt={`${car.make} ${car.model}`}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{car.make} {car.model}</h3>
      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
        Year: {car.year}
      </p>
      <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
        <p>Rental price per day: ${car.rental_price_per_day}</p>
      </div>
    </div>
  );
}; 