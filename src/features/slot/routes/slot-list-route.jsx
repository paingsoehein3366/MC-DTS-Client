import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import SlotUpdate from "./update-slot-route";
import { TableBody, TableCell } from "@/components/ui/table";
import EditIcon from "./../components/edit-icon";
import DeleteIcon from "@/features/appointment/components/delete-icon";
import SlotDelete from "./delete-slot-route";
import { useEffect } from "react";
import { useGetAllAppointments } from "@/features/appointment/api/appointment-get-api";
import SlotCheckIcon from "./../components/slot-check-icon";
import { useGetSlotDoctor } from "../api/get-slot-doctor-api";

const SlotListRoute = ({ doctorId }) => {
      const [editSlot, setEditSlot] = useState({});
      const [removeSlot, setRemoveSlot] = useState({});
      const [allSlots, setAllSlots] = useState([]);
      const [searchSlot, setSearchSlot] = useState("");
      const [open, setOpen] = useState(false);
      const [openRemove, setOpenRemove] = useState(false);
      const [showDatePicker, setShowDatePicker] = useState("hidden");

      const { data: slots } = useGetSlotDoctor(doctorId);

      const { data: appointments } = useGetAllAppointments();

      // choose day decide
      const today = new Date().toISOString().split("T")[0];
      const twoWeek = new Date(new Date().setDate(new Date().getDate() + 13))
            .toISOString()
            .split("T")[0];

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
      // Check Date
      const checkDate = getSlot?.filter((item) => searchSlot?.includes(item.date));

      // All Slots
      const AllSlots = () => {
            setSearchSlot("");
            setAllSlots(getSlot);
      };

      return (
            <div>
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

                  </div>
                  <ScrollArea className="h-72 w-[100%] border p-3 px-4 rounded-[7px] mt-3">
                        {allSlots?.length ?
                              !allSlots?.length ?
                                    <h1>not slot</h1>
                                    : getSlot?.map((tag) => {
                                          const isAppointment = checkSlotIsAppointmentId?.includes(
                                                tag.id,
                                          );
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
                  <SlotUpdate
                        slotEditDialogBoxOpen={open}
                        setSlotEditDialogBoxOpen={() => setOpen(false)}
                        data={editSlot}
                  />
                  <SlotDelete
                        open={openRemove}
                        setOpen={() => setOpenRemove(false)}
                        slotId={removeSlot?.id}
                  />
            </div>
      )
}

export default SlotListRoute
