import React from 'react';
import { Tooltip as MUITooltip } from '@material-ui/core';

import { tableStyles } from './tableStyles';

function Tooltip({ children, title }) {
  const classes = tableStyles();

  return (
    <MUITooltip
      arrow
      classes={{
        tooltip: classes.tooltip,
        arrow: classes.tooltipArrow,
      }}
      interactive
      title={title}
    >
      {children}
    </MUITooltip>
  );
}

export default Tooltip;
