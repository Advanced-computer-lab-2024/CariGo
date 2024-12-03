import styled, { css } from "styled-components";
import { defaultTheme } from "./themes/default";
import { Link } from "react-router-dom";

// writing button stylings in normal css
const commonButtonStyles = css`
  font-family: inherit;
  min-width: 110px;
  height: 36px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  border: 1px solid transparent;
  text-transform: capitalize;
  padding-left: 12px;
  padding-right: 12px;
  transition: ${defaultTheme.default_transition};
  &:hover {
    transform: scale(0.97);
  }
`;

const BaseButton = styled.button`
  ${commonButtonStyles}
  color: ${defaultTheme.color_white};
`;

const BaseLink = styled(Link)`
  ${commonButtonStyles}
  color: ${defaultTheme.color_white};
`;

const BaseButtonGreen = styled(BaseButton)`
  background-color: ${defaultTheme.color_sea_green};
  border-color: ${defaultTheme.color_sea_green};
`;

const BaseButtonBlack = styled(BaseButton)`
  background-color: ${defaultTheme.color_black};
`;

const BaseButtonOuterspace = styled(BaseButton)`
  background-color: ${defaultTheme.color_outerspace};
`;

const BaseButtonWhitesmoke = styled(BaseButton)`
  color: ${defaultTheme.color_black};
  background-color: ${defaultTheme.color_whitesmoke};
`;

const BaseLinkGreen = styled(BaseLink)`
  background-color: ${defaultTheme.color_sea_green};
  border-color: ${defaultTheme.color_sea_green};
  background-color:  #126782; /* Primary color background */
  border:  #126782; /* Border matching primary color */
   /* Hover State */
  &:hover {
      }

  /* Active State */
  &:active {
    background-color: #126782; /* Active background color reverts to primary */
    color: #fff; /* Keep text color white on active */
    border-color: #126782; /* Active border color */
  }

  /* Disabled State */
  &:disabled {
    background-color: #f0f0f0; /* Light gray background when disabled */
    color: #c0c0c0; /* Light gray text when disabled */
    border-color: #dcdcdc; /* Light gray border when disabled */
    cursor: not-allowed; /* Change cursor to not-allowed when disabled */
  }
`;
const BaseLinkGreen1 = styled(BaseLink)`
  background-color: ${defaultTheme.color_sea_green};
  border-color: ${defaultTheme.color_sea_green};
  background-color: #ff4d4d; /* Primary color background */
  border: 2px solid #ff4d4d; /* Border matching primary color */
   /* Hover State */
  &:hover {
    background-color: #126782; /* Hover background using secondary color */
    color: #fff; /* Keep text color white on hover */
    border-color: #126782; /* Change border to secondary color on hover */
  }

  /* Active State */
  &:active {
    background-color: #126782; /* Active background color reverts to primary */
    color: #fff; /* Keep text color white on active */
    border-color: #126782; /* Active border color */
  }

  /* Disabled State */
  &:disabled {
    background-color: #f0f0f0; /* Light gray background when disabled */
    color: #c0c0c0; /* Light gray text when disabled */
    border-color: #dcdcdc; /* Light gray border when disabled */
    cursor: not-allowed; /* Change cursor to not-allowed when disabled */
  }
`;

const BaseLinkBlack = styled(BaseLink)`
  background-color: ${defaultTheme.color_black};
`;

const BaseLinkWhite = styled(BaseLink)`
  color: ${defaultTheme.color_black};
  background-color: ${defaultTheme.color_white};
`;

const BaseLinkOutlineDark = styled(BaseLink)`
  color: ${defaultTheme.color_black};
  border-color: ${defaultTheme.color_black};
`;

const BaseLinkOutlineWhite = styled(BaseLink)`
  color: ${defaultTheme.color_white};
  border-color: ${defaultTheme.color_white};

  &:hover {
    background-color: ${defaultTheme.color_white};
    color: ${defaultTheme.color_outerspace};
  }
`;

const BaseLinkOutlinePlatinum = styled(BaseLink)`
  color: ${defaultTheme.color_black};
  border-color: ${defaultTheme.color_platinum};
`;

export {
  BaseButton,
  BaseLink,
  BaseButtonGreen,
  BaseButtonBlack,
  BaseButtonOuterspace,
  BaseButtonWhitesmoke,
  BaseLinkGreen,
  BaseLinkGreen1,
  BaseLinkBlack,
  BaseLinkWhite,
  BaseLinkOutlineDark,
  BaseLinkOutlineWhite,
  BaseLinkOutlinePlatinum,
};
