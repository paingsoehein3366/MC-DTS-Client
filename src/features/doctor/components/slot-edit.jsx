import UpdateIcon from '@/components/icons/update-icon';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { queryClient } from '@/lib/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useUpdateSlot } from '../api/update-slot-api';

const SlotEdit = ({ slotEditDialogBoxOpen, setSlotEditDialogBoxOpen, data }) => {
      const [updateSlotData, setUpdateSlotData] = useState({});
      const useUpdateMutation = useUpdateSlot();
      const inputStyle = 'border p-2   rounded-[7px] mx-2 focus:outline-none focus:border-blue-500';
      const today = new Date().toISOString().split('T')[0];
      const twoWeek = new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0];
      const updateSlot = async () => {
            console.log("id: ", data.id, ", data: ", updateSlotData);
            if (!updateSlotData.date) {
                  updateSlotData.date = data.date;
            } if (!updateSlotData.startDate) {
                  updateSlotData.startDate = data.startDate;
            } if (!updateSlotData.endDate) {
                  updateSlotData.endDate = data.endDate;
            }
            const startHour = parseInt(updateSlotData.startDate);
            const startMinute = updateSlotData.startDate.split(':')[1];
            const endHour = parseInt(updateSlotData.endDate);
            const endMinute = updateSlotData.endDate.split(':')[1];
            const startDate = new Date(new Date(updateSlotData.date).setHours(startHour, startMinute)).toISOString();
            const endDate = new Date(new Date(updateSlotData.date).setHours(endHour, endMinute)).toISOString();
            useUpdateMutation.mutate({ id: data.id, data: { start_date: startDate, end_date: endDate, doctor: data?.doctorId } }, {
                  onSuccess: () => {
                        queryClient.invalidateQueries({
                              queryKey: ['slots']
                        })
                        setUpdateSlotData({});
                        setSlotEditDialogBoxOpen();
                        toast.success('Slot updat success!');
                  },
                  onError: (err) => {
                        console.log("Error: ", err.message);
                  }
            })
      };
      return (
            <Dialog open={slotEditDialogBoxOpen} onOpenChange={setSlotEditDialogBoxOpen}>
                  <DialogContent className="bg-white">
                        <h1 className='flex justify-center text-xl text-gray-600'>Update Slot</h1>
                        <div className='flex justify-center my-5'>
                              <input
                                    min={today}
                                    max={twoWeek}
                                    className={inputStyle}
                                    onChange={(e) => setUpdateSlotData({ ...updateSlotData, date: e.target.value })}
                                    type="date"
                                    defaultValue={data.date}
                              />
                              <input className={inputStyle} onChange={(e) => setUpdateSlotData({ ...updateSlotData, startDate: e.target.value })} type="time" defaultValue={data.startDate} />
                              <input className={inputStyle} onChange={(e) => setUpdateSlotData({ ...updateSlotData, endDate: e.target.value })} type="time" defaultValue={data.endDate} />
                              <button
                                    onClick={updateSlot}
                                    className='text-white bg-blue-400 border w-11 flex justify-center items-center rounded-xl border-blue-400 hover:text-blue-400 hover:bg-white'
                              >
                                    <UpdateIcon />
                              </button>
                        </div>
                  </DialogContent>
            </Dialog>
      )
}

export default SlotEdit