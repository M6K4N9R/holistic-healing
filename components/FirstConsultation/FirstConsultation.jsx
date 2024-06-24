import { StyledBox } from "../SearchBar/SearchBar";
import { StyledButton } from "../DefaulButton/DefaultButton";

export default function HealthChatInvite() {
  return (
    <StyledBox>
      <h2>Tell us how you feel</h2>
      <p className="px-3 text-center">
        Here you can fill in our health related questionaire and get suggestion
        on naturopathic treatments.
      </p>
      <StyledButton>Start Chat</StyledButton>
    </StyledBox>
  );
}
