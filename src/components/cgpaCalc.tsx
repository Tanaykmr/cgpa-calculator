'use client';
import { useState, FormEvent } from 'react';
import AddIcon from '@mui/icons-material/Add';

interface subjectInterface {
	subjectName: string;
	subjectCode: string;
	paperId: string;
	credits: number;
	// marks: number;  TODO: do we need this?
	// TODO: add lab type here to render theory and labs separately
}


const subjectsData: subjectInterface[] = [
	{
		subjectName: 'Economics for Engineers',
		subjectCode: 'HS-301',
		paperId: '031301',
		credits: 2,
	},
	{
		subjectName: 'Compiler Design',
		subjectCode: 'CIC-303',
		paperId: '031303',
		credits: 3,
	},
	{
		subjectName: 'Operating Systems',
		subjectCode: 'CIC-305',
		paperId: '031305',
		credits: 4,
	},
	{
		subjectName: 'Computer Networks',
		subjectCode: 'CIC-307',
		paperId: '031307',
		credits: 4,
	},
	{
		subjectName: 'Software Engineering',
		subjectCode: 'CIC-309',
		paperId: '031309',
		credits: 3,
	},
	{
		subjectName: 'Design and Analysis of Algorithm',
		subjectCode: 'CIC-311',
		paperId: '031311',
		credits: 4,
	},
	{
		subjectName: 'Compiler Design Lab',
		subjectCode: 'CIC-351',
		paperId: '031351',
		credits: 2,
	},
	{
		subjectName: 'Operating Systems Lab',
		subjectCode: 'CIC-353',
		paperId: '031353',
		credits: 2,
	},
	{
		subjectName: 'Computer Networks Lab',
		subjectCode: 'CIC-355',
		paperId: '031355',
		credits: 2,
	},
	{
		subjectName: 'Software Engineering Lab',
		subjectCode: 'CIC-357',
		paperId: '031357',
		credits: 2,
	},
	{
		subjectName: 'Design and Analysis of Algorithm Lab',
		subjectCode: 'CIC-359',
		paperId: '031359',
		credits: 2,
	},
	{
		subjectName: 'Summer Training Report - 1',
		subjectCode: 'ES-361',
		paperId: '031361',
		credits: 2,
	},
];

// Generate initial data
const initialData = subjectsData.map((subject) => ({
	// TODO: add type for this
	// TODO: define a type for this
	subjectName: subject.subjectName,
	paperCode: subject.paperId,
	subjectCode: subject.subjectCode,
	credits: subject.credits,
	marks: 0,
}));

console.log('The initial data is: ' + JSON.stringify(initialData));

export default function CGPACalculator() {
	const [data, setData] = useState(initialData);
	const [cgpa, setCGPA] = useState<number | null>(null);

	const handleInputChange = (index: number, field: string, value: number): void => {
		const newData = [...data];
		// if (field === "credits" || field === "marks") {
		// 	value = Number(value); // Converts string to number
		// }
		newData[index] = { ...newData[index], [field]: value };
		setData(newData);
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

	const calculateCGPA = (e: FormEvent) => {
		e.preventDefault();
		let totalCredits = 0;
		let totalGradePoints = 0;

		data.forEach((row) => {
			const credits = row.credits;
			console.log('typeof credits: ' + typeof credits);
			console.log('typeof credit2: ' + typeof row.credits);
			const marks = row.marks;
			console.log('typeof marks: ' + typeof marks);
			// if (!isNaN(credits) && !isNaN(marks)) {
			console.log('adding ' + credits + ' credits');
			totalCredits += credits;
			console.log('The tc are: ' + totalCredits);
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
			console.log('The credits are: ' + credits);
			console.log('The total credits are: ' + totalCredits);
			console.log('The marks are: ' + marks);
			console.log('The total grade points are: ' + totalGradePoints);
			// }
		});
		console.log('--------------------------');
		console.log('The total grade points are: ' + totalGradePoints);
		console.log('The total credits are: ' + totalCredits);
		const calculatedCGPA = totalGradePoints / totalCredits;
		console.log('The calculated CGPA is: ' + calculatedCGPA);
		setCGPA(isNaN(calculatedCGPA) ? null : parseFloat(calculatedCGPA.toFixed(3)));
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="mb-4 text-2xl font-bold">CGPA Calculator*</h1>
			<div className="mb-4">* Only valid for 5th sem IT students</div>
			<form onSubmit={calculateCGPA}>
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
											onChange={(e) => {
												handleInputChange(index, 'credits', parseInt(e.target.value));
												console.log(
													'The typeof credits in handleInputChange are: ' +
														typeof row.credits,
												);
											}}
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
											value={row.marks}
											onChange={(e) => {
												handleInputChange(index, 'marks', parseInt(e.target.value));
												console.log(
													'The typeof marks in handleInputChange are: ' + typeof row.marks,
												);
											}}
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
					<button type="button" onClick={addNewRow} className="flex items-center">
						<AddIcon className="mr-2 h-4 w-4" />
						Add Row
					</button>
					<button
						type="submit"
						className="rounded-lg border border-gray-300 p-2 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0.5 active:shadow"
					>
						Calculate CGPA
					</button>
				</div>
			</form>
			{cgpa !== null && (
				<div className="mt-4">
					<p className="text-xl font-bold">Your CGPA: {cgpa}</p>
				</div>
			)}
		</div>
	);
}
