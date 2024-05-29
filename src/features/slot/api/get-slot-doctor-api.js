import { fetcher } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query";

export const getSlotDoctor = async (doctorId) => {
      const { data } = await fetcher.get(`/doctors/${doctorId}/slots`)
      return data;
};

export const useGetSlotDoctor = (doctorId) => {
      return useQuery({
            queryKey: ['slots'],
            queryFn: () => getSlotDoctor(doctorId)
      })
};