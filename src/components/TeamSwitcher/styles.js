import styled from 'styled-components';

export const Container = styled.aside`
  background: #202225;
  padding: 20px 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const TeamList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Team = styled.button`
  border: 0;
  background: transparent;
  margin: 0 0 8px;

  img {
    transition: all 0.2s;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }

  &:hover img {
    border-radius: 30%;
  }
`;

export const NewTeam = styled.button`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 1px dashed rgba(255, 255, 255, 0.3);
  margin: 0 0 8px;
  background: transparent;
  color: rgba(255, 255, 255, 0.3);
  font-weight: bold;
  transition: all 0.2s;

  i {
    font-size: 25px;
    color: #43b581;
  }

  &:hover {
    border-color: #43b581;
    background: #43b581;
    border-radius: 30%;

    i {
      color: #fff;
    }
  }
`;

export const Logout = styled.button`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 1px dashed rgba(255, 255, 255, 0.3);
  color: #a43d3d;
  background: transparent;
  font-weight: bold;
  transition: all 0.2s;

  i {
    font-size: 25px;
  }

  &:hover {
    border-color: #e04848;
    background: #e04848;
    border-radius: 30%;

    i {
      color: #fff;
    }
  }
`;
