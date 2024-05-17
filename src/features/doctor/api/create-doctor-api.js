import { fetcher } from "@/lib/axios";
import { useMutation } from "react-query";

export const createDoctor = async (data) => {
      await fetcher.post('/doctor/create', data).then(res => {
            return res.data;
      })
};

export const useCreateDoctor = () => {
      useMutation({
            mutationFn: createDoctor,
      })
};