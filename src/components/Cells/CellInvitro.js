import React from 'react';
import _ from 'lodash';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ListTitle from '../Drawer/ListTitle';
import NaLabel from './NaLabel';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  Link,
} from '@material-ui/core';
import CellLink from './CellLink';
import { prepareInvitroCovidActivity } from '../../data/maps';

export const CellInvitro = ({
  entries,
  link,
  onClickCellContent,
  contentTitle = '',
  contentDescription = '',
}) => {
  if (!entries) return <NaLabel />;

  const entryGroups = prepareInvitroCovidActivity(entries);
  const entryCount = entries.split(';').length;

  const contents = (
    <>
      <ListTitle
        title={contentTitle}
        description={contentDescription}
        subtitle={`${entryCount} entries`}
      />

      {Object.keys(entryGroups).map((group, groupIndex) => {
        if (!entryGroups[group]) return null;

        return (
          <Accordion key={groupIndex} defaultExpanded={groupIndex <= 3}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <ListTitle
                title={_.capitalize(group)}
                subtitle={`${entryGroups[group]?.length} entries`}
              />
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {entryGroups[group]?.map((entry, entryIndex) => (
                  <ListItem key={entryIndex}>
                    <CellLink {...link} accession={entry.compound} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
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
      {entryCount} entries
    </Link>
  );
};

export default CellInvitro;
