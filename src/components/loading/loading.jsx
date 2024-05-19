import LoadingImage from "../../assets/loading.svg";

const Loading = () => {
	return (
		<div className="flex justify-center my-20">
			<img src={LoadingImage} alt="" className="w-[90px] h-[90px]" />
		</div>
	);
};

export default Loading;
