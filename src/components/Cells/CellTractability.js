import React from 'react';
import { Box, Link, Typography } from '@material-ui/core';
import { darken } from 'polished';

import ListTitle from '../Drawer/ListTitle';
import NaLabel from './NaLabel';
import CellQuality from './CellQuality';

export const CellTractability = ({
  buckets,
  selectedBucket,
  colorScale,
  onClickCellContent,
  contentTitle,
  contentDescription,
}) => {
  if (selectedBucket === null) return <NaLabel />;

  const description = (
    <span>
      Name of the highest <strong>{contentDescription}</strong> tractability
      bucket. More information about{' '}
      <Link
        href="https://docs.targetvalidation.org/getting-started/target-tractability"
        target="blank"
      >
        target tractability
      </Link>
      .
    </span>
  );

  const contents = (
    <>
      <ListTitle title={contentTitle} description={description} />
      {buckets.map((bucket, i) => {
        const boxShadow =
          selectedBucket === i + 1
            ? `inset 0px 0px 0px 3px ${darken(0.33, colorScale[i])}`
            : 'none';
        const border = `1px solid ${darken(0.33, colorScale[i])}`;

        return (
          <Box
            key={i}
            style={{
              backgroundColor: colorScale[i],
              border,
              boxShadow,
              margin: '.25rem',
              padding: '.25rem',
            }}
          >
            <Typography variant="subtitle2">Bucket {i + 1}</Typography>
            <Box style={{ lineHeight: 0 }}>
              <Typography variant="caption" style={{ lineHeight: 1.25 }}>
                {bucket}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </>
  );

  const handleClickArrayLink = () => {
    onClickCellContent(contents);
  };

  return (
    <CellQuality
      value={selectedBucket}
      colorScale={colorScale}
      onClick={handleClickArrayLink}
    />
  );
};

export default CellTractability;
