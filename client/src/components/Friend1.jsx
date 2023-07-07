
import { Box, Typography, useTheme } from "@mui/material";

import { useNavigate } from "react-router-dom";

import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath   }) => {
 
  const navigate = useNavigate();
 


  const { palette } = useTheme();

  const main = palette.neutral.main;
  const medium = palette.neutral.medium;


  

  
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      
    </FlexBetween>
  );
  
};

export default Friend;
