import React from 'react';
import { Link } from '@material-ui/core';

import NaLabel from './NaLabel';
import { resolverUrl } from '../../config';

function CellLink({ url, prefix, accession, label = accession }) {
  if (url)
    return (
      <Link
        href={url.replace('$$', accession?.replace(/ /g, '+') || '')}
        target="blank"
      >
        {label}
      </Link>
    );

  if (accession)
    return (
      <Link href={`${resolverUrl}/${prefix}:${accession}`} target="blank">
        {label}
      </Link>
    );

  return <NaLabel />;
}

export default CellLink;
