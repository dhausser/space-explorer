import React from "react";
import styled from "react-emotion";
import { useApolloClient } from "@apollo/client";

import { menuItemClassName } from "../components/menu-item";
import { ReactComponent as ExitIcon } from "../assets/icons/exit.svg";

const LogoutButton = () => {
  const client = useApolloClient();
  return (
    <StyledButton
      data-testid="logout-button"
      onClick={() => {
        // @ts-expect-error
        client.writeData({ data: { isLoggedIn: false } });
        localStorage.clear();
      }}
    >
      <ExitIcon />
      Logout
    </StyledButton>
  );
};

export default LogoutButton;

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const StyledButton = styled("button")(menuItemClassName, {
  background: "none",
  border: "none",
  padding: 0,
});
