// import { Dialog, DialogContent } from "@/components/ui/dialog";
// // import {queryClient} from "@/lib/react-query";
// import { useState } from "react";
// // import { useCreateDoctor } from "../api/create-doctor-api";
// import {
// 	Select,
// 	SelectContent,
// 	SelectTrigger,
// 	SelectValue,
// 	SelectItem,
// } from "@/components/ui/select";
// import { Label } from "@/components/ui/label";
// import { createDoctorValidate } from "../schema/doctor-create-schema";
// import { useCreateDoctor } from "../api/create-doctor-api";
// import { queryClient } from "@/lib/react-query";

// const DoctorCreateRoute = ({ open, setOpen }) => {
// 	const [doctorInputValue, setDoctorInputValue] = useState({
// 		firstName: "",
// 		lastName: "",
// 		email: "",
// 		phone: "",
// 		experiences: "",
// 		specialist: "",
// 		gender: "",
// 		bio: "",
// 	});

// 	const createOneDoctor = useCreateDoctor();

// 	console.log(doctorInputValue);
// 	const [errorMessage, setErrorMessage] = useState({});

// 	const inputStyle =
// 		"border border-gray-300 mt-2 w-72 h-10 p-4 rounded focus:outline-none focus:border-blue-500";
// 	const inputContainer = "flex flex-col mt-5";
// 	const inputContainerTwo = "flex justify-around w-[700px]";

// 	const handleOnChange = (e) => {
// 		const { name, value } = e.target;
// 		setDoctorInputValue({ ...doctorInputValue, [name]: value });
// 	};

// 	const doctorCreate = async () => {
// 		const { message, key } = await createDoctorValidate(doctorInputValue);
// 		setErrorMessage({ [key]: message });
// 		if (message) return;
// 		const data = {
// 			name: doctorInputValue.firstName + ' ' + doctorInputValue.lastName,
// 			email: doctorInputValue.email,
// 			phone: doctorInputValue.phone
// 		}
// 		createOneDoctor.mutate(doctorInputValue, {
// 			onSuccess: () => {
// 				queryClient.invalidateQueries({
// 					queryKey: ["get-all-doctors"],
// 				});
// 				setOpen();
// 			},
// 		});
// 	};
// 	return (
// 		<Dialog open={open} onOpenChange={setOpen}>
// 			<DialogContent className=" bg-white sm:max-w-[750px]">
// 				<div className="flex flex-col justify-center items-center">
// 					<div className="flex flex-col justify-center items-center py-8">
// 						<h1 className="text-2xl mb-6">Create Doctor</h1>
// 						<div className={inputContainerTwo}>
// 							<div className={inputContainer}>
// 								<Label>
// 									First Name <span className="text-red-500">*</span>
// 								</Label>
// 								<input
// 									className={inputStyle}
// 									name="firstName"
// 									onChange={handleOnChange}
// 									type="text"
// 									placeholder="First Name"
// 								/>
// 								<span className="text-red-500 text-sm ml-4">
// 									{errorMessage.firstName}
// 								</span>
// 							</div>
// 							<div className={inputContainer}>
// 								<Label>
// 									Last Name <span className="text-red-500">*</span>
// 								</Label>
// 								<input
// 									className={inputStyle}
// 									name="lastName"
// 									onChange={handleOnChange}
// 									type="text"
// 									placeholder="Last Name"
// 								/>
// 								<span className="text-red-500 text-sm ml-4">
// 									{errorMessage.lastName}
// 								</span>
// 							</div>
// 						</div>
// 						<div className={inputContainerTwo}>
// 							<div className={inputContainer}>
// 								<Label>
// 									Email <span className="text-red-500">*</span>
// 								</Label>
// 								<input
// 									className={inputStyle}
// 									name="email"
// 									onChange={handleOnChange}
// 									type="text"
// 									placeholder="Email"
// 								/>
// 								<span className="text-red-500 text-sm ml-4">
// 									{errorMessage.email}
// 								</span>
// 							</div>
// 							<div className={inputContainer}>
// 								<Label>
// 									Phone <span className="text-red-500">*</span>
// 								</Label>
// 								<input
// 									className={inputStyle}
// 									name="phone"
// 									onChange={handleOnChange}
// 									type="text"
// 									placeholder="Phone"
// 								/>
// 								<span className="text-red-500 text-sm ml-4">
// 									{errorMessage.phone}
// 								</span>
// 							</div>
// 						</div>
// 						<div className={inputContainerTwo}>
// 							<div className={inputContainer}>
// 								<Label>
// 									Specialist <span className="text-red-500">*</span>
// 								</Label>
// 								<Select
// 									onValueChange={(value) =>
// 										setDoctorInputValue({
// 											...doctorInputValue,
// 											specialist: value,
// 										})
// 									}
// 								>
// 									<SelectTrigger className={inputStyle}>
// 										<SelectValue placeholder="Specialist" />
// 									</SelectTrigger>
// 									<SelectContent className="bg-[#fff]">
// 										<SelectItem value="eyecare">Eye Care</SelectItem>
// 										<SelectItem value="Gynecologist">Gynecologist</SelectItem>
// 										<SelectItem value="Psychotherapist">
// 											Psychotherapist
// 										</SelectItem>
// 										<SelectItem value="Orthopedic">Orthopedic</SelectItem>
// 										<SelectItem value="Gasttologist">Gasttologist</SelectItem>
// 										<SelectItem value="Urologist">Urologist</SelectItem>
// 										<SelectItem value="Neurologist">Neurologist</SelectItem>
// 									</SelectContent>
// 								</Select>
// 								<span className="text-red-500 text-sm ml-4">
// 									{errorMessage.specialist}
// 								</span>
// 							</div>
// 							<div className={inputContainer}>
// 								<Label>
// 									Experiences <span className="text-red-500">*</span>
// 								</Label>
// 								<input
// 									className={inputStyle}
// 									name="experiences"
// 									onChange={handleOnChange}
// 									type="text"
// 									placeholder="1 year"
// 								/>
// 								<span className="text-red-500 text-sm ml-4">
// 									{errorMessage.experiences}
// 								</span>
// 							</div>
// 						</div>
// 						<div className="flex justify-start w-[640px]">
// 							<div className={inputContainer}>
// 								<Label>
// 									Gender <span className="text-red-500">*</span>
// 								</Label>
// 								<Select
// 									onValueChange={(value) =>
// 										setDoctorInputValue({ ...doctorInputValue, gender: value })
// 									}
// 								>
// 									<SelectTrigger className={inputStyle}>
// 										<SelectValue placeholder="Gender" />
// 									</SelectTrigger>
// 									<SelectContent className="bg-[#fff]">
// 										<SelectItem value="Male">Male</SelectItem>
// 										<SelectItem value="Female">Female</SelectItem>
// 									</SelectContent>
// 								</Select>
// 								<span className="text-red-500 text-sm ml-4">
// 									{errorMessage.gender}
// 								</span>
// 							</div>
// 						</div>
// 						<div className={inputContainer}>
// 							<Label>Your Bio Here</Label>
// 							<textarea
// 								className="mt-2 border w-[640px] h-24 px-4 py-2 rounded-[7px] border-gray-300 text-sm focus:outline-none focus:border-blue-500"
// 								placeholder="Bio:"
// 								name="bio"
// 								onChange={handleOnChange}
// 							></textarea>
// 						</div>
// 						<button
// 							className="py-2 px-4 border mt-10 rounded bg-blue-500 text-[#fff]"
// 							onClick={doctorCreate}
// 						>
// 							Create
// 						</button>
// 					</div>
// 				</div>
// 			</DialogContent>
// 		</Dialog>
// 	);
// };
// export default DoctorCreateRoute;

const DoctorCreateRoute = () => {
	return (
		<div>
			<h1 className="">Hello create doctor</h1>
		</div>
	);
};

export default DoctorCreateRoute;
