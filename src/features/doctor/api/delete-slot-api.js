import { fetcher } from "@/lib/axios"
import { useMutation } from "@tanstack/react-query";

export const deleteSlot = async (id) => {
      return await fetcher.delete(`/slots/${id}`)
};
export const useDeleteSlot = () => {
      return useMutation({
            mutationFn: deleteSlot
      })
};