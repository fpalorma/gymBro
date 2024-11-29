import { useState } from 'react'

interface Exercise {
  id: number
  name: string
  weight: number
}

interface ExerciseFormProps {
  initialValues?: Omit<Exercise, 'id'>
  onSubmit: (exercise: Omit<Exercise, 'id'>) => void
  onCancel?: () => void
}

export default function ExerciseForm({ initialValues, onSubmit, onCancel }: ExerciseFormProps) {
  const [name, setName] = useState(initialValues?.name || '')
  const [weight, setWeight] = useState(initialValues?.weight || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, weight: Number(weight) })
    if (!initialValues) {
      setName('')
      setWeight('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ejercicio"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Peso (Kgs)"
        className="w-full p-2 border rounded"
        required
      />
      <div className="flex justify-end space-x-2">
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-4 py-2 text-gray-600 rounded hover:bg-gray-100">
            Cancelar
          </button>
        )}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {initialValues ? 'Editar' : 'Agregar'} Ejercicio
        </button>
      </div>
    </form>
  )
}

