import { firebase } from "@react-native-firebase/firestore"
import { useQuery, useQueryClient } from "@tanstack/react-query"

const queryKey = ['categories']

const queryFn = async () => {
  const categories = await firebase
    .firestore()
    .collection('categories')
    .orderBy('name')
    .get()
  return categories.docs.map(doc => doc.data())
}

export const useCategories = () => {
 return useQuery({ queryKey, queryFn })
}

export const usePrefetchCategories = () => {
  const queryClient = useQueryClient()
  return queryClient.prefetchQuery({ queryKey, queryFn })
}
