import axios from "axios";
import { type Note, type NoteInput } from "../types/note";

const API_BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
}

// Відповідь API згідно з документацією
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// При створенні нотатки API повертає об'єкт нотатки
export type CreateNoteResponse = Note;

// При видаленні нотатки API повертає об'єкт видаленої нотатки
export type DeleteNoteResponse = Note;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const fetchNotes = async ({
  page,
  perPage = 12,
  search = "",
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await apiClient.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search },
  });
  return response.data;
};

export const createNote = async (
  noteData: NoteInput,
): Promise<CreateNoteResponse> => {
  const response = await apiClient.post<Note>("/notes", noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<DeleteNoteResponse> => {
  const response = await apiClient.delete<Note>(`/notes/${id}`);
  return response.data;
};
