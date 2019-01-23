import styled from "styled-components";
import { Tabs, Tab } from "react-bootstrap";

export const Wrapper = styled.div`
  width: 100%;
`;

export const Logout = styled.button`
  margin: 0 10px;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em;
`;

export const StyledTabs = styled(Tabs)`
  max-width: 500px;
  text-align: center;
`;

export const StyledTab = styled(Tab)`
  padding: 1em;
  border-bottom: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
`;

export const MessageWrapper = styled.div`
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const From = styled.div`
  background: #23527c;
  color: white;
  padding: 0.5em 2em;
  text-align: right;
`;

export const Message = styled.div`
  text-align: left;
  background: #b1cee9;
  padding: 0.35em 2em;
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 5px 10px;
  margin: 5px;
  resize: vertical;
`;
