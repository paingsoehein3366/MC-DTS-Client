import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/axios";

export const getAllDoctors = async () => {
      const { data } = await fetcher.get('/doctors');
      return data;
};

export const useGetAllDoctors = () => {
      return useQuery({
            queryKey: ['doctors'],
            queryFn: () => getAllDoctors()
      })
};
