import { firebase } from "@react-native-firebase/firestore"
import { useQuery } from "@tanstack/react-query"

export const useSong = (id: string) => {
  return useQuery({
    queryKey: ['songs', id],
    queryFn: async () => {
      const song = await firebase
        .firestore()
        .collection('songs')
        .doc(id)
        .get()

      return song.data()
    },
  })
}
