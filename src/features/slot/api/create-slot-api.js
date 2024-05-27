import { fetcher } from "@/lib/axios"
import { useMutation } from "@tanstack/react-query";

export const slotCreate = async (data) => {
      return await fetcher.post('/slots', data);
};

export const useSlotCreate = () => {
      return useMutation({
            mutationFn: slotCreate
      })
};