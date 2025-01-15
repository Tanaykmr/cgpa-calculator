interface subjectInterface {
	subjectName: string;
	subjectCode: string;
	paperId: string;
	credits: number;
	// marks: number;  TODO: do we need this?
	// TODO: add lab type here to render theory and labs separately
}

export const subjectsData: subjectInterface[] = [
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
		credits: 1,
	},
	{
		subjectName: 'Operating Systems Lab',
		subjectCode: 'CIC-353',
		paperId: '031353',
		credits: 1,
	},
	{
		subjectName: 'Computer Networks Lab',
		subjectCode: 'CIC-355',
		paperId: '031355',
		credits: 1,
	},
	{
		subjectName: 'Software Engineering Lab',
		subjectCode: 'CIC-357',
		paperId: '031357',
		credits: 1,
	},
	{
		subjectName: 'Design and Analysis of Algorithm Lab',
		subjectCode: 'CIC-359',
		paperId: '031359',
		credits: 1,
	},
	{
		subjectName: 'Summer Training Report - 1',
		subjectCode: 'ES-361',
		paperId: '031361',
		credits: 1,
	},
];
