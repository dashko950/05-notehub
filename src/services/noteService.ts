import axios from "axios";
import { type Note, type NoteInput } from "../types/note";

const API_BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
}

// ВІДПОВІДЬ API МІСТИТЬ ТІЛЬКИ notes ТА totalPages
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// ПРИ СТВОРЕННІ API ПОВЕРТАЄ ОБ'ЄКТ НОТАТКИ НАПРЯМУ
export type CreateNoteResponse = Note;

// ПРИ ВИДАЛЕННІ API ПОВЕРТАЄ ОБ'ЄКТ ВИДАЛЕНОЇ НОТАТКИ НАПРЯМУ
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
