export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  className,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const goToPreviousPage = () => {
    goToPage(currentPage - 1);
  };

  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };

  const showLeftArrow = currentPage > 1;
  const showRightArrow = currentPage < totalPages;

  return (
    <div className={`flex justify-center mt-4 ${className}`}>
      {showLeftArrow && (
        <button onClick={goToPreviousPage} className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#392467"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#392467"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
        </button>
      )}
      {totalPages > 1 && (
        <span className="text-[#392467] text-xl font-normal">
          {currentPage}
        </span>
      )}
      {showRightArrow && (
        <button onClick={goToNextPage} className="ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#392467"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#392467"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
