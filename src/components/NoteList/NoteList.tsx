import { type Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onDelete }) => {
  const getTagColor = (tag: string): string => {
    const colors: Record<string, string> = {
      Todo: "#ff6b6b",
      Work: "#4ecdc4",
      Personal: "#45b7d1",
      Meeting: "#f9ca24",
      Shopping: "#f0932b",
    };
    return colors[tag] || "#95a5a6";
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span
              className={css.tag}
              style={{ backgroundColor: getTagColor(note.tag) }}
            >
              {note.tag}
            </span>
            <button className={css.button} onClick={() => onDelete(note.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
