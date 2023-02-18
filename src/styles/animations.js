import styled, { keyframes } from "styled-components";

export const AnimeDown = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0px, -30px, 0px);
  }
  to {
    opacity: 1;
    transform: translate3d(0px, 0px, 0px);
  }
`;

export const AnimeScale = keyframes`
  from {
    transform: scale(0.4);
  }
  to {
    transform: scale(1);
  }
`;
