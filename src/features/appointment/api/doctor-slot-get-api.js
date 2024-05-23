import { useEffect, useState } from 'react';
import { fetcher } from "@/lib/axios"

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
