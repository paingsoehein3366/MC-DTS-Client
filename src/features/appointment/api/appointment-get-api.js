import { fetcher } from "@/lib/axios"
import { useMutation, useQuery } from "@tanstack/react-query";

export const getAllAppointments = async () => {
      const { data } = await fetcher.get(`/appointments`);
      return { data };
};

export const useGetAllAppointments = () => {
      return useQuery({
            queryKey: ['appointments'],
            queryFn: () => getAllAppointments()
      })
};

