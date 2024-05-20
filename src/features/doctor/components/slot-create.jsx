import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useState } from 'react';
import { slotCreateValidate } from '../schema/slot-create-schema';
import SlotEdit from './slot-edit';
import { useSlotCreate } from '../api/create-slot-api';
import { queryClient } from '@/lib/react-query';

const SlotCreate = ({ slots, doctorId }) => {
      const [dateAndTimeData, setDateAndTimeData] = useState({ date: "", startTime: "", endTime: "" });
      console.log("dateAndTimeDat: ", dateAndTimeData);
      const [searchSlot, setSearchSlot] = useState('');
      const [open, setOpen] = useState(false);
      const [showDatePicker, setShowDatePicker] = useState('hidden');
      const [addButtonStyle, setAddButtonStyle] = useState({ justify: 'end', marginLeft: 6 });

      const useSlotCreateMutation = useSlotCreate();

      const startHour = parseInt(dateAndTimeData.startTime);
      const startMinute = dateAndTimeData.startTime.split(':')[1];
      const endHour = parseInt(dateAndTimeData.endTime);
      const endMinute = dateAndTimeData.endTime.split(':')[1];

      // choose day decide
      const today = new Date().toISOString().split('T')[0];
      const twoWeek = new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0];


      // Get Slot
      const getSlot = slots?.map(item => {
            const getStartHours = new Date(item.start_date).getHours();
            const getStartMinutes = new Date(item.start_date).getMinutes();

            const getEndHours = new Date(item.end_date).getHours();
            const getEndMinutes = new Date(item.end_date).getMinutes();

            const getDate = new Date(item.end_date).toISOString().substring(0, 10);

            return {
                  startDate: (getStartHours < 10 ? '0' + getStartHours.toString() : getStartHours)
                        + ':' +
                        (getStartMinutes < 10 ? '0' + getStartMinutes.toString() : getStartMinutes),

                  endDate: (getEndHours < 10 ? '0' + getEndHours.toString() : getEndHours)
                        + ':' +
                        (getEndMinutes < 10 ? '0' + getEndMinutes.toString() : getEndMinutes),

                  date: getDate.split('-')[0] + '-' + getDate.split('-')[1] + '-' + (Number(getDate.split('-')[2])),
                  id: item._id
            }
      });
      console.log("Iso", getSlot);
      // Check Date
      const checkDate = getSlot?.filter(item => searchSlot.includes(item.date));
      console.log("checkDate: ", checkDate);

      // Add Slot
      const AddSlot = () => {
            if (showDatePicker === 'inline' && !dateAndTimeData.date && !dateAndTimeData.startTime) {
                  setShowDatePicker('hidden');
                  setAddButtonStyle({ justify: "end", marginLeft: 6 });
            } else {
                  setShowDatePicker('inline');
                  setAddButtonStyle({ justify: 'around', marginLeft: 0 })
            };
            const { message, key } = slotCreateValidate(dateAndTimeData);
            console.log("message: ", message, ", key: ", key);
            const setHourStartTime = new Date(dateAndTimeData.date).setHours(startHour, startMinute)
            console.log("setHourStartTime: ", setHourStartTime);
            const start_date = new Date(setHourStartTime).toISOString();
            const setHourEndTime = new Date(dateAndTimeData.date).setHours(endHour, endMinute);
            const end_date = new Date(setHourEndTime).toISOString();
            const slotData = { start_date, end_date, doctor: doctorId }
            console.log("slotDate: ", slotData);
            useSlotCreateMutation.mutate(slotData, {
                  onSuccess: () => {
                        queryClient.invalidateQueries({
                              queryKey: ['slots']
                        })
                        console.log("success");
                  },
                  onError: (err) => {
                        console.log("slot create error:", err.message);
                  }
            })

      };
      return (
            <div>
                  <div className={`flex justify-${addButtonStyle.justify} mt-4 mr-${addButtonStyle.marginLeft} `}>
                        <input
                              min={today}
                              max={twoWeek}
                              type="date"
                              className={`border p-2  rounded-[7px] ${showDatePicker}`}
                              onChange={e => setDateAndTimeData({ ...dateAndTimeData, date: e.target.value })}
                        />
                        <div>
                              <input
                                    type="time"
                                    className={`border p-2  rounded-[7px] ${showDatePicker}`}
                                    onChange={e => setDateAndTimeData({ ...dateAndTimeData, startTime: e.target.value })}
                              />
                              <input
                                    type="time"
                                    className={`border p-2  rounded-[7px] mx-2 ${showDatePicker}`}
                                    onChange={e => setDateAndTimeData({ ...dateAndTimeData, endTime: e.target.value })}
                              />
                              <button onClick={AddSlot} className='p-2 px-5 border rounded-[7px] bg-blue-500 text-white'>Add Slot</button>
                        </div>
                  </div>
                  <div className='flex justify-around mt-5 '>
                        <button className='border p-2  rounded-[7px] mr-3 h-11 w-11'>All</button>
                        <input
                              min={today}
                              max={twoWeek}
                              onChange={(e) => setSearchSlot(e.target.value)}
                              type="date" className='border p-2  rounded-[7px] mr-3 h-11'
                        />
                        <ScrollArea className="h-72 w-[50%] border p-3 px-4 rounded-[7px]">
                              {!checkDate?.length ? <h1 className='flex justify-center items-center h-72'>No Slot</h1>
                                    : checkDate?.map((tag) => (
                                          <div key={tag.id} className='flex justify-center items-center my-2'>
                                                <div className='flex'>
                                                      <p>{tag.startDate}</p>
                                                      <p className='mx-4'>-</p>
                                                      <p>{tag.endDate}</p>
                                                </div>
                                                <button
                                                      onClick={() => {

                                                            setOpen(true);
                                                      }}
                                                      className='px-3 py-2  rounded-[7px] bg-green-500 text-white ml-6'
                                                >Edit</button>
                                          </div>
                                    ))}
                        </ScrollArea>
                  </div>
                  <SlotEdit slotEditDialogBoxOpen={open} setSlotEditDialogBoxOpen={() => setOpen(false)} data={dateAndTimeData} />
            </div>
      )
}

export default SlotCreate