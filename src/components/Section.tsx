import { useState } from 'react'
import ExerciseForm from './ExerciseForm'

interface Exercise {
  id: number
  name: string
  weight: number
}

interface SectionProps {
  id: number
  name: string
  exercises: Exercise[]
  updateExercises: (exercises: Exercise[]) => void
  onDeleteSection: (id: number) => void
}

export default function Section({ id, name, exercises, updateExercises, onDeleteSection }: SectionProps) {
  const [editingId, setEditingId] = useState<number | null>(null)

  const addExercise = (exercise: Omit<Exercise, 'id'>) => {
    const newExercise = { ...exercise, id: Date.now() }
    updateExercises([...exercises, newExercise])
  }

  const updateExercise = (updatedExercise: Exercise) => {
    updateExercises(exercises.map(ex => ex.id === updatedExercise.id ? updatedExercise : ex))
    setEditingId(null)
  }

  const deleteExercise = (id: number) => {
    updateExercises(exercises.filter(ex => ex.id !== id))
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <button onClick={() => onDeleteSection(id)} className="text-red-500 hover:text-red-700">
          Eliminar Sección
        </button>
      </div>
      <ul className="space-y-4 mb-4">
        {exercises.map(exercise => (
          <li key={exercise.id} className="flex items-center justify-between">
            {editingId === exercise.id ? (
              <ExerciseForm
                initialValues={exercise}
                onSubmit={updateExercise}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <span>{exercise.name} - {exercise.weight} Kgs</span>
                <div>
                  <button onClick={() => setEditingId(exercise.id)} className="text-blue-500 mr-2">Editar</button>
                  <button onClick={() => deleteExercise(exercise.id)} className="text-red-500">Eliminar</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <ExerciseForm onSubmit={addExercise} />
    </div>
  )
}

