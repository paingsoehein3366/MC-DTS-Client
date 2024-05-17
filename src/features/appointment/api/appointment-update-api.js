import { fetcher } from "@/lib/axios"
import { useMutation } from "@tanstack/react-query";

export const appointmentUpdate = async (data) => {
      await fetcher.patch('/appointment/update', data).then(res => {
            return res.data;
      })
};

export const useAppointmentUpdate = () => {
      useMutation({
            mutationFn: appointmentUpdate(),
      })
};