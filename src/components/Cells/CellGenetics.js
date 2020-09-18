import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { cellStyles } from './cellStyles';
import ListTitle from '../Drawer/ListTitle';
import NaLabel from './NaLabel';

export const CellGenetics = ({
  entries,
  onClickCellContent,
  contentTitle = '',
  contentDescription = '',
  renderAccordionDetails = () => null,
}) => {
  const classes = cellStyles();
  const count = entries?.length;

  if (!entries) return <NaLabel />;

  const contents = (
    <>
      <ListTitle
        title={contentTitle}
        description={contentDescription}
        subtitle={`${entries.length} entries`}
      />

      {entries.map((entry, entryIndex) => {
        return (
          <Accordion key={entryIndex} defaultExpanded={entryIndex < 1}>
            <AccordionSummary
              classes={{
                root: classes.accordionSummaryRoot,
                content: classes.accordionSummaryContent,
                expanded: classes.accordionSummaryExpanded,
              }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={classes.geneticsTitle}>
                {entry.Dataset}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>{renderAccordionDetails(entry)}</AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );

  const handleClickArrayLink = () => {
    onClickCellContent(contents);
  };

  return (
    <Link href="#" onClick={handleClickArrayLink}>
      {count} entr{`${count > 1 ? 'ies' : 'y'}`}
    </Link>
  );
};

export default CellGenetics;
