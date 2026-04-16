import axios from "axios";
import { type Note, type NoteInput } from "../types/note";

const API_BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface CreateNoteResponse {
  note: Note;
}

export interface DeleteNoteResponse {
  message: string;
  deletedNote: Note;
}

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
  const response = await apiClient.post<CreateNoteResponse>("/notes", noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<DeleteNoteResponse> => {
  const response = await apiClient.delete<DeleteNoteResponse>(`/notes/${id}`);
  return response.data;
};
