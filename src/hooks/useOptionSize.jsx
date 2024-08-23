import { useEffect, useState } from "react";

const getOptionSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return 154;
  } else if (width < 1200) {
    return 168;
  } else {
    return 168;
  }
};

const useOptionSize = () => {
  const [optionSize, setOptionSize] = useState(getOptionSize());

  useEffect(() => {
    const handleResize = () => {
      setOptionSize(getOptionSize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return optionSize;
};

export default useOptionSize;
