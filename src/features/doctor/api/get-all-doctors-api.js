import { useQuery } from "react-query";
import { fetcher } from "@/lib/axios";

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