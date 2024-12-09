import React from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
  const getPageNumbers = () => {
    const pages = [];
    const ellipsis = '...';

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push(ellipsis);
      }

      if (currentPage > 2) {
        pages.push(currentPage - 1);
      }

      if (currentPage !== 1 && currentPage !== totalPages) {
        pages.push(currentPage);
      }

      if (currentPage < totalPages - 1) {
        pages.push(currentPage + 1);
      }

      if (currentPage < totalPages - 2) {
        pages.push(ellipsis);
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="w-full flex items-center justify-start space-x-2 mt-4 ml-6">
      <button
        className="px-4 py-2"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaChevronLeft />
      </button>
      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            className={`px-4 py-2 ${page === currentPage ? 'text-[#8b88e0]' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2 py-2">
            {page}
          </span>
        )
      )}
      <button
        className="px-4 py-2"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
