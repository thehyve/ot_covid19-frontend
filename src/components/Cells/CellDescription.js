import React from 'react';
import { Link } from '@material-ui/core';

import NaLabel from './NaLabel';
import { mapSource } from '../../data/maps';
import { splitStringInBrackets } from '../../utils';

export const CellDescription = ({ description }) => {
  if (!description) return <NaLabel />;

  const [label, source] = splitStringInBrackets(description);
  const sourcePair = source?.split(';');
  const shortenedLabel = label.length > 32 ? `${label.slice(0, 32)}...` : label;

  if (sourcePair) {
    const sourceName = sourcePair[0].replace('Source:', '');
    const sourceAccession = sourcePair[1].replace('Acc:', '');
    const sourceLink = mapSource(sourceName, sourceAccession);

    return (
      <Link href={sourceLink} target="blank" title={label}>
        {shortenedLabel}
      </Link>
    );
  }

  return <span title={label}>{shortenedLabel}</span>;
};

export default CellDescription;
