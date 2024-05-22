import { fetcher } from "@/lib/axios"
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from 'react';

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


export const useGetDoctorSlots = (doctorId) => {
      const [data, setData] = useState(null);

      useEffect(() => {
            if (doctorId) {
                  fetchDoctorSlots(doctorId).then((slots) => setData(slots));
            }
      }, [doctorId]);

      return { data };
};

async function fetchDoctorSlots(doctorId) {
      // Your logic to fetch doctor slots
      const { data } = await fetcher.get(`/doctors/${doctorId}/slots`);
      return data;
}

