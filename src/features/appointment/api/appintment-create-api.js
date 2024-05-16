import { fetcher } from "@/lib/axios"
import { useMutation } from "react-query";

export const createAppointment = async ({ data }) => {
      await fetcher.post('/appointment/create', data).then(res => {
            return res.data;
      }).catch(err => console.log(err))
};

export const useCreateAppointment = () => {
      useMutation({
            mutationFn: createAppointment,
      })
};