import React from 'react';

interface TableComponentProps<T> {
  columns: (keyof T)[];
  data: T[];
}

const TableComponent = <T,>({ columns, data }: TableComponentProps<T>) => {
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead className="bg-gray-100 border-b">
        <tr>
          {columns.map((col) => (
            <th key={String(col)} className="text-left px-4 py-2">
              {String(col).toUpperCase()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}
          >
            {columns.map((col) => (
              <td key={String(col)} className="px-4 py-2">
                {item[col] as React.ReactNode}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
