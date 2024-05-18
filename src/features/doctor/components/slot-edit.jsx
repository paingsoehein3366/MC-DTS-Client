import { Dialog, DialogContent } from '@/components/ui/dialog'
import React from 'react'

const SlotEdit = ({ slotEditDialogBoxOpen, setSlotEditDialogBoxOpen, data }) => {
      return (
            <Dialog open={slotEditDialogBoxOpen} onOpenChange={setSlotEditDialogBoxOpen}>
                  <DialogContent className="bg-white">
                        <div className='flex justify-center my-5'>
                              <input className={`border p-2  rounded-[7px] mx-2`} type="time" defaultValue={data.startTime} />
                              <input className={`border p-2  rounded-[7px] mx-2`} type="time" defaultValue={data.endTime} />
                              <button className='p-2 px-5 border rounded-[7px] bg-green-500 text-white'>done</button>
                        </div>
                  </DialogContent>
            </Dialog>
      )
}

export default SlotEdit