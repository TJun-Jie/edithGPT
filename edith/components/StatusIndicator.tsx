import { StressLevelEnum } from "./CalendarItem";

export type StressIndicatorProps = {
  level: StressLevelEnum;
};

const StressIndicator: React.FC<StressIndicatorProps> = ({ level }) => {
  console.log(level);
  const getColor = () => {
    switch (level) {
      case StressLevelEnum.low:
        return "green";
      case StressLevelEnum.medium:
        return "yellow";
      case StressLevelEnum.high:
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div
      style={{ color: getColor() }}
      className={`tw-p-4 tw-rounded-full tw-w-14 tw-h-14 tw-flex tw-items-center tw-justify-center`}
    >
      <p className="tw-font-bold tw-text-lg tw-text-black">
        {level.toUpperCase()}
      </p>
    </div>
  );
};

export default StressIndicator;
