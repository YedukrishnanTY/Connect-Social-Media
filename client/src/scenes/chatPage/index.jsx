import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import ChatWidget from "scenes/widgets/ChatWidget";

const ChatPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box
        flex="1"
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
      <Box flexBasis={isNonMobileScreens ? "26%" : undefined} display={isNonMobileScreens ? "block" : "none"}>
        <UserWidget userId={_id} picturePath={picturePath} />
      </Box>
        <Box
          flexBasis={isNonMobileScreens ? "100%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <ChatWidget userId={_id} picturePath={picturePath} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatPage;
