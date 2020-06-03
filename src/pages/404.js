import React from 'react';
import Box from '@components/Box';
import Layout from '@components/Layout';

const NotFound = () => (
  <Layout>
    <h1 data-testid="not-found">NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export default NotFound;
