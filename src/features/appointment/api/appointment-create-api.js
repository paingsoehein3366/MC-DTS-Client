import { fetcher } from "@/lib/axios"
import { useMutation } from "@tanstack/react-query";

export const appointmentCreate = async (data) => {
      return await fetcher.post('/appointments', data)
};

export const useAppointmentCreate = () => {
      return useMutation({
            mutationFn: appointmentCreate
      })
};