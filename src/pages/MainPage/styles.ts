import styled from '../../config/styled-components';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';


export const PrimarySwitch = withStyles({
  switchBase: {
    color: "#1BCF8E",
    '&$checked': {
      color: "#1BCF8E",
    },
    '&$checked + $track': {
      backgroundColor: "#DCD6D6",
    },
  },
  checked: {},
  track: {},
})(Switch);

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 330px;
  height: 240px;
`;

export const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid rgba(199, 195, 195, 0.25);
`;

export const MainHeaderContent = styled.h1`
  font-family: Segoe UI;
  font-size: 18px;
  line-height: 21px;
  color: #17C4EA;
  margin-left: 20px;
  font-weight: bold;
`;

export const ControlGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 16px
`;

export const InputIndicatorSpan = styled.span`
  font-family: Segoe UI;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
  color: #A59393;
  margin: 5px;
`;

export const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  padding: 16px;
`;

export const DetailText = styled.p`
  font-family: Segoe UI;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: #635C5C;
`;