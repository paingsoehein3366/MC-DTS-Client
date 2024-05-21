import ErrorNoFound from "../../assets/nofound.jpg"

const NoFound = () => {
  return (
    <div className="flex justify-center my-28">
      <img className="w-[300px] h-[300px]" src={ErrorNoFound} alt="" />
    </div>
  )
}

export default NoFound
