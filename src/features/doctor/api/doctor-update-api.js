import { fetcher } from "@/lib/axios"
import { useMutation } from "@tanstack/react-query";

export const doctorUpdate = async ({ id, data }) => {
      return await fetcher.patch(`/doctors/${id}`, data)
};
export const useDoctorUpdate = () => {
      return useMutation({
            mutationFn: doctorUpdate
      })
};