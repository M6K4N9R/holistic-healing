import { Box } from "@mui/material";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

export default function HealthChatInvite() {
  return (
    <Box
      height={200}
      width={400}
      my={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: "2px solid grey", borderRadius: "9px" }}
    >
      <h2>Tell us how you feel</h2>
      <p>
        Here you can fill in our health related questionaire and get suggestion
        on naturopathic treatments
      </p>
      <Button variant="contained">Start questionaire</Button>
    </Box>
  );
}
