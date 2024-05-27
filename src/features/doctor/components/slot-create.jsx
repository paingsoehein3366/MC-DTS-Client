import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { slotCreateSchema } from "../schema/slot-create-schema";
import SlotEdit from "./slot-edit";
import { useSlotCreate } from "../api/create-slot-api";
import { queryClient } from "@/lib/react-query";
import { TableBody, TableCell } from "@/components/ui/table";
import EditIcon from "./edit-icon";
import DeleteIcon from "@/features/appointment/components/delete-icon";
import SlotRemove from "./slot-remove";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useGetAllAppointments } from "@/features/appointment/api/appointment-get-api";
import SlotCheckIcon from "./slot-check-icon";

const SlotCreate = ({ slots, doctorId }) => {
      const [dateAndTimeData, setDateAndTimeData] = useState({
            date: "",
            startTime: "",
            endTime: "",
      });
      const [editSlot, setEditSlot] = useState({});
      const [removeSlot, setRemoveSlot] = useState({});
      const [allSlots, setAllSlots] = useState([]);
      const [searchSlot, setSearchSlot] = useState("");
      const [errorMessage, setErrorMessage] = useState({});
      const [open, setOpen] = useState(false);
      const [openRemove, setOpenRemove] = useState(false);
      const [showDatePicker, setShowDatePicker] = useState("hidden");
      const [addButtonStyle, setAddButtonStyle] = useState({
            justify: "end",
            marginLeft: 6,
      });

      const useSlotCreateMutation = useSlotCreate();
      const { data: appointments } = useGetAllAppointments();
      console.log("appointment: ", appointments);

      const startHour = parseInt(dateAndTimeData.startTime);
      const startMinute = dateAndTimeData.startTime.split(":")[1];
      const endHour = parseInt(dateAndTimeData.endTime);
      const endMinute = dateAndTimeData.endTime.split(":")[1];

      // choose day decide
      const today = new Date().toISOString().split("T")[0];
      const twoWeek = new Date(new Date().setDate(new Date().getDate() + 14))
            .toISOString()
            .split("T")[0];

      // Get Slot
      const getSlot = slots?.map((item) => {
            const getStartHours = new Date(item.start_date).getHours();
            const getStartMinutes = new Date(item.start_date).getMinutes();

            const getEndHours = new Date(item.end_date).getHours();
            const getEndMinutes = new Date(item.end_date).getMinutes();

            const getDate = new Date(item.end_date).toISOString().substring(0, 10);

            return {
                  startDate:
                        (getStartHours < 10 ? "0" + getStartHours.toString() : getStartHours) +
                        ":" +
                        (getStartMinutes < 10 ?
                              "0" + getStartMinutes.toString()
                              : getStartMinutes),

                  endDate:
                        (getEndHours < 10 ? "0" + getEndHours.toString() : getEndHours) +
                        ":" +
                        (getEndMinutes < 10 ? "0" + getEndMinutes.toString() : getEndMinutes),

                  date:
                        getDate.split("-")[0] +
                        "-" +
                        getDate.split("-")[1] +
                        "-" +
                        Number(getDate.split("-")[2]),
                  id: item._id,
            };
      });
      useEffect(() => {
            setAllSlots(getSlot);
      }, []);

      //Check slot isAppointment
      const getSlotId = getSlot?.map((item) => item.id);
      const checkSlotIsAppointment = appointments?.data?.data.filter((item) =>
            getSlotId?.includes(item.slot._id),
      );
      const checkSlotIsAppointmentId = checkSlotIsAppointment?.map(
            (item) => item.slot._id,
      );
      console.log("checkSlotIsAppointmentId: ", checkSlotIsAppointmentId);
      // Check Date
      const checkDate = getSlot?.filter((item) => searchSlot?.includes(item.date));

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

      // All Slots
      const AllSlots = () => {
            setSearchSlot("");
            setAllSlots(getSlot);
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
                  <div className="  mt-5 ">
                        {allSlots?.length ?
                              <button
                                    onClick={AllSlots}
                                    className="border p-2  rounded-[7px] mr-3 h-11 w-11 border-blue-500"
                              >
                                    All
                              </button>
                              : <button
                                    onClick={AllSlots}
                                    className="border p-2  rounded-[7px] mr-3 h-11 w-11 focus:outline-none focus:border-blue-500"
                              >
                                    All
                              </button>
                        }
                        {!checkDate?.length ?
                              <input
                                    min={today}
                                    max={twoWeek}
                                    onChange={(e) => {
                                          setSearchSlot(e.target.value);
                                          setAllSlots("");
                                    }}
                                    type="date"
                                    value={searchSlot}
                                    className="border p-2  rounded-[7px] mr-3 h-11 focus:outline-none focus:border-blue-500"
                              />
                              : <input
                                    min={today}
                                    max={twoWeek}
                                    onChange={(e) => setSearchSlot(e.target.value)}
                                    type="date"
                                    value={searchSlot}
                                    className="border p-2  rounded-[7px] mr-3 h-11 focus:outline-none border-blue-500"
                              />
                        }
                        <ScrollArea className="h-72 w-[100%] border p-3 px-4 rounded-[7px] mt-3">
                              {allSlots?.length ?
                                    !allSlots?.length ?
                                          <h1>not slot</h1>
                                          : getSlot?.map((tag) => {
                                                const isAppointment = checkSlotIsAppointmentId?.includes(tag.id);
                                                return (
                                                      <div
                                                            key={tag.id}
                                                            className="flex justify-center items-center my-2"
                                                      >
                                                            <TableBody className="flex">
                                                                  <TableCell className="">{tag.date}</TableCell>
                                                                  <TableCell>{tag.startDate}</TableCell>
                                                                  <TableCell>-</TableCell>
                                                                  <TableCell>{tag.endDate}</TableCell>
                                                            </TableBody>
                                                            <button
                                                                  onClick={() => {
                                                                        setEditSlot({
                                                                              startDate: tag.startDate,
                                                                              endDate: tag.endDate,
                                                                              date: tag.date,
                                                                              id: tag.id,
                                                                              doctorId,
                                                                        });
                                                                        setOpen(true);
                                                                  }}
                                                                  className={`rounded-[7px] ml-6 ${isAppointment ? "text-gray-300" : "text-blue-400"}`}
                                                                  disabled={isAppointment}
                                                            >
                                                                  <EditIcon />
                                                            </button>

                                                            <button
                                                                  onClick={() => {
                                                                        setRemoveSlot({ id: tag.id });
                                                                        setOpenRemove(true);
                                                                  }}
                                                                  className="w-6 h-6 ml-4"
                                                                  disabled={isAppointment}
                                                            >
                                                                  {isAppointment ?
                                                                        <SlotCheckIcon />
                                                                        : <DeleteIcon />}
                                                            </button>
                                                      </div>
                                                );
                                          })

                                    : !checkDate?.length ?
                                          <h1 className="text-xl text-red-400 flex justify-center items-center h-60">
                                                Not Slot
                                          </h1>
                                          : checkDate?.map((tag) => {
                                                const isAppointment = checkSlotIsAppointmentId?.includes(tag.id);
                                                return (
                                                      <div
                                                            key={tag.id}
                                                            className="flex justify-center items-center my-2"
                                                      >
                                                            <TableBody className="flex">
                                                                  <TableCell className="">{tag.date}</TableCell>
                                                                  <TableCell>{tag.startDate}</TableCell>
                                                                  <TableCell>-</TableCell>
                                                                  <TableCell>{tag.endDate}</TableCell>
                                                            </TableBody>
                                                            <button
                                                                  onClick={() => {
                                                                        setEditSlot({
                                                                              startDate: tag.startDate,
                                                                              endDate: tag.endDate,
                                                                              date: tag.date,
                                                                              id: tag.id,
                                                                              doctorId,
                                                                        });
                                                                        setOpen(true);
                                                                  }}
                                                                  className={`rounded-[7px] ml-6 ${isAppointment ? "text-gray-300" : "text-blue-400"}`}
                                                                  disabled={isAppointment}
                                                            >
                                                                  <EditIcon />
                                                            </button>
                                                            <button
                                                                  onClick={() => {
                                                                        setRemoveSlot({ id: tag.id });
                                                                        setOpenRemove(true);
                                                                  }}
                                                                  className="w-6 h-6 ml-4"
                                                                  disabled={isAppointment}
                                                            >
                                                                  {isAppointment ?
                                                                        <SlotCheckIcon />
                                                                        : <DeleteIcon />}
                                                            </button>
                                                      </div>
                                                );
                                          })
                              }
                        </ScrollArea>
                  </div>
                  {/* checkIsAppointmentThisSlot */}

                  <SlotEdit
                        slotEditDialogBoxOpen={open}
                        setSlotEditDialogBoxOpen={() => setOpen(false)}
                        data={editSlot}
                  />
                  <SlotRemove
                        open={openRemove}
                        setOpen={() => setOpenRemove(false)}
                        slotId={removeSlot?.id}
                  />
            </div>
      );
};

export default SlotCreate;
