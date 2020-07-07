import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScroll } from '@fortawesome/free-solid-svg-icons';

import CellLink from './CellLink';
import { naLabel } from '../../utils';

function CellLiterature({ value, ensemblId }) {
  if (!value) return <>{naLabel}</>;

  return (
    <>
      <FontAwesomeIcon icon={faScroll} />{' '}
      <CellLink
        url="https://www.targetvalidation.org/evidence/$$/MONDO_0100096?view=sec:literature"
        accession={ensemblId}
        label={value || naLabel}
      />
    </>
  );
}

export default CellLiterature;
