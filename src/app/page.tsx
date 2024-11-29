"use client"

import { useState, useEffect } from 'react'
import Section from '@/components/Section'
import Pagination from '@/components/Pagination'
import AddSectionForm from '@/components/AddSectionForm'

interface Exercise {
  id: number
  name: string
  weight: number
}

interface WorkoutSection {
  id: number
  name: string
  exercises: Exercise[]
}

const DEFAULT_SECTIONS: WorkoutSection[] = [
  { id: 1, name: 'Día 1', exercises: [] },
  { id: 2, name: 'Día 2', exercises: [] },
  { id: 3, name: 'Día 3', exercises: [] },
]

export default function GymBro() {
  const [sections, setSections] = useState<WorkoutSection[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const sectionsPerPage = 1

  useEffect(() => {
    const storedSections = localStorage.getItem('gymBroSections')
    if (storedSections) {
      setSections(JSON.parse(storedSections))
    } else {
      setSections(DEFAULT_SECTIONS)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('gymBroSections', JSON.stringify(sections))
  }, [sections])

  const updateExercises = (sectionId: number, newExercises: Exercise[]) => {
    setSections(sections.map(section => 
      section.id === sectionId ? { ...section, exercises: newExercises } : section
    ))
  }

  const addSection = (name: string) => {
    const newSection = { id: Date.now(), name, exercises: [] }
    setSections([...sections, newSection])
  }

  const deleteSection = (id: number) => {
    setSections(sections.filter(section => section.id !== id))
    if (currentPage > Math.ceil((sections.length - 1) / sectionsPerPage)) {
      setCurrentPage(Math.max(1, currentPage - 1))
    }
  }

  // Get current section
  const indexOfLastSection = currentPage * sectionsPerPage
  const indexOfFirstSection = indexOfLastSection - sectionsPerPage
  const currentSections = sections.slice(indexOfFirstSection, indexOfLastSection)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">GymBro</h1>
      <AddSectionForm onAddSection={addSection} />
      <div className="mt-6">
        {currentSections.map(section => (
          <Section 
            key={section.id}
            id={section.id}
            name={section.name}
            exercises={section.exercises}
            updateExercises={(newExercises) => updateExercises(section.id, newExercises)}
            onDeleteSection={deleteSection}
          />
        ))}
      </div>
      <Pagination
        sectionsPerPage={sectionsPerPage}
        totalSections={sections.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  )
}

