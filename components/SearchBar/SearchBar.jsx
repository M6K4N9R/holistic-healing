import { StyledButton } from "../DefaulButton/DefaultButton";
import styled from "styled-components";

const StyledBox = styled.section`
  margin: 3rem auto 1rem auto;
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

export default function SearchBar() {
  return (
    <StyledBox>
      <label htmlFor="email" className="self-start text-base font-semibold">
        Search for symptoms
      </label>
      <input
        type="search"
        id="site-search"
        name="q"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      />
      <StyledButton>Search</StyledButton>
    </StyledBox>
  );
}
