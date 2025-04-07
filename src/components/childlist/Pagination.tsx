interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange(page); // Appelle la fonction pour changer de page
  };

  return (
    <div className="flex justify-center mt-4 space-x-2">
      <button
        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Précédent
      </button>
      <span className="px-3 py-1 bg-gray-100 rounded-md">
        {currentPage} / {totalPages}
      </span>
      <button
        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Suivant
      </button>
    </div>
  );
};

export default Pagination;
