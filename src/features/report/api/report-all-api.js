import { fetcher } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query";

export const getAllReports = async () => {
      const { data } = await fetcher.get(`/appointments`);
      return  data;
};

export const useGetAllReports = () => {
      return useQuery({
            queryKey: ['get-all-reports'],
            queryFn: () => getAllReports()
      })
};

