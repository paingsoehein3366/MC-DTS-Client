import { fetcher } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query";

export const getOneDoctor = async (doctorId) => {
      const { data } = await fetcher.get(`/doctors/${doctorId}`);
      return data;
};

export const useGetOneDoctor = (doctorId) => {
      return useQuery({
            queryKey: ['doctors'],
            queryFn: () => getOneDoctor(doctorId)
      })
}