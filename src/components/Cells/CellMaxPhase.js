import React from 'react';

import NaLabel from './NaLabel';
import { mapMaxPhase } from '../../data/maps';

function CellMaxPhase({ value }) {
  if (!value) return <NaLabel center />;

  return mapMaxPhase(value);
}

export default CellMaxPhase;
