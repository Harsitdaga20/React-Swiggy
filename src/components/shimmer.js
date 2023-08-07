import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ShimmerComponent = () => {
  return (
    <div className="card">
      <Skeleton width={200} height={100} />
      <h2>
        <Skeleton />
      </h2>
      <h3>
        <Skeleton />
      </h3>
      <h4>
        <Skeleton />
      </h4>
    </div>
  );
};
export default ShimmerComponent;
