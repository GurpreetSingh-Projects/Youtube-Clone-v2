import { Skeleton } from "@mui/material";
const VidSkeleton = () => {
  return (
    <div className="d-flex flex-wrap">
      <div className="skeletonWrapper col-12 col-md-4 bg-gray">
        <Skeleton variant="rectangular" sx={{ height: 180, margin: 1 }} />
        <div className="d-flex mt-3 ">
          <Skeleton
            className="me-3"
            variant="circular"
            sx={{ width: 50, height: 50 }}
          />
          <div className="">
            <Skeleton
              className="mb-2"
              variant="rectangular"
              sx={{ height: 25 }}
            />
            <Skeleton variant="rectangular" sx={{ width: 270, height: 15 }} />
          </div>
        </div>
      </div>
      <div className="skeletonWrapper col-12 col-md-4 bg-gray">
        <Skeleton variant="rectangular" sx={{ height: 180, margin: 1 }} />
        <div className="d-flex mt-3 ">
          <Skeleton
            className="me-3"
            variant="circular"
            sx={{ width: 50, height: 50 }}
          />
          <div className="">
            <Skeleton
              className="mb-2"
              variant="rectangular"
              sx={{ height: 25 }}
            />
            <Skeleton variant="rectangular" sx={{ width: 270, height: 15 }} />
          </div>
        </div>
      </div>
      <div className="skeletonWrapper col-12 col-md-4 bg-gray">
        <Skeleton variant="rectangular" sx={{ height: 180, margin: 1 }} />
        <div className="d-flex mt-3 ">
          <Skeleton
            className="me-3"
            variant="circular"
            sx={{ width: 50, height: 50 }}
          />
          <div className="">
            <Skeleton
              className="mb-2"
              variant="rectangular"
              sx={{ height: 25 }}
            />
            <Skeleton variant="rectangular" sx={{ width: 270, height: 15 }} />
          </div>
        </div>
      </div>
      <div className="skeletonWrapper col-12 col-md-4 bg-gray">
        <Skeleton variant="rectangular" sx={{ height: 180, margin: 1 }} />
        <div className="d-flex mt-3 ">
          <Skeleton
            className="me-3"
            variant="circular"
            sx={{ width: 50, height: 50 }}
          />
          <div className="">
            <Skeleton
              className="mb-2"
              variant="rectangular"
              sx={{ height: 25 }}
            />
            <Skeleton variant="rectangular" sx={{ width: 270, height: 15 }} />
          </div>
        </div>
      </div>
      <div className="skeletonWrapper col-12 col-md-4 bg-gray">
        <Skeleton variant="rectangular" sx={{ height: 180, margin: 1 }} />
        <div className="d-flex mt-3 ">
          <Skeleton
            className="me-3"
            variant="circular"
            sx={{ width: 50, height: 50 }}
          />
          <div className="">
            <Skeleton
              className="mb-2"
              variant="rectangular"
              sx={{ height: 25 }}
            />
            <Skeleton variant="rectangular" sx={{ width: 270, height: 15 }} />
          </div>
        </div>
      </div>
      <div className="skeletonWrapper col-12 col-md-4 bg-gray">
        <Skeleton variant="rectangular" sx={{ height: 180, margin: 1 }} />
        <div className="d-flex mt-3 ">
          <Skeleton
            className="me-3"
            variant="circular"
            sx={{ width: 50, height: 50 }}
          />
          <div className="">
            <Skeleton
              className="mb-2"
              variant="rectangular"
              sx={{ height: 25 }}
            />
            <Skeleton variant="rectangular" sx={{ width: 270, height: 15 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VidSkeleton;
