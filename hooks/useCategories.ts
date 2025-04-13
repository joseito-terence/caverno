import { getFirestore, collection, query, orderBy, getDocs } from "@react-native-firebase/firestore"
import { useQuery, useQueryClient } from "@tanstack/react-query"

const queryKey = ['categories']

const queryFn = async () => {
  const firestore = getFirestore()
  const categories = await getDocs(
    query(
      collection(firestore, 'categories'),
      orderBy('name')
    )
  )
  return categories.docs.map(doc => doc.data())
}

export const useCategories = () => {
 return useQuery({ queryKey, queryFn })
}

export const usePrefetchCategories = () => {
  const queryClient = useQueryClient()
  return queryClient.prefetchQuery({ queryKey, queryFn })
}
