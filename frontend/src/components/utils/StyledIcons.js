import React from "react";
import { BiSliderAlt, BiLoader } from "react-icons/bi";
import { RiHomeLine, RiSearch2Line, RiBookmark2Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { VscLoading } from "react-icons/vsc";
import styled, { keyframes } from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

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

// REFRESH ICON
const LoadingAnimation = keyframes`
0% {
  opacity: 1;
  transform: rotate(0deg);
}

/* 25% {
  opacity: 1;
  transform: rotate(90deg);
}

75% {
  opacity: 1;
  transform: rotate(180deg);
} */

100% {
  opacity: 1;
  transform: rotate(360deg);
}
`;

const StyledLoaderIcon = () => {
  return <StyledLoader />;
};

const StyledLoader = styled(BiLoader)`
  width: 50px;
  height: 50px;
  color: var(--color-text);

  animation: ${LoadingAnimation} 2.5s linear;
  animation-iteration-count: infinite;
`;

// BACK ICON
const StyledBackIcon = () => {
  return <Back />;
};

const Back = styled(IoIosArrowBack)`
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
  StyledLoaderIcon,
  StyledBackIcon,
};
