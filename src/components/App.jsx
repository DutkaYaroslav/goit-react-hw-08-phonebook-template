import { formToJSON } from 'axios';
import { useEffect, useContext, useState } from 'react';
import Layout from './Layout/Layout';
import AllRoutes from './navigation/routes/Routes';
import { Context } from './store/Context';

export const App = () => {
  const context = useContext(Context);
  const { isRefreshed } = useContext(Context);

  useEffect(() => {
    console.log(context.isRefreshed);
    context.refresh();
  }, []);

  return (
    <div className="App">
      {isRefreshed ? (
        'fetching user data'
      ) : (
        <>
          <Layout />
          <AllRoutes />
        </>
      )}
    </div>
  );
};
