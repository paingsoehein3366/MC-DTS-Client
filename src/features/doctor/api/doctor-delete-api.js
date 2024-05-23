import { fetcher } from "@/lib/axios"
import { useMutation } from "@tanstack/react-query";

export const doctorDelete = async (id) => {
      return await fetcher.delete(`/doctors/${id}`);
};

export const useDoctorDelete = () => {
      return useMutation({
            mutationFn: doctorDelete
      })
};