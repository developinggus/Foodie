import React from 'react';
import { SvgXml } from 'react-native-svg';
import Icons from '../assets/index';

export default props => {
  const { name, size } = props;
  return <SvgXml xml={Icons[name]} {...size} />;
};
