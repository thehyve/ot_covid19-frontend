import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';

import CellLink from './CellLink';
import NaLabel from './NaLabel';

function CellLiterature({ value, ensemblId }) {
  if (!value) return <NaLabel center />;

  return (
    <>
      <FontAwesomeIcon icon={faFileAlt} />{' '}
      <CellLink
        url="https://www.targetvalidation.org/evidence/$$/MONDO_0100096?view=sec:literature"
        accession={ensemblId}
        label={value}
      />
    </>
  );
}

export default CellLiterature;
