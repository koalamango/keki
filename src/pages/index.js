import React from 'react';
import Box from 'compositions/Box';
import ProductList from 'compositions/ProductList';
import Layout from 'compositions/Layout';

const Index = () => {
  return (
    <Layout>
      <Box>
        <ProductList />
      </Box>
    </Layout>
  );
};

export default Index;
