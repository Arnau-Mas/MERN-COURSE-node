import React from 'react';
import { Filtres } from './components/Filtres.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
	return (
		<div>
			<Navbar/>
			<Filtres/>
			<h1 className="font-bold text-2xl text-red-900">
        React and Tailwind with Vitejs!
      </h1>
		</div>
/* 		<div className="flex justify-center items-center w-screen h-screen ">
			<div className='w-3/12 p-6 mx-auto rounded text-center bg-gray-800 space-y-5'>
				<h1 className='text-white text-4xl'>
					Vite + React + Tailwind
				</h1>
				<p className='text-blue-300 text-2xl'>It's working</p>
			</div>
		</div> */
	);
}

export default App;
