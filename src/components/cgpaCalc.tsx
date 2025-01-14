'use client'

import { useState, FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Helper function to generate random subject names
const generateSubjectName = () => {
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English', 'History', 'Geography', 'Economics', 'Psychology']
  return subjects[Math.floor(Math.random() * subjects.length)]
}

// Helper function to generate random codes
const generateCode = () => {
  return Math.random().toString(36).substring(2, 7).toUpperCase()
}

// Generate initial data
const initialData = Array(12).fill(null).map(() => ({
  subjectName: generateSubjectName(),
  paperCode: generateCode(),
  subjectCode: generateCode(),
  credit: Math.floor(Math.random() * 4) + 1,
  marks: ''
}))

export default function CGPACalculator() {
  const [data, setData] = useState(initialData)
  const [cgpa, setCGPA] = useState<number | null>(null)

  const handleInputChange = (index: number, field: string, value: string) => {
    const newData = [...data]
    newData[index] = { ...newData[index], [field]: value }
    setData(newData)
  }

  const calculateCGPA = (e: FormEvent) => {
    e.preventDefault()
    let totalCredits = 0
    let totalGradePoints = 0

    data.forEach(row => {
      const credit = parseFloat(row.credit.toString())
      const marks = parseFloat(row.marks)
      if (!isNaN(credit) && !isNaN(marks)) {
        totalCredits += credit
        // Simple grade point calculation (adjust as needed)
        const gradePoint = marks >= 90 ? 10 : marks >= 80 ? 9 : marks >= 70 ? 8 : marks >= 60 ? 7 : marks >= 50 ? 6 : marks >= 40 ? 5 : 0
        totalGradePoints += credit * gradePoint
      }
    })

    const calculatedCGPA = totalGradePoints / totalCredits
    setCGPA(isNaN(calculatedCGPA) ? null : parseFloat(calculatedCGPA.toFixed(2)))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CGPA Calculator</h1>
      <form onSubmit={calculateCGPA}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Subject Name</th>
                <th className="border border-gray-300 p-2">Paper Code</th>
                <th className="border border-gray-300 p-2">Subject Code</th>
                <th className="border border-gray-300 p-2">Credit</th>
                <th className="border border-gray-300 p-2">Marks</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{row.subjectName}</td>
                  <td className="border border-gray-300 p-2">{row.paperCode}</td>
                  <td className="border border-gray-300 p-2">{row.subjectCode}</td>
                  <td className="border border-gray-300 p-2">
                    <Input
                      type="number"
                      value={row.credit}
                      onChange={(e) => handleInputChange(index, 'credit', e.target.value)}
                      min="1"
                      max="5"
                      className="w-full"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <Input
                      type="number"
                      value={row.marks}
                      onChange={(e) => handleInputChange(index, 'marks', e.target.value)}
                      min="0"
                      max="100"
                      className="w-full"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button type="submit" className="mt-4">Calculate CGPA</Button>
      </form>
      {cgpa !== null && (
        <div className="mt-4">
          <p className="text-xl font-bold">Your CGPA: {cgpa}</p>
        </div>
      )}
    </div>
  )
}

