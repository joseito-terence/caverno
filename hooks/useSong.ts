import { getFirestore, doc, getDoc } from "@react-native-firebase/firestore"
import { useQuery } from "@tanstack/react-query"

export const useSong = (id: string) => {
  return useQuery({
    queryKey: ['songs', id],
    queryFn: async () => {
      const firestore = getFirestore()
      const song = await getDoc(doc(firestore, 'songs', id))
      return song.data()
    },
  })
}
