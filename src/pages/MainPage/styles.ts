import styled, { StyledProps } from '../../config/styled-components';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';


export const PrimarySwitch = withStyles({
  switchBase: {
    color: "#DE4515",
    '&$checked': {
      color: "#1BCF8E",
    },
    '&$checked + $track': {
      backgroundColor: 'rgba(255, 253, 253, 0.37)'
    }
  },
  checked: {},
  track: {
    backgroundColor: "rgba(255, 253, 253, 0.37);"
  },
})(Switch);

export const SettingsButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: '#fff'
  },
  rootHovered: {
    color: '#fff',
    backgroundColor: 'transparent'
  },
  rootPressed: {
    color: '#fff',
    backgroundColor: 'transparent'
  }
};
type DetailSectionProps = StyledProps<{ direction: 'row' | 'column' }>;

export const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`;

export const MainHeaderContent = styled.h1`
  font-family: Ubuntu;
  font-size: 14px;
  line-height: 16px;
  color: #fff;
  font-weight: bold;
  margin-left: 20px;
`;

export const ControlGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 16px
`;

export const InputIndicatorSpan = styled.span`
  font-family: Space Mono;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #fff;
  margin: 5px;
`;

export const DetailSection = styled.div`
  display: flex;
  flex-direction: ${(props: DetailSectionProps) => props.direction };
  justify-content: flex-start;
  flex: 1;
  padding: 16px;
`;

export const DetailTextStrong = styled.b`
  font-family: Space Mono;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  color: #fff;
`;
export const DetailText = styled.p`
  font-family: Space Mono;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: #fff;
`;