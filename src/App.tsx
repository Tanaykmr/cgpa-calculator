import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import CGPACalculator from './components/cgpaCalc';

function App() {
	const [count, setCount] = useState(0);

	return (
		<div>
			<CGPACalculator />
		</div>
	);
}

export default App;
