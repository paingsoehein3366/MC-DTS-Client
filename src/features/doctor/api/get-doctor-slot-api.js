import { fetcher } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query";

export const getDoctorSlot = async (doctorId) => {
      const { data } = await fetcher.get(`/doctors/${doctorId}/slots`)
      return data;
};

export const useGetDoctorSlot = (doctorId) => {
      return useQuery({
            queryKey: ['slots'],
            queryFn: () => getDoctorSlot(doctorId)
      })
};