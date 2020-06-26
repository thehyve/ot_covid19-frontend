import React from 'react';
import CheckCircleTwoTone from '@material-ui/icons/CheckCircleTwoTone';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import {
  colors,
  Link,
  List,
  ListItem,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import _ from 'lodash';

import ListTitle from '../components/Drawer/ListTitle';
import { naLabel, splitStringInBrackets } from '../utils';
import { mapSource } from './maps';
import { resolverUrl } from '../config';

export const renderLink = ({ url, prefix, accession, label = accession }) => {
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

  return naLabel;
};

export const renderArray = (
  array,
  link,
  onClickCellContent,
  contentTitle = '',
  contentDescription = ''
) => {
  if (!array || !array.length) return <>No entries</>;

  if (array.length <= 1)
    return link ? renderLink({ ...link, accession: array[0] }) : array[0];

  const contents = (
    <>
      <ListTitle
        title={contentTitle}
        description={contentDescription}
        length={array.length}
      />
      <List>
        {array.map((accession, i) => (
          <ListItem key={i}>{renderLink({ ...link, accession })}</ListItem>
        ))}
      </List>
    </>
  );

  const handleClickArrayLink = () => {
    onClickCellContent(contents);
  };

  return (
    <Link href="#" onClick={handleClickArrayLink}>
      {array.length} entries
    </Link>
  );
};

export const renderBooleanFillNa = (value) => renderBoolean(value || false);

export const renderBooleanLink = (value, link) => {
  console.log('link', link);
  return link
    ? renderLink({ ...link, label: renderBoolean(value) })
    : renderBoolean(value);
};

export const renderBoolean = (value) => {
  if (value === null) return <>{naLabel}</>;

  return value ? (
    <CheckCircleTwoTone style={{ color: colors.green[500] }} />
  ) : (
    <HighlightOffTwoToneIcon style={{ color: colors.deepOrange.A400 }} />
  );
};

export const renderDescription = (description) => {
  if (!description) return <>{naLabel}</>;

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

export const renderInvitroArrays = (
  entryGroups,
  link,
  onClickCellContent,
  contentTitle = '',
  contentDescription = '',
  entryCount
) => {
  if (!entryGroups) return <>{naLabel}</>;

  const contents = (
    <>
      <ListTitle
        title={contentTitle}
        description={contentDescription}
        length={entryCount}
      />

      {Object.keys(entryGroups).map((group, groupIndex) => {
        if (!entryGroups[group]) return null;

        return (
          <ExpansionPanel key={groupIndex} defaultExpanded={groupIndex <= 3}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <ListTitle
                title={_.capitalize(group)}
                length={entryGroups[group]?.length}
              />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <List>
                {entryGroups[group]?.map((entry, entryIndex) => (
                  <ListItem key={entryIndex}>
                    {renderLink({ ...link, accession: entry.compound })}
                  </ListItem>
                ))}
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
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
