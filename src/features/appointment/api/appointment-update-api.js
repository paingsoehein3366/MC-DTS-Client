import { fetcher } from "@/lib/axios"
import { useMutation } from "@tanstack/react-query";

export const appointmentUpdate = async ({ id, data }) => {
      return await fetcher.patch(`/appointments/${id}`, data);
};

export const useAppointmentUpdate = () => {
      return useMutation({
            mutationFn: appointmentUpdate
      })
};