import { fetcher } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const createDoctor = async (data) => {
      const createData = await fetcher.post('/doctors', data)

      return createData;
};

export const useCreateDoctor = () => {
    return useMutation({
        mutationFn: createDoctor
    })
}
