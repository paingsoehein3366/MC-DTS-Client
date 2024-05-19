import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/axios";

export const getDoctor = async (id) => {
      const { data } = await fetcher.get(`/doctors/${id}`);
      return data;
};

export const useGetDoctor = (id) => {
      return useQuery({
            queryKey: ['get-doctor'],
            queryFn: () => getDoctor(id)
      })
};
