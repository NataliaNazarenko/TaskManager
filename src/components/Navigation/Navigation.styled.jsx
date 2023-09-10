import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const Link = styled(NavLink)`
  display: inline-block;
  text-decoration: none;
  padding: 12px;
  font-weight: 500;
  color: ${props => props.theme.colors.dark};
  font-size: 18px;

  &:hover {
    color: #ffffff;
  }
`;
