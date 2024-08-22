import { supabase } from "@/utils/supabase"
import { useQuery, useQueryClient } from "@tanstack/react-query"

const queryKey = ['categories']

const queryFn = async () => {
  const { data = [] } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })
  return data
}

export const useCategories = () => {
 return useQuery({ queryKey, queryFn })
}

export const usePrefetchCategories = () => {
  const queryClient = useQueryClient()
  return queryClient.prefetchQuery({ queryKey, queryFn })
}
