import React from 'react';
import styled from 'styled-components';
import { FaSpotify, FaUser } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <SidebarContainer>
      <TopIcon>
        <FaSpotify size={30} />
        <h2>Spotify</h2>

      </TopIcon>
      
      <BottomIcon>
        <FaUser size={20} />
      </BottomIcon>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
 white-space: nowrap; 
 justify-content: space-between;
  height: 100%;
`;

const TopIcon = styled.div`
  display: flex;
  margin-bottom: auto;

  h2 {
    margin-top: 0px;
    padding-left: 10px;
  }
`;


const BottomIcon = styled.div`
  margin-bottom: 20px;
  border-radius: 50%;
  background: #333;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Sidebar;