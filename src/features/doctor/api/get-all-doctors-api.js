import { fetcher } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getAllDoctors = async () => {
      const { data } = await fetcher.get('/doctors');
      return data;
};

export const useGetAllDoctors = () => {
      return useQuery({
            queryKey: ['get-all-doctors'],
            queryFn: () => getAllDoctors()
      })
};
