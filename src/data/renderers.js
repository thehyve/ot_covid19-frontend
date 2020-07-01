import React from 'react';
import {
  colors,
  Link,
  List,
  ListItem,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Box,
  Typography,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import CheckCircleTwoTone from '@material-ui/icons/CheckCircleTwoTone';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import WarningTwoToneIcon from '@material-ui/icons/WarningTwoTone';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs, faFlask } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { darken } from 'polished';

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

export const renderSafetyHas = (value) =>
  value ? <WarningTwoToneIcon style={{ color: colors.yellow[800] }} /> : null;

export const renderSafetySource = (value, accession) => {
  const etPresent = value?.includes('experimental_toxicity');
  const tsPresent = value?.includes('known_target_safety');

  const etColor = etPresent ? '#3489ca' : colors.grey[200];
  const tsColor = tsPresent ? '#3489ca' : colors.grey[200];

  const IconWrapper = ({ title, children, present }) =>
    present ? (
      <Tooltip title={title}>
        <Link
          href={`https://alpha.targetvalidation.org/target/${accession}`}
          target="blank"
        >
          {children}
        </Link>
      </Tooltip>
    ) : (
      <>{children}</>
    );

  return (
    <Box display="flex" justifyContent="space-evenly">
      <IconWrapper
        title="Non-clinical experimental toxicity"
        present={etPresent}
      >
        <Box>
          <FontAwesomeIcon
            style={{
              fontSize: '1.25rem',
              color: etColor,
            }}
            icon={faFlask}
          />
        </Box>
      </IconWrapper>

      <IconWrapper title="Target safety effects" present={tsPresent}>
        <Box>
          <FontAwesomeIcon
            style={{
              fontSize: '1.25rem',
              color: tsColor,
            }}
            icon={faCrosshairs}
          />
        </Box>
      </IconWrapper>
    </Box>
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

export const renderTractabilityTopBucket = (
  buckets,
  colorScale,
  onClickCellContent,
  selectedBucket,
  contentTitle,
  contentDescription
) => {
  const contents = (
    <>
      <ListTitle title={contentTitle} description={contentDescription} />
      {buckets.map((bucket, i) => {
        const borderWidth = selectedBucket === i + 1 ? '4px' : '1px';
        const border = `${borderWidth} solid ${darken(0.33, colorScale[i])}`;

        return (
          <Box
            key={i}
            style={{
              backgroundColor: colorScale[i],
              border,
              margin: '.25rem',
              padding: '.25rem',
            }}
          >
            <Typography variant="subtitle2">Bucket {i + 1}</Typography>
            <Box style={{ lineHeight: 0 }}>
              <Typography variant="caption" style={{ lineHeight: 1.25 }}>
                {bucket}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </>
  );

  const handleClickArrayLink = () => {
    onClickCellContent(contents);
  };

  const backgroundColor =
    selectedBucket === naLabel
      ? colorScale[colorScale.length - 1]
      : colorScale[selectedBucket - 1] || '#fff';

  const border = `2px solid ${darken(0.33, backgroundColor)}`;

  return (
    <Link href="#" onClick={handleClickArrayLink}>
      <Box
        style={{
          backgroundColor,
          border,
          borderRadius: '25px',
          padding: '0 .25rem',
          margin: 'auto',
          width: '3rem',
        }}
      >
        {selectedBucket}
      </Box>
    </Link>
  );
};
