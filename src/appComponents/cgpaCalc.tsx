import { marksData } from '@/data/marksData/marksData';
import { subjectsData } from '@/data/subjectData/subjectData';
import { Branch } from '@/types';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormEvent, useEffect, useState } from 'react';
import eqn from '/eqn.svg';
import book from '/book.png';
import confetti from 'canvas-confetti';
import { Delete } from '@mui/icons-material';

export default function CGPACalculator() {
	// State variables
	const [branch, setBranch] = useState<Branch>(Branch.CSE_IT);
	const [cgpa, setCGPA] = useState<number | null>(null);

	const initialData = subjectsData[branch].map((subject) => ({
		subjectName: subject.subjectName,
		paperCode: subject.paperId,
		subjectCode: subject.subjectCode,
		credits: subject.credits,
		marks: 0, // Default marks initialized to 0
	}));
	const [data, setData] = useState(initialData);

	useEffect(() => {
		if (cgpa) {
			launchConfetti();
		}
	}, [cgpa]);

	const handleInputChange = (index: number, field: string, value: number): void => {
		const newData = [...data];
		newData[index] = { ...newData[index], [field]: value };
		setData(newData);
	};
	const handleBranchChange = (e: FormEvent<HTMLSelectElement>) => {
		const selectedBranch = e.currentTarget.value as Branch;
		console.log('selectedBranch', selectedBranch);
		setBranch(selectedBranch);
		const newInitialData = subjectsData[selectedBranch].map((subject) => ({
			subjectName: subject.subjectName,
			paperCode: subject.paperId,
			subjectCode: subject.subjectCode,
			credits: subject.credits,
			marks: 0,
		}));
		setData(newInitialData);
	};

	const addNewRow = () => {
		setData([
			...data,
			{
				subjectName: 'Extra-Subject',
				paperCode: 'Random-paper-code',
				subjectCode: 'Random-subject-code',
				credits: 0,
				marks: 0,
			},
		]);
	};

	const deleteRow = () => {
		setData([...data.slice(0, data.length - 1)]);
	};

	const calculateCGPA = (e: FormEvent) => {
		e.preventDefault();
		let totalCredits = 0;
		let totalGradePoints = 0;

		data.forEach((row) => {
			const credits = row.credits;
			const marks = row.marks;
			totalCredits += credits;
			// Simple grade point calculation (adjust as needed)
			const gradePoint =
				marks >= 90
					? 10
					: marks >= 75
						? 9
						: marks >= 65
							? 8
							: marks >= 55
								? 7
								: marks >= 50
									? 6
									: marks >= 45
										? 5
										: 0;
			totalGradePoints += credits * gradePoint;
		});
		const calculatedCGPA = totalGradePoints / totalCredits;
		setCGPA(isNaN(calculatedCGPA) ? null : parseFloat(calculatedCGPA.toFixed(3)));
	};

	function launchConfetti() {
		confetti({
			// particleCount: 100,
			// spread: 70,
			// origin: { y: 0.6 },
			particleCount: 100,
			spread: 135,
			ticks: 400,
		});
	}

	return (
		<div className="container mx-auto flex flex-col gap-2 rounded-lg border bg-white p-4 shadow-all-sides">
			<h1 className="flex items-center gap-2 text-2xl font-bold text-[#041E54]">
				IPU CGPA Calculator <img src={book} height={32} width={32} />
			</h1>
			<div className="mb-2">* Only works for 5th sem CSE, IT and ECE</div>
			<div className="mb-4 flex items-center">
				<label htmlFor="branch" className="mr-2 text-lg font-medium text-gray-700">
					Select Branch:
				</label>
				<select
					id="branch"
					value={branch}
					onChange={handleBranchChange}
					className="rounded-md border border-gray-300 p-2 transition-all duration-200 ease-in-out hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value={Branch.CSE_IT}>CSE / IT</option>
					<option value={Branch.ECE}>ECE</option>
				</select>
			</div>
			<form onSubmit={calculateCGPA} className="mb-2">
				<div className="overflow-x-auto">
					<table className="w-full border-collapse border border-gray-300">
						<thead>
							<tr className="bg-gray-100">
								<th className="border border-gray-300 p-2">S.No</th>
								<th className="border border-gray-300 p-2">Subject Name</th>
								<th className="border border-gray-300 p-2">Paper Code</th>
								<th className="border border-gray-300 p-2">Subject Code</th>
								<th className="border border-gray-300 p-2">Credits</th>
								<th className="border border-gray-300 p-2">Marks</th>
							</tr>
						</thead>
						<tbody>
							{data.map((row, index) => (
								<tr key={index}>
									<td className="border border-gray-300 p-2">{index + 1}.</td>
									<td className="border border-gray-300 p-2">{row.subjectName}</td>
									<td className="border border-gray-300 p-2">{row.paperCode}</td>
									<td className="border border-gray-300 p-2">{row.subjectCode}</td>
									<td className="border border-gray-300 p-1">
										<input
											required
											type="number"
											value={row.credits}
											onChange={(e) =>
												handleInputChange(index, 'credits', parseInt(e.target.value))
											}
											min="1"
											max="5"
											className="hover: w-full rounded-md border-gray-400 p-1 hover:border-2" // todo: maybe add touch interactions here and in marks??
											placeholder="Enter credits"
										/>
									</td>
									<td className="border border-gray-300 p-2">
										<input
											required
											type="number"
											// value={row.marks}
											onChange={(e) =>
												handleInputChange(index, 'marks', parseInt(e.target.value))
											}
											min="0"
											max="100"
											className="w-full rounded-md border-2 border-gray-400 p-1"
											placeholder="Enter marks"
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="mt-4 flex items-center justify-between">
					<div className="flex gap-2">
						<button
							type="button"
							onClick={addNewRow}
							className="flex items-center rounded-lg border border-gray-300 bg-white p-3 text-gray-800 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow active:translate-y-0.5 active:bg-gray-200"
						>
							<AddIcon className="mr-2 h-4 w-4" />
							Add Row
						</button>
						<button
							type="button"
							onClick={deleteRow}
							className="flex items-center rounded-lg border border-gray-300 bg-white p-3 text-gray-800 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow active:translate-y-0.5 active:bg-gray-200"
						>
							<Delete className="mr-2 h-4 w-4" />
							Delete Row
						</button>
					</div>
					{/* <ConfettiButton
						options={{ particleCount: 100, spread: 135, ticks: 400 }}
						type="submit"
						className="rounded-lg border border-gray-300 bg-white py-2 text-black transition-all duration-200 ease-in-out hover:bg-gray-100 hover:shadow-lg active:translate-y-0.5 active:bg-gray-200"
					>
						Calculate CGPA
					</ConfettiButton> */}
					<button
						type="submit"
						className="rounded-lg border border-gray-300 bg-white p-2 transition-all duration-200 ease-in-out hover:bg-gray-100 hover:shadow-lg active:translate-y-0.5 active:bg-gray-200"
					>
						Calculate CGPA
					</button>
				</div>
			</form>
			{cgpa !== null && (
				// ... existing code ...
				<div className="mt-4">
					<p className="text-xl font-bold">Your CGPA: {cgpa}</p>
				</div>
				// ... existing code ...
			)}
			<div className="info-div mt-4 flex flex-col gap-4">
				<div>
					<h2 className="text-2xl font-bold text-[#0955A0]">How to calculate CGPA for IPUniversity?</h2>
					<div>The formula for calculation of CGPA is given below:</div>
					<div>
						<img src={eqn} alt="CGPA Formula" className="rounded-sm bg-gray-300 p-2" />
						Where <br /> C<sub>ni</sub> - number of credits of the ith course of the nth semester. <br />G
						<sub>ni</sub> - grade points of the ith course of the nth semester
					</div>
				</div>

				<div>
					<h2 className="text-2xl font-bold text-[#0955A0]">In easier words:</h2>
					<div>
						<ol className="ml-4 list-decimal">
							<li>We calculate the product of 'credits and grade point' for each subject and add them</li>
							<li>We then divide the result obtained above by the total number of credits</li>
							<li>Lastly, the final result is rounded off to 2 decimal places</li>
						</ol>
					</div>
				</div>
				<div>
					<h2 className="text-2xl font-bold text-[#0955A0]">Grading System</h2>
					<p>
						The marks that a student secures from the maximum 100 are to be converted into a grade as a
						letter. <br />
						The grade points are the numerical equivalent of the letter grade assigned to a student based on
						the total marks obtained by the student. <br />
						These grade points and letter grades are based on the points scale as given below:
					</p>
					<div className="my-2 flex justify-center">
						<table className="mx-auto w-3/5 border-collapse border-2 shadow-lg">
							<thead>
								<tr className="bg-gray-100">
									<th className="border-2 border-gray-700 p-2 text-center">Marks</th>
									<th className="border-2 border-gray-700 p-2 text-center">Grade</th>
									<th className="border-2 border-gray-700 p-2 text-center">Grade Point</th>
								</tr>
							</thead>
							<tbody>
								{marksData.map((row, index) => (
									<tr key={index}>
										<td className="border-2 border-gray-700 p-2 text-center">{row.marksRange}</td>
										<td className="border-2 border-gray-700 p-2 text-center">{row.grade}</td>
										<td className="border-2 border-gray-700 p-2 text-center">{row.gradePoint}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					{/* <p> */}
					<ul className="ml-3 list-disc">
						<li>
							Grade P, that is the grade point 4 is the course passing grade unless specified otherwise by
							the Syllabi and Scheme of Teaching and Examination for the respective programme.
						</li>
					</ul>
					<li>
						For grades below the passing grade (P) as defined in the Syllabi and Scheme of Teaching and
						Examination, the associated grade points are to be taken equal to zero.
					</li>
					<li>Both the acquired marks and grades are to be reflected on the term end marksheets.</li>
					{/* </p> */}
				</div>
				<div>
					<h2 className="text-2xl font-bold text-[#0955A0]">CGPA Divisions:</h2>
					<p>
						The successful candidates having an overall CGPA higher than or equal to the minimum CGPA that
						is specified in the Syllabi and Scheme of Teaching and Examination for the award of the degree,
						are to be awarded the degree and be placed in Divisions as below:
					</p>
					<ul className="ml-3 list-disc">
						<li>CGPA of 6.50 or above are to be placed in the First Division.</li>
						<li>CGPA of 5.00 - 6.49 are to be placed in the Second Division.</li>
						<li>CGPA of 4.00 - 4.99 are to be placed in the Third Division.</li>
						<li>
							CGPA of 10 are to be placed in the Exemplary Performance. Exemplary Performance shall be
							awarded, if and only if, every course of the programme offered to the student is passed in
							the first chance of appearing in the paper that is offered to the student. A student with an
							academic break shall not be awarded the exemplary performance.
						</li>
						<li>
							The CGPA x 10 shall be deemed equivalent to percentage of marks obtained by the student for
							the purpose of equivalence to percentage of marks.
						</li>
					</ul>
				</div>
				<p className="italic">
					Note: <br />
					This IPU CGPA Calculator works on the algorithm provided by IPUniversity in the ordinance 11.{' '}
				</p>
				<ul className="ml-3 list-disc italic">
					<li>
						<a
							href="http://ipu.ac.in/norms/Ordinance/oridancemain.htm"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 underline visited:text-purple-600"
						>
							University School of Education, GGSIPU (University Ordinance)
						</a>
					</li>
					<li>
						<a
							href="http://ipu.ac.in/norms/Ordinance/ordinanc11020815.pdf"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 underline visited:text-purple-600"
						>
							Ordinance 11
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
