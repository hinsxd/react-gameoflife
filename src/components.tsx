import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Grid = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Cell = styled.div<{ alive: boolean }>`
  flex: 0 0 9px;
  height: 9px;
  border: 1px solid #353535;
  background: ${p => (p.alive ? `rgb(102, 255, 51)` : '#000')};
`;

export const MenuWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MenuItem = styled.div`
  flex: 0;
  width: 300px;
  padding: 8px;
  margin: 3px;
  background: rgb(102, 255, 51);
  color: black;
  text-align: center;
`;
