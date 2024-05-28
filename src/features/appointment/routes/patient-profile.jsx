import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
} from "@/components/ui/dialog";
import ProfileIcon from "../components/profile-icon";

export function PatientProfile({ open, setOpen, patientData }) {
      const style = "flex justify-between w-fit mb-3";
      const valueStyle = "text-gray-500 ml-2";
      return (
            <Dialog open={open} onOpenChange={setOpen}>
                  <DialogContent className="sm:max-w-[425px] bg-[#fff] border">
                        <DialogHeader>
                              <DialogTitle className="mb-5 text-gray-600">Appointment Detail</DialogTitle>
                              <div className='sm:max-w-[425px] bg-gray-600 h-[1px]'></div>
                              <div className="flex">
                                    <ProfileIcon />
                                    <p className="mt-9 ml-3">{patientData?.name}</p>
                              </div>
                              <div className="flex justify-between pxz-3">
                                    <div>
                                          <div className={style}>
                                                <span>Age:</span>
                                                <span className={valueStyle}>{patientData?.age} year old</span>
                                          </div>
                                          <div className={style}>
                                                <span>Gender:</span>
                                                <span className={valueStyle}>{patientData?.gender}</span>
                                          </div>
                                          <div className={style}>
                                                <span>Date:</span>
                                                <span className={valueStyle}>{patientData?.date}</span>
                                          </div>
                                    </div>
                                    <div>
                                          <div className={style}>
                                                <span>Time:</span>
                                                <span className={valueStyle}>{patientData?.startDate} : {patientData?.endDate}</span>
                                          </div>
                                          <div className={style}>
                                                <span>Fees:</span>
                                                <span className={valueStyle}>$2500</span>
                                          </div>
                                    </div>
                              </div>
                        </DialogHeader>
                  </DialogContent>
            </Dialog>
      )
};
