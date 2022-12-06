import React from 'react';

import convertNumber from "../../helpers/numberConvertor"
import {currencies} from "../../utils/currencies";

interface IMoney {
  value?: number;
}

const Money: React.FC<IMoney> = (props : IMoney) => {
  const value = props.value ? props.value : 0;
  const amount: string = convertNumber(value);
  return (
    <span>{amount} {currencies.RUB}</span>
  );
};

export default Money;
