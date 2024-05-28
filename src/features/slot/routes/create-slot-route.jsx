import React from "react";
import { useState } from "react";
import { slotCreateSchema } from "../schema/slot-create-schema";
import { queryClient } from "@/lib/react-query";
import { toast } from "react-toastify";
import SlotListRoute from "./slot-list-route";
import { useSlotCreate } from "../api/create-slot-api";
import { useGetSlotDoctor } from "../api/get-slot-doctor-api";

const SlotCreateRoute = ({ doctorId }) => {
	const [dateAndTimeData, setDateAndTimeData] = useState({
		date: "",
		startTime: "",
		endTime: "",
	});
	const [errorMessage, setErrorMessage] = useState({});
	const [showDatePicker, setShowDatePicker] = useState("hidden");
	const [addButtonStyle, setAddButtonStyle] = useState({
		justify: "end",
		marginLeft: 6,
	});

	const { data: slots } = useGetSlotDoctor(doctorId);

	const useSlotCreateMutation = useSlotCreate();

	// choose day decide
	const today = new Date().toISOString().split("T")[0];
	const twoWeek = new Date(new Date().setDate(new Date().getDate() + 14))
		.toISOString()
		.split("T")[0];

	const startHour = parseInt(dateAndTimeData.startTime);
	const startMinute = dateAndTimeData.startTime.split(":")[1];
	const endHour = parseInt(dateAndTimeData.endTime);
	const endMinute = dateAndTimeData.endTime.split(":")[1];
	// Filter Slots
	const filterSlots = slots?.data?.filter((slot) => {
		const currentDate = new Date();
		const startDate = new Date(slot.start_date);
		const endDate = new Date(slot.end_date);
		return startDate >= currentDate && endDate >= currentDate;
	});

	// Get Slot
	const getSlot = filterSlots?.map((item) => {
		const getStartHours = new Date(item.start_date).getHours();
		const getStartMinutes = new Date(item.start_date).getMinutes();

	})

	// Add Slot
	const AddSlot = async () => {
		if (
			showDatePicker === "inline" &&
			!dateAndTimeData.date &&
			!dateAndTimeData.startTime
		) {
			setShowDatePicker("hidden");
			setAddButtonStyle({ justify: "end", marginLeft: 6 });
		} else {
			setShowDatePicker("inline");
			setAddButtonStyle({ justify: "around", marginLeft: 0 });
		}
		const { message, key } = await slotCreateSchema
			.validate(dateAndTimeData)
			.catch((err) => {
				const message = err.errors;
				const key = err.path;
				return { message, key };
			});
		setErrorMessage({ [key]: message });
		if (message) return;
		const setHourStartTime = new Date(dateAndTimeData.date).setHours(
			startHour,
			startMinute,
		);
		const start_date = new Date(setHourStartTime).toISOString();
		const setHourEndTime = new Date(dateAndTimeData.date).setHours(
			endHour,
			endMinute,
		);
		const end_date = new Date(setHourEndTime).toISOString();
		const slotData = { start_date, end_date, doctor: doctorId };
		useSlotCreateMutation.mutate(slotData, {
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ["slots"],
				});
				toast.success("Slot add success!");
			},
			onError: (err) => {
				console.log("slot create error:", err.response.data.message);
			},
		});
	};

	return (
		<div>
			<div
				className={`flex justify-${addButtonStyle.justify} mt-4 mr-${addButtonStyle.marginLeft} `}
			>
				<div className={`flex flex-col ${showDatePicker}`}>
					<input
						min={today}
						max={twoWeek}
						type="date"
						className={`border p-2 rounded-[7px]`}
						onChange={(e) =>
							setDateAndTimeData({ ...dateAndTimeData, date: e.target.value })
						}
					/>
					<span className="text-red-500 text-sm ml-4">{errorMessage.date}</span>
				</div>
				<div className="flex">
					<div className={`flex flex-col ${showDatePicker}`}>
						<input
							type="time"
							className={`border p-2  rounded-[7px] w-28`}
							onChange={(e) =>
								setDateAndTimeData({
									...dateAndTimeData,
									startTime: e.target.value,
								})
							}
						/>
						<span className="text-red-500 text-sm ml-4">
							{errorMessage.startTime}
						</span>
					</div>
					<div className={`flex flex-col ${showDatePicker}`}>
						<input
							type="time"
							className={`border p-2  rounded-[7px] mx-2 w-28`}
							onChange={(e) =>
								setDateAndTimeData({
									...dateAndTimeData,
									endTime: e.target.value,
								})
							}
						/>
						<span className="text-red-500 text-sm ml-4">
							{errorMessage.endTime}
						</span>
					</div>
					<button
						onClick={AddSlot}
						className="p-2 px-5 border rounded-[7px] bg-blue-500 text-white h-11"
					>
						Add Slot
					</button>
				</div>
			</div>
			<SlotListRoute doctorId={doctorId} dateAndTimeData={dateAndTimeData} />
		</div>
	);
};

export default SlotCreateRoute;
