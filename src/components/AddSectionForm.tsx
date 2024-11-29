import { useState } from 'react'

interface AddSectionFormProps {
  onAddSection: (name: string) => void
}

export default function AddSectionForm({ onAddSection }: AddSectionFormProps) {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onAddSection(name.trim())
      setName('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex space-x-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nueva sección"
        className="flex-grow p-2 border rounded"
        required
      />
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Agregar 
      </button>
    </form>
  )
}

