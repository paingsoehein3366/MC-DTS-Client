import { fetcher } from "@/lib/axios"
import { useMutation } from "@tanstack/react-query";

export const appointmentDelete = async (id) => {
      return await fetcher.delete(`/appointments/${id}`)
};

export const useAppointmentDelete = () => {
      return useMutation({
            mutationFn: appointmentDelete,
      })
};