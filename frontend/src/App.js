import { Route, Routes } from 'react-router';
import './App.css';
import Navbar from './components/Navbar.jsx';
import AddChannel from './pages/AddChannel.jsx';
import Game from './pages/Game.jsx';
import Homepage from './pages/Homepage.jsx';
import './styles/main.css';

function App() {
	return (
		<div className='App'>
			<Navbar />
			<Routes>
				<Route path='/' element={<Homepage />} ></Route>
				<Route path='/add-channel' element={<AddChannel />} ></Route>
				<Route path='/play' element={<Game />} ></Route>
			</Routes>
		</div >
	);
}

export default App;
