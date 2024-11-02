import React from "react";
import styled from "styled-components";

const TimelineHeader = () => {
  return (
    <HeaderWrapper>
      <TitleWrapper>
        <MainTitle>Detailed Timeline</MainTitle>
        <Subtitle>Scheduled, Estimated, and Actual</Subtitle>
      </TitleWrapper>
      <ProBadge>Pro</ProBadge>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  display: flex;
  width: 100%;
  max-width: 394px;
  align-items: start;
  gap: 36px;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  display: flex;
  min-width: 240px;
  flex-direction: column;
  font-weight: 500;
  justify-content: start;
`;

const MainTitle = styled.h1`
  color: rgba(0, 0, 0, 1);
  font-size: 30px;
`;

const Subtitle = styled.p`
  color: rgba(157, 158, 171, 1);
  font-size: 20px;
  margin-top: 8px;
`;

const ProBadge = styled.span`
  width: 54px;
  border-radius: 6px;
  background-color: rgba(245, 234, 255, 1);
  font-size: 20px;
  color: rgba(99, 34, 158, 1);
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  padding: 2px;
  @media (max-width: 991px) {
    white-space: normal;
  }
`;

export default TimelineHeader;