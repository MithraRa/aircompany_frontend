import React, { useEffect } from 'react';

interface ISuccessPage {
  success: boolean
}

const SuccessPage: React.FC<ISuccessPage> = ({ success }) => {
  const state = success ? "Успешно :)" : "Неуспешно :(";

  useEffect(() => {
    document.title = state;
  }, []);

  return <h2>{state}</h2>
};

export default SuccessPage;