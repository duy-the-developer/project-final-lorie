import React from "react";
import { BiSliderAlt, BiLoader } from "react-icons/bi";
import {
  RiHomeLine,
  RiSearch2Line,
  RiBookmark2Line,
  RiEdit2Fill,
  RiMailOpenLine,
} from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import styled, { keyframes } from "styled-components";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";

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

// FORWARD ICON
const StyledForwardIcon = () => {
  return <Forward />;
};

const Forward = styled(IoIosArrowForward)`
  height: var(--icon-size);
  width: var(--icon-size);
  max-width: 30px;
  max-height: 30px;
`;

// DELETE ICON
const StyledDeleteIcon = () => {
  return <Delete />;
};

const Delete = styled(IoMdClose)`
  height: var(--icon-size);
  width: var(--icon-size);
  max-width: 30px;
  max-height: 30px;
  color: tomato;
`;

// EDIT ICON
const StyledEditIcon = () => {
  return <Edit />;
};

const Edit = styled(RiEdit2Fill)`
  height: var(--icon-size);
  width: var(--icon-size);
  max-width: 30px;
  max-height: 30px;
`;

// MAIL ICON
const StyledMailIcon = () => {
  return <Mail />;
};

const Mail = styled(RiMailOpenLine)`
  height: var(--icon-size);
  width: var(--icon-size);
  max-width: 40px;
  max-height: 40px;
`;

export {
  StyledSliderIcon,
  StyledHomeIcon,
  StyledSearchIcon,
  StyledBookMarkIcon,
  StyledProfileIcon,
  StyledLoaderIcon,
  StyledBackIcon,
  StyledDeleteIcon,
  StyledEditIcon,
  StyledMailIcon,
  StyledForwardIcon,
};
