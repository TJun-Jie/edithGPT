import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <div className="tw-h-screen  tw-flex tw-flex-col tw-gap-5 tw-w-[500px] tw-ml-auto tw-mr-auto">
      <Typography variant="h5">Monthly Stress Analytics</Typography>
      <div className="tw-flex tw-flex-row">
        <div className="tw-flex tw-flex-col tw-ml-5">
          <Typography variant="h6">August</Typography>
          <Typography variant="body1">16</Typography>
        </div>
        <div className="tw-flex tw-flex-col tw-ml-5">
          <Typography variant="h6">September</Typography>
          <Typography variant="body1">10</Typography>
        </div>
        <div className="tw-flex tw-flex-col tw-ml-5">
          <Typography variant="h6">October</Typography>
          <Typography variant="body1">12</Typography>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
