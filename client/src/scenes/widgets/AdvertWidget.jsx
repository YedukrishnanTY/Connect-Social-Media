import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/project.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Yedu Krishnan</Typography>
        <a href="https://yedu.is-a.dev" target="blank" style={{ textDecoration: "none" }}>   <Typography  color={medium}>yedu.is-a.dev</Typography> </a>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
      "Discover the world through my code: Join me on a journey of learning, exploring, and creating!"
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
