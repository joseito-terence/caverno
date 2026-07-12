import { create } from "zustand";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "@react-native-firebase/firestore";

export interface Song {
  id: string;
  category: string | null;
  cover_image: string | null;
  created_at: string;
  lyrics: string | null;
  style: string | null;
  tempo: number | null;
  title: string;
  transpose: number | null;
}

export type CreateSongData = Omit<Song, "id" | "created_at">;

interface Category {
  id: string;
  name?: string;
}

interface Store {
  songs: Song[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  subscribeSongs: () => () => void;
  subscribeCategories: () => () => void;
  addSong: (data: CreateSongData) => Promise<void>;
  updateSong: (id: string, data: Partial<Song>) => Promise<void>;
  deleteSong: (id: string) => Promise<void>;
}

export const useStore = create<Store>((set) => ({
  songs: [],
  categories: [],
  isLoading: true,
  error: null,

  subscribeSongs: () => {
    const firestore = getFirestore();
    const q = query(collection(firestore, "songs"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const songs: Song[] = snapshot.docs.map((doc: any) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title ?? "",
            category: data.category ?? null,
            cover_image: data.cover_image ?? null,
            created_at: data.created_at ?? "",
            lyrics: data.lyrics ?? null,
            style: data.style ?? null,
            tempo: data.tempo ?? null,
            transpose: data.transpose ?? null,
          };
        });
        songs.sort((a, b) => a.title.localeCompare(b.title));
        set({ songs, error: null, isLoading: false });
      },
      (err) => {
        set({ error: err.message, isLoading: false });
      }
    );
    return unsubscribe;
  },

  subscribeCategories: () => {
    const firestore = getFirestore();
    const q = query(collection(firestore, "categories"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const categories: Category[] = snapshot.docs.map((doc: any) => {
          const data = doc.data();
          return { id: doc.id, name: data.name };
        });
        categories.sort((a, b) =>
          (a.name ?? "").localeCompare(b.name ?? "")
        );
        set({ categories, error: null, isLoading: false });
      },
      (err) => {
        set({ error: err.message, isLoading: false });
      }
    );
    return unsubscribe;
  },

  addSong: async (data) => {
    const firestore = getFirestore();
    await addDoc(collection(firestore, "songs"), {
      ...data,
      created_at: new Date().toISOString(),
    });
  },

  updateSong: async (id, data) => {
    const firestore = getFirestore();
    await updateDoc(doc(firestore, "songs", id), data);
  },

  deleteSong: async (id) => {
    const firestore = getFirestore();
    await deleteDoc(doc(firestore, "songs", id));
  },
}));
