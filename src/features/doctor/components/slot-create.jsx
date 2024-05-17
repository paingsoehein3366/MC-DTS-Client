import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useState } from 'react';
import { slotCreateValidate } from '../schema/slot-create-schema';
import SlotEdit from './slot-edit';

const SlotCreate = () => {
      const [dateAndTimeData, setDateAndTimeData] = useState({ date: "", startTime: "", endTime: "" });
      const [open, setOpen] = useState(false);
      const [showDatePicker, setShowDatePicker] = useState('hidden');
      const [addButtonStyle, setAddButtonStyle] = useState({ justify: 'end', marginLeft: 6 });
      const slot = [1, 2, 3, 4, 5, 6, 7, 8];
      const datePickShow = () => {
            if (showDatePicker === 'inline' && !dateAndTimeData.date && !dateAndTimeData.startTime) {
                  setShowDatePicker('hidden');
                  setAddButtonStyle({ justify: "end", marginLeft: 6 });
            } else {
                  setShowDatePicker('inline');
                  setAddButtonStyle({ justify: 'around', marginLeft: 0 })
            }
            const { message, key } = slotCreateValidate(dateAndTimeData)
            console.log("message: ", message, ", key: ", key);
            console.log("dateAndTimeData: ", dateAndTimeData);
      }
      return (
            <div>
                  <div className={`flex justify-${addButtonStyle.justify} mt-4 mr-${addButtonStyle.marginLeft}`}>
                        <input
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
                              <button onClick={datePickShow} className='p-2 px-5 border rounded-[7px] bg-blue-500 text-white'>Add Slot</button>
                        </div>
                  </div>
                  <div className='flex justify-around mt-5 '>
                        <input type="date" className='border p-2  rounded-[7px] mr-3 h-11' />
                        <ScrollArea className="h-72 w-[50%] border p-3 px-4 rounded-[7px]">
                              {slot.map((tag) => (
                                    <>
                                          <div key={tag} className='flex justify-center items-center my-2'>
                                                <div className='flex'>
                                                      <p>10:00AM</p>
                                                      <p className='mx-4'>-</p>
                                                      <p>12:00PM</p>
                                                </div>
                                                <button onClick={() => setOpen(true)} className='px-3 py-2  rounded-[7px] bg-green-500 text-white ml-6'>Edit</button>
                                          </div>
                                    </>
                              ))}
                        </ScrollArea>
                  </div>
                  <SlotEdit slotEditDialogBoxOpen={open} setSlotEditDialogBoxOpen={() => setOpen(false)} data={dateAndTimeData} />
            </div>
      )
}

export default SlotCreate