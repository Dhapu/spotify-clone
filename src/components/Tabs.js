// src/components/Tabs.js
import React, { useState } from 'react';
import styled from 'styled-components';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('For You');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <TabsContainer>
      <TabItem 
        isActive={activeTab === 'For You'}
        onClick={() => handleTabClick('For You')}
      >
        For You
      </TabItem>
      <TabItem 
        isActive={activeTab === 'Top Tracks'}
        onClick={() => handleTabClick('Top Tracks')}
      >
        Top Tracks
      </TabItem>
    </TabsContainer>
  );
};

const TabsContainer = styled.div`
  display: flex;
  gap: 15px;
  padding: 20px;
  margin-bottom: -20px;
`;

const TabItem = styled.div`
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  color: ${({ isActive }) => (isActive ? 'white' : '#999')};
  

  &:hover {
    background: ${({ isActive }) => (isActive ? '#333' : '#ddd')};
  }
`;

export default Tabs;
