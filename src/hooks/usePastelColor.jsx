import { COLORS } from "../constants/colors";
import { PASTEL_COLORS } from "../constants/pastelColors";

export const getPastelColor = (color) => {
  switch (color) {
    case COLORS[1]:
      return PASTEL_COLORS[1]; // purple
      break;
    case COLORS[2]:
      return PASTEL_COLORS[2]; // blue
      break;
    case COLORS[3]:
      return PASTEL_COLORS[3]; // green
      break;
    default:
      return PASTEL_COLORS[0]; // beige
      break;
  }
};
