import './App.css';
import CGPACalculator from './appComponents/cgpaCalc';
import DotPattern from './components/ui/dot-pattern';

function App() {
	return (
		<div className="relative overflow-auto p-4">
			<CGPACalculator />
			<DotPattern className="fixed inset-0 -z-10" />
		</div>
	);
}

export default App;
