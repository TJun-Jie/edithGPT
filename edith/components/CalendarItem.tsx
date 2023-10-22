import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  stressLevel?: StressLevelEnum;
}

export enum StressLevelEnum {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface PastCalendarEvent extends CalendarEvent {
  stressLevel?: StressLevelEnum;
}

export default function PopperPopupState({ event }: { event: CalendarEvent }) {
  const getColor = (stressLevel: StressLevelEnum) => {
    if (stressLevel === StressLevelEnum.high) {
      return <SentimentVeryDissatisfiedIcon style={{ color: "red" }} />;
    } else if (stressLevel === StressLevelEnum.medium) {
      return <SentimentNeutralIcon style={{ color: "yellow" }} />;
    } else {
      return <TagFacesIcon style={{ color: "lightgreen" }} />;
    }
  };
  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <Button
            sx={{ width: "100px" }}
            variant="contained"
            {...bindToggle(popupState)}
          >
            <div
              style={{ fontSize: "10px" }}
              className=" tw-truncate tw-w-[100px]"
            >
              {event.stressLevel ? (
                <div>
                  <div>{event.title} </div>
                  <div>{getColor(event.stressLevel)}</div>
                </div>
              ) : (
                <div>{event.title} </div>
              )}
            </div>
          </Button>
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper
                  elevation={3}
                  style={{
                    padding: "16px",
                    borderRadius: "8px",
                    width: "300px",
                  }}
                >
                  <Box display="flex" alignItems="center" marginBottom={2}>
                    <DescriptionIcon
                      color="primary"
                      style={{ marginRight: "8px" }}
                    />
                    <Typography variant="body1">{event.description}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <LocationOnIcon
                      color="secondary"
                      style={{ marginRight: "8px" }}
                    />
                    <Typography variant="subtitle1" color="textSecondary">
                      {event.location}
                    </Typography>
                  </Box>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
}
