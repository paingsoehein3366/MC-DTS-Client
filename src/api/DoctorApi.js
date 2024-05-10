import { useMutation, useQuery } from "react-query";
import { fetcher } from "../lib/axios";

export const getAllDoctors = async () => {
      await fetcher.get('/').then(res => {
            return res.data;
      })
};

export const useGetAllDoctors = () => {
      useQuery({
            queryKey: ['doctors'],
            queryFn: () => getAllDoctors
      })
};

export const createDoctor = async (data) => {
      await fetcher.post('/create', data).then(res => {
            return res.data;
      })
};

export const useCreateDoctor = () => {
      useMutation({
            mutationFn: createDoctor,
      })
};