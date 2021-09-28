import React from "react";
import { BiSliderAlt } from "react-icons/bi";
import { RiHomeLine, RiSearch2Line, RiBookmark2Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import styled from "styled-components";

// SLIDER ICON
const StyledSliderIcon = () => {
  return <Slider />;
};

const Slider = styled(BiSliderAlt)`
  height: var(--icon-size);
  width: var(--icon-size);
  max-width: 40px;
  max-height: 40px;
`;

// HOME ICON
const StyledHomeIcon = () => {
  return <Home />;
};

const Home = styled(RiHomeLine)`
  height: var(--icon-size);
  width: var(--icon-size);
  max-width: 30px;
  max-height: 30px;
`;

// SEARCH ICON
const StyledSearchIcon = () => {
  return <Search />;
};

const Search = styled(RiSearch2Line)`
  height: var(--icon-size);
  width: var(--icon-size);
  max-width: 30px;
  max-height: 30px;
`;

// BOOKMARK ICON
const StyledBookMarkIcon = () => {
  return <BookMark />;
};

const BookMark = styled(RiBookmark2Line)`
  height: var(--icon-size);
  width: var(--icon-size);
  max-width: 30px;
  max-height: 30px;
`;

// PROFILE ICON
const StyledProfileIcon = () => {
  return <Profile />;
};

const Profile = styled(CgProfile)`
  height: var(--icon-size);
  width: var(--icon-size);
  max-width: 30px;
  max-height: 30px;
`;

export {
  StyledSliderIcon,
  StyledHomeIcon,
  StyledSearchIcon,
  StyledBookMarkIcon,
  StyledProfileIcon,
};
