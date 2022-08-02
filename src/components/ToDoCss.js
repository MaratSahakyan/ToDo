import styled from "styled-components";

export const ToDoContainer = styled.div`
  width: 600px;
  background-color: #f5f5f5;
  min-height: 300px;
  padding: 10px 20px;
  border-radius: 10px;
`;

export const ToDoItemsContainer = styled.div`
  width: 100%;
  min-height: 200px;
  padding-top: 20px;
  margin-bottom: 50px;
`;

export const ListStyle = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px 5px 0;
  border-radius: 30px;
  font-family: "Roboto";
  font-size: 22px;
  box-shadow: ${(props) => (props.dragStyle ? "0 0 .4rem #666" : "none")};
  margin-bottom: 15px;

  &:hover {
    background-color: #fff;
  }
`;

export const CeckBoxItemContainer = styled.div`
  display: flex;
  align-items: center;

  width: 90%;
`;


export const ToDoHeaderContainer = styled.div`
  width: 100%;
  height: 60px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderDateContainer = styled.div`
  width: 185px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TitleSelectedDay = styled.h3`
  font-family: "Roboto";
  font-weight: 700;
  font-size: 30px;
`;

export const UpDownContainer = styled.div`
  width: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CreateToDoContainer = styled.div`
  display: flex;
  justify-content: center;
 flex-direction: column;
  padding: 8px;
`;

export const InputField = styled.input`
  border: none;
  background-color: #f5f5f5;
  padding: 5px;
  width: 100%;

  &::placeholder {
    font-size: 15px;
  }
`;