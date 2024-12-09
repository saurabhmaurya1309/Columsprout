import React, { useState } from 'react';
import Dropdown from './components/Dropdown';
import TableComponent from './components/TableComponent';
import Pagination from './components/Pagination';
import { exportToCSV } from './utils/exportToCSV';
import useFetchData from './hooks/useFetchData';
import Spinner from './components/Spinner'; // Import the Spinner component

interface Post {
  id: number;
  title: string;
}

interface Comment {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [contentType, setContentType] = useState<'posts' | 'comments'>('posts'); // Default to 'posts'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const urls = {
    posts: 'https://jsonplaceholder.typicode.com/posts',
    comments: 'https://jsonplaceholder.typicode.com/comments',
  };

  // Fetch data based on contentType
  const { data, loading } = useFetchData<Post | Comment>(urls[contentType]);

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const columns: (keyof Post | keyof Comment)[] =
    contentType === 'posts' ? ['id', 'title'] : ['id', 'name'];

  const handleDropdownChange = (value: "posts" | "comments") => {
    setContentType(value); 
    setCurrentPage(1);  
  };

  return (
    <div className="max-w-[1440px] mx-auto p-4 flex flex-col bg-white shadow-md rounded-lg">
      <header className="w-full h-[80px] bg-white shadow-sm flex items-center rounded-md px-6">
        <h1 className="text-3xl font-semibold">Dynamic Content Manager</h1>
      </header>

      <main className="w-full mt-6 flex flex-col gap-6 px-6">
        <section className="w-full bg-white shadow-sm rounded-md p-4 -mt-5 -ml-4">
          <h2 className="text-xl font-semibold mb-4">Fetch Content</h2>
        
          <Dropdown
            options={[
              { value: 'posts', label: 'Select content type' },
              { value: 'posts', label: 'Posts' },
              { value: 'comments', label: 'Comments' }
            ]}
            selectedValue={contentType}
            onChange={handleDropdownChange}
          />
        </section>

        <section className="w-full bg-white shadow-md rounded-md p-4">
          <h3 className="text-lg font-semibold mb-2">Displaying Content</h3>
          {loading ? (
            
            <Spinner />
          ) : (
            <>
              {contentType === 'posts' ? (
                <TableComponent<Post> columns={['id', 'title']} data={currentData as Post[]} />
              ) : (
                <TableComponent<Comment> columns={['id', 'name']} data={currentData as Comment[]} />
              )}
            </>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage} 
          />
        </section>

        <div className="w-full flex flex-col items-center gap-4">
          <button
            className="px-8 py-3 bg-[#8b88e0] hover:bg-purple-700 text-white font-medium rounded-lg"
            onClick={() => exportToCSV(currentData, columns as Array<'id' | 'title' | 'name'>)}
          >
            Download
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;
