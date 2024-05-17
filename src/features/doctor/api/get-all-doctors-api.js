// import { useQuery } from "@tanstack/react-query";
// import { fetcher } from "@/lib/axios";

// export const getAllDoctors = async () => {
// 	// await fetcher.get("/doctors").then(res => {
// 	// 	return res.data;}).catch(err => console.log(err))

// 	const { data } = await fetcher.get("/doctors");
// 	return data;
// };

// export const useGetAllDoctors = () => {
// 	useQuery({
// 		queryKey: ["get-all-doctors"],
// 		queryFn: () => getAllDoctors(),
// 	});
// };

import { fetcher } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const getAllDoctors = async () => {
	const { data } = await fetcher.get("/doctors");
	return data;
};

export const useGetAllDoctors = () => {
	return useQuery({
		queryKey: ["get-all-doctors"],
		queryFn: () => getAllDoctors(),
	});
};
