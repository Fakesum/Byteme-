// import React, { useEffect, useState } from 'react';
// import Cookies from 'js-cookie'; // Make sure you have js-cookie installed
// import { Check, X } from 'lucide-react';

// const DisplayFavorites = () => {
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     // Retrieve favorites from cookies
//     const favoritesFromCookies = Cookies.get('favorites') || [];
//     setFavorites(favoritesFromCookies);
//   }, []);

//   if (favorites.length === 0) {
//     return <div>No favorites found.</div>;
//   }

//   return (
//     <div className="relative w-full max-w-5xl mx-auto px-4 py-8 bg-white">
//       <h2 className="text-2xl font-semibold mb-4">My Favorites</h2>
//       <div className="flex flex-col space-y-4">
//         {favorites.map((offering, index) => (
//           <div key={index} className="border rounded-lg shadow-md p-4">
//             <h3 className="text-xl font-semibold mb-2">{offering.company}</h3>
//             <div className="mb-4">
//               {offering.pricies.map((value, index) => (
//                 <p className="font-bold text-2xl text-primary" key={`prices-${index}`}>{value}</p>
//               ))}
//             </div>
//             <div>
//               <div className="mb-2">
//                 <h4 className="font-semibold mb-1">Pros:</h4>
//                 <ul className="text-sm">
//                   {offering.pros.map((pro, i) => (
//                     <li key={i} className="flex items-center">
//                       <Check className="h-4 w-4 text-green-500 mr-1" />
//                       {pro}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div>
//                 <h4 className="font-semibold mb-1">Cons:</h4>
//                 <ul className="text-sm">
//                   {offering.cons.map((con, i) => (
//                     <li key={i} className="flex items-center">
//                       <X className="h-4 w-4 text-red-500 mr-1" />
//                       {con}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//             <a
//               href={`https://www.google.com/search?q=${offering.company}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="mt-4 block w-full text-center bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
//             >
//               Visit Site
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DisplayFavorites;