import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import {
  fetchNotes,
  type FetchNotesResponse,
} from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import css from "./App.module.css";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, 500);

  const { data, isLoading, error } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", currentPage, searchTerm],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: 12,
        search: searchTerm,
      }),
    placeholderData: (previousData) => previousData,
  });

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading && !data)
    return <div className={css.loading}>Loading notes...</div>;
  if (error)
    return (
      <div className={css.error}>
        Error loading notes: {(error as Error).message}
      </div>
    );

  const totalPages = data?.totalPages || 0;
  const hasNotes = data?.notes && data.notes.length > 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {hasNotes && <NoteList notes={data.notes} />}
      {!hasNotes && !isLoading && (
        <div className={css.emptyState}>
          No notes found. Create your first note!
        </div>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default App;
