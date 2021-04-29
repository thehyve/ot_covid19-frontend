import React from 'react';

import CellLink from './CellLink';
import NaLabel from './NaLabel';

function CellLiterature({ value, ensemblId }) {
  if (!value) return <NaLabel center />;

  return (
    <CellLink
      url="https://platform.opentargets.org/evidence/$$/MONDO_0100096"
      accession={ensemblId}
      label={value}
    />
  );
}

export default CellLiterature;
