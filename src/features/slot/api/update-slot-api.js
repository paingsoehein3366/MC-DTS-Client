import { fetcher } from "@/lib/axios"
import { useMutation } from "@tanstack/react-query";

export const updateSlot = async ({ id, data }) => {
      return await fetcher.patch(`/slots/${id}`, data);
};

export const useUpdateSlot = () => {
      return useMutation({
            mutationFn: updateSlot
      })
};