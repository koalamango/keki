import * as React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { StaticQuery } from 'gatsby'; // mocked

import NotFound from './404';

beforeEach(() => {
  StaticQuery.mockImplementationOnce(({ render }) =>
    render({
      site: {
        siteMetadata: {
          title: `GatsbyJS`,
          headerLinks: [
            {
              name: `Name1`,
              link: `/link1`,
            },
            {
              name: `Name2`,
              link: `/link2`,
            },
          ],
          footerLinks: [
            {
              name: `Name1`,
              link: `/link1`,
            },
            {
              name: `Name2`,
              link: `/link2`,
            },
          ],
        },
      },
    })
  );
});

describe(`404`, () => {
  it(`contains NOT FOUND text`, () => {
    const { getByText } = render(<NotFound />);
    console.log(getByText);
    const el = getByText(`NOT FOUND`);

    expect(el).toBeInTheDocument();
  });
});
