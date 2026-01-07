// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Dashboard from "../../components/Dashboard/Dashboard";
// import Filters from "../../components/Dashboard/Filters";
// import Statistics from "../../components/Dashboard/Statistics";
// import AddWordBtn from "../../components/Dashboard/AddWordBtn";
// import WordsTable from "../../components/WordsTable/WordsTable";
// import WordsPagination from "../../components/Pagination/WordsPagination";
// import AddWordModal from "../../components/Modals/AddWordModal";
// import EditWordModal from "../../components/Modals/EditWordModal";

// import { fetchCategories, selectCategories } from "../../store/categoriesSlice";

// import {
//   fetchWords,
//   selectWords,
//   selectWordsStatus,
//   selectFilters,
//   selectPagination,
//   setFilters,
//   setPage,
// } from "../../store/wordsSlice";

// const DictionaryPage = () => {
//   const dispatch = useDispatch();
//   const words = useSelector(selectWords);
//   const status = useSelector(selectWordsStatus);
//   const filters = useSelector(selectFilters);
//   const pagination = useSelector(selectPagination);

//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editWord, setEditWord] = useState(null);

//   // Categories load
//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   // Words load
//   useEffect(() => {
//     dispatch(fetchWords());
//   }, [dispatch, filters, pagination.page]);

//   const handleFilterChange = (newFilters) => {
//     dispatch(setFilters(newFilters));
//     dispatch(setPage(1));
//   };

//   const handlePageChange = (newPage) => {
//     dispatch(setPage(newPage));
//   };

//   return (
//     <div className="dictionary-page">
//       <Dashboard>
//         <Filters filters={filters} onChange={handleFilterChange} />
//         <AddWordBtn onClick={() => setShowAddModal(true)} />
//         <Statistics />
//       </Dashboard>

//       {status === "loading" && <p>Loading...</p>}
//       {status === "error" && (
//         <p style={{ color: "red" }}>Error loading words</p>
//       )}
//       {status === "success" && (
//         <>
//           <WordsTable data={words} onEdit={setEditWord} />
//           <WordsPagination
//             page={pagination.page}
//             total={pagination.total}
//             pageSize={pagination.pageSize}
//             onChangePage={handlePageChange}
//           />
//         </>
//       )}

//       {showAddModal && <AddWordModal onClose={() => setShowAddModal(false)} />}
//       {editWord && (
//         <EditWordModal word={editWord} onClose={() => setEditWord(null)} />
//       )}
//     </div>
//   );
// };

// export default DictionaryPage;
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Dashboard from "../../components/Dashboard/Dashboard";
import Filters from "../../components/Dashboard/Filters";
import AddWordBtn from "../../components/Dashboard/AddWordBtn";
import Statistics from "../../components/Dashboard/Statistics";

import WordsTable from "../../components/WordsTable/WordsTable";
import WordsPagination from "../../components/Pagination/WordsPagination";

import AddWordModal from "../../components/Modals/AddWordModal";
import EditWordModal from "../../components/Modals/EditWordModal";

import { fetchCategories, selectCategories } from "../../store/categoriesSlice";
import {
  fetchWords,
  setPage,
  setFilters,
  selectWords,
  selectWordsStatus,
  selectPagination,
  selectFilters,
} from "../../store/wordsSlice";

const DictionaryPage = () => {
  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);
  const words = useSelector(selectWords);
  const status = useSelector(selectWordsStatus);
  const pagination = useSelector(selectPagination);
  const filters = useSelector(selectFilters);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editWord, setEditWord] = useState(null);

  // Завантаження категорій 1 раз
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Завантаження слів при зміні фільтрів або сторінки
  useEffect(() => {
    dispatch(fetchWords());
  }, [dispatch, filters, pagination.page]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
    dispatch(setPage(1));
  };

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  return (
    <div className="dictionary-page" style={{ padding: "20px" }}>
      <h2>Dictionary Page</h2>

      {/* Dashboard */}
      <Dashboard>
        <Filters filters={filters} onChange={handleFilterChange} />
        <AddWordBtn onClick={() => setShowAddModal(true)} />
        <Statistics words={words} />
      </Dashboard>

      {/* Статус завантаження */}
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Error. Try again.</p>}

      {/* Таблиця слів та пагінація */}
      {status === "success" && (
        <>
          <WordsTable words={words} onEdit={(word) => setEditWord(word)} />
          <WordsPagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {/* Модалки */}
      {showAddModal && <AddWordModal onClose={() => setShowAddModal(false)} />}
      {editWord && (
        <EditWordModal word={editWord} onClose={() => setEditWord(null)} />
      )}
    </div>
  );
};

export default DictionaryPage;
