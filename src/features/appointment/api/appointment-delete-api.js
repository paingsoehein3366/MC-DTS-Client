import { fetcher } from "@/lib/axios"
import { useMutation } from "@tanstack/react-query";

export const appointmentDelete = async (id) => {
      await fetcher.delete('/appointment/delete', id).then(res => {
            return res.status;
      })
};

export const useAppointmentDelete = () => {
      useMutation({
            mutationFn: appointmentDelete(),
      })
};