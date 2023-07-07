import {
  ChatBubbleOutlineOutlined,
  DeleteOutlined,
  
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend1";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";


const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  createdAt,
  onDelete,
}) => {
  const [isComments, setIsComments] = useState(false);

  const likeCount = Object.keys(likes).length;
  const Time = new Date(createdAt);
  const date = Time.toLocaleDateString();
  const time = Time.toLocaleTimeString();

  const { palette } = useTheme();
  const main = palette.neutral.main;

  const handleDeleteClick = () => {
    onDelete(postId);
    setTimeout(() => {
      window.location.reload();
    }, 1000); // reload after 1 second (adjust as needed)
  };
  


  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <p style={{ position: "flex", textAlign: "right" }}>
        {" "}
        {date} {time}
      </p>
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <Typography> Likes : {likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1rem">
          <IconButton onClick={handleDeleteClick}>
            <DeleteOutlined />
          </IconButton>
         
        </FlexBetween>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
