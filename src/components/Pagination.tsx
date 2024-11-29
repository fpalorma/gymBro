interface PaginationProps {
  sectionsPerPage: number
  totalSections: number
  paginate: (pageNumber: number) => void
  currentPage: number
}

export default function Pagination({ sectionsPerPage, totalSections, paginate, currentPage }: PaginationProps) {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalSections / sectionsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className="mt-6 flex justify-center items-center space-x-4">
      <button
        onClick={() => paginate(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Anterior
      </button>
      <span className="text-lg font-semibold">
        Sección {currentPage} de {pageNumbers.length}
      </span>
      <button
        onClick={() => paginate(Math.min(pageNumbers.length, currentPage + 1))}
        disabled={currentPage === pageNumbers.length}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Siguiente
      </button>
    </nav>
  )
}

