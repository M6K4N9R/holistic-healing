import DefaultButton from "../DefaulButton/DefaultButton";
import styled from "styled-components";

export const StyledBox = styled.section`
  margin: 3rem auto;
  padding: 1rem;
  width: 97%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: var(--white);
  box-shadow: 0px 3px 8px var(--pastel);
  color: var(--dark);
  border-radius: 9px;
`;

export default function HealthChatInvite() {
  return (
    <StyledBox>
      <h2>Tell us how you feel</h2>
      <p className="px-3 text-center">
        Here you can fill in our health related questionaire and get suggestion
        on naturopathic treatments.
      </p>
      <DefaultButton />
    </StyledBox>
  );
}
