// import ErrorNoFound from "../../assets/nofound.jpg";
import "./nofound.css";
const NoFound = () => {
  return (
    // <div className="flex justify-center my-28">
    //   <img className="w-[300px] h-[300px]" src={ErrorNoFound} alt="" />
    // </div>
    <>
      <div className="error">404</div>
      <br /><br />
      <span className="info">File not found</span>
      <img src="http://images2.layoutsparks.com/1/160030/too-much-tv-static.gif" class="static" />
    </>
  )
}

export default NoFound
