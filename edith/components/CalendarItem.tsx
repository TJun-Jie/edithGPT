import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
}
export default function PopperPopupState({ event }: { event: CalendarEvent }) {
  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <Button variant="contained" {...bindToggle(popupState)}>
            {event.title}
          </Button>
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper
                  elevation={3}
                  style={{ padding: "16px", borderRadius: "8px" }}
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
