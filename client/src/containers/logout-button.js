import React, { Fragment } from 'react';
import MenuItem from '../components/menu-item';
import { ReactComponent as ExitIcon } from '../assets/icons/exit.svg';

export default function LogoutButton() {
  return (
    <MenuItem to="/logout">
      <ExitIcon />
      Logout
    </MenuItem>
  );
}
