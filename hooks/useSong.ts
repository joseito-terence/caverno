import { supabase } from "@/utils/supabase"
import { useQuery } from "@tanstack/react-query"

export const useSong = (id: string) => {
  return useQuery({
    queryKey: ['songs', id],
    queryFn: async () => {
      const { data } = await supabase
        .from('songs')
        .select('*')
        .eq('id', id)
        .single()
      return data
    },
  })
}
