import { useState, useEffect } from "react";
import { COLORS } from "../constants/colors";
import { PASTEL_COLORS } from "../constants/pastelColors";

function usePastelColor(color) {
  const [pastelColor, setPastelColor] = useState(PASTEL_COLORS[0]);

  useEffect(() => {
    switch (color) {
      case COLORS[1]:
        setPastelColor(PASTEL_COLORS[1]); // purple
        break;
      case COLORS[2]:
        setPastelColor(PASTEL_COLORS[2]); // blue
        break;
      case COLORS[3]:
        setPastelColor(PASTEL_COLORS[3]); // green
        break;
      default:
        setPastelColor(PASTEL_COLORS[0]); // beige
        break;
    }
  }, [color]);

  return pastelColor;
}

export default usePastelColor;
