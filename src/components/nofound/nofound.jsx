import ErrorNoFound from "../../assets/nofound.gif";

import "./nofound.css";
const NoFound = () => {
  return (
    <div className="flex justify-center my-28">
      <img className="" src={ErrorNoFound} alt="" />
    </div>
   
  )
}

export default NoFound
