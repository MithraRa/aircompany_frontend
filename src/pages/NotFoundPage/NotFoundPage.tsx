import React, { useEffect } from 'react';

interface INotFoundPage {}

const NotFoundPage: React.FC<INotFoundPage> = () => {
  useEffect(() => {
    document.title = 'Упс...';
  }, []);

  return <h2>Упс... Похоже вы забрели не туда :)</h2>
};

export default NotFoundPage;