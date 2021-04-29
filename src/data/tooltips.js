import React from 'react';
import { Link } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs, faFlask } from '@fortawesome/free-solid-svg-icons';

import { CellRegulationUnit } from '../components/Cells/CellRegulation';

const classes = {
  safetyIcon: {
    fontSize: '1.25rem',
  },
  tooltipUl: {
    margin: 0,
    padding: '0 1.5rem',
    maxHeight: '10rem',
    overflowY: 'auto',
  },
};

export const speciesTooltip = (
  <span>
    Target origin species
    <hr />
    <strong>Options:</strong>
    <ul style={classes.tooltipUl}>
      <li>Human</li>
      <li>SARS-CoV-1</li>
      <li>SARS-CoV-2</li>
    </ul>
  </span>
);

export const geneBiotypeTooltip = (
  <span>
    Gene biotype
    <hr />
    <strong>Options:</strong>
    <ul style={classes.tooltipUl}>
      <li>lncRNA</li>
      <li>unprocessed_pseudogene</li>
      <li>protein_coding</li>
      <li>processed_pseudogene</li>
      <li>snRNA</li>
      <li>misc_RNA</li>
      <li>transcribed_unitary_pseudogene</li>
      <li>miRNA</li>
      <li>snoRNA</li>
      <li>rRNA_pseudogene</li>
      <li>transcribed_unprocessed_pseudogene</li>
      <li>TR_J_gene</li>
      <li>TEC</li>
      <li>IG_V_gene</li>
      <li>LRG_gene</li>
      <li>IG_V_pseudogene</li>
      <li>transcribed_processed_pseudogene</li>
      <li>translated_processed_pseudogene</li>
      <li>scaRNA</li>
      <li>IG_J_gene</li>
      <li>TR_V_gene</li>
      <li>polymorphic_pseudogene</li>
      <li>IG_J_pseudogene</li>
      <li>unitary_pseudogene</li>
      <li>rRNA</li>
      <li>TR_V_pseudogene</li>
      <li>IG_D_gene</li>
      <li>TR_D_gene</li>
      <li>pseudogene</li>
      <li>IG_C_pseudogene</li>
      <li>Mt_tRNA</li>
      <li>IG_C_gene</li>
      <li>scRNA</li>
      <li>TR_J_pseudogene</li>
      <li>ribozyme</li>
      <li>TR_C_gene</li>
      <li>sRNA</li>
      <li>translated_unprocessed_pseudogene</li>
      <li>IG_pseudogene</li>
      <li>vaultRNA</li>
      <li>Mt_rRNA</li>
    </ul>
  </span>
);

export const uniprotCovidTooltip = (
  <span>
    Whether or not the target was included in the{' '}
    <Link href="https://covid-19.uniprot.org" target="blank">
      COVID-19 Uniprot website
    </Link>
    .
  </span>
);

export const covidLiteratureTooltip = (
  <span>
    Number of papers mentioning the target and COVID-19 in the same sentence.
    <hr />
    <strong>Source:</strong>{' '}
    <Link href="https://platform.opentargets.org/" target="blank">
      Open Targets
    </Link>
    .
  </span>
);

export const directInteractionsTooltip = (
  <span>
    <strong>Direct interaction: </strong>Target directly interacts with a viral
    protein.
    <hr />
    <strong>Source:</strong>{' '}
    <Link href="https://www.ebi.ac.uk/intact/" target="blank">
      IntAct Molecular Interaction Database
    </Link>
    .
  </span>
);

export const indirectInteractionsTooltip = (
  <span>
    <strong>Indirect interaction: </strong>Target interacts with one of the
    targets from the <i>Direct</i> column.
    <hr />
    <strong>Source:</strong>{' '}
    <Link href="https://www.ebi.ac.uk/intact/" target="blank">
      IntAct Molecular Interaction Database
    </Link>
    .
  </span>
);

export const implicatedInViralInfectionTooltip = (
  <span>
    <strong>Implicated in viral infection: </strong>Target does not interact
    with a CoV-SARS-X protein but interacts with another virus.
    <hr />
    <strong>Source:</strong>{' '}
    <Link href="https://www.ebi.ac.uk/intact/" target="blank">
      IntAct Molecular Interaction Database
    </Link>
    .
  </span>
);

export const maxPhaseTooltip = (
  <span>
    Max phase for any drug targeting this gene/protein for any indication.
    <hr />
    <strong>Source:</strong>{' '}
    <Link href="https://www.ebi.ac.uk/chembl/" target="blank">
      ChEMBL Bioactive Molecule Database
    </Link>
    .
  </span>
);

export const drugsInClinicTooltip = (
  <span>
    <strong>Drugs in Clinical Trial: </strong>Total number of drugs in clinical
    trials for a given target.
    <hr />
    <strong>Source:</strong>{' '}
    <Link href="https://www.ebi.ac.uk/chembl/" target="blank">
      ChEMBL Bioactive Molecule Database
    </Link>
    .
  </span>
);

export const drugsInCovidTrialsTooltip = (
  <span>
    <strong>Drugs in COVID-19 Clinical Trials: </strong>List of drugs whose
    mechanism of action is to modulate the given targets in clinical trials for
    COVID-19.
    <hr />
    <strong>Source:</strong>{' '}
    <Link href="https://www.ebi.ac.uk/chembl/" target="blank">
      ChEMBL Bioactive Molecule Database
    </Link>
    .
  </span>
);

export const hasInvitroCovidActivityTooltip = (
  <span>
    <strong>In-vitro COVID-19 activity: </strong>Rate of assays where the
    compounds modulating given target have been active against COVID-19 compared
    to all assays that have tested compounds modulating it.
    <hr />
    <strong>Source:</strong>{' '}
    <Link href="https://www.ebi.ac.uk/chembl/" target="blank">
      ChEMBL Bioactive Molecule Database
    </Link>
    .
  </span>
);

export const invitroCovidActivityTooltip = (
  <span>
    <strong>In-vitro COVID-19 compound list: </strong>Compounds modulating given
    target that have been tested in in-vitro assays and whether they were active
    or not.
    <hr />
    <strong>Source:</strong>{' '}
    <Link href="https://www.ebi.ac.uk/chembl/" target="blank">
      ChEMBL Bioactive Molecule Database
    </Link>
    .
  </span>
);

export const MR_fieldTooltip = (
  <span>
    <strong>Mendelian Randomisation: </strong>Estimates represent association of
    genetically predicted higher levels of protein with risk of COVID-19
    disease. Only those with MR <i>p</i>-value &lt; 0.05 are tabulated. The
    genetic instruments were selected based on the following parameters:
    <ul className={classes.tooltipUl}>
      <li>
        <strong>
          <i>cis</i>-window:{' '}
        </strong>
        &plusmn;1 Mbp of transcription start site of respective genes encoding
        the protein.
      </li>
      <li>
        <strong>
          r<sup>2</sup>
        </strong>{' '}
        &le; 0.05
      </li>
      <li>
        <strong>
          <i>p</i>
        </strong>{' '}
        &lt; 1 &times; 10<sup>-5</sup>
      </li>
    </ul>
    <hr />
    <strong>Source for protein GWAS: </strong>
    <Link
      href="https://www.nature.com/articles/s41586-018-0175-2"
      target="blank"
    >
      Sun et al
    </Link>
    .
    <br />
    <strong>Source for COVID-19 GWAS: </strong>
    <Link href="https://www.covid19hg.org/results/" target="blank">
      COVID-19 HGI
    </Link>
    .
    <br />
    <strong>Source of MR method: </strong>
    <Link href="https://cnsgenomics.com/software/gcta/#GSMR" target="blank">
      GSMR
    </Link>
    .
  </span>
);
export const colocalisationTooltip = (
  <span>
    <strong>Colocalisation: </strong>Analysis shows the posterior probability
    that the genetic associations of protein and COVID-19 outcome share the same
    candidate causal variant.
    <hr />
    <strong>Source:</strong> Colocalisation analyses were done using the{' '}
    <Link href="https://github.com/jrs95/hyprcoloc" target="blank">
      hyprcoloc R package
    </Link>
    .
  </span>
);

export const subcellularLocationTooltip = (
  <span>
    Predicted location of the target in the cell.
    <hr />
    <strong>Source:</strong>{' '}
    <Link href="https://www.proteinatlas.org/" target="blank">
      The Human Protein Atlas
    </Link>
    .
  </span>
);

export const rnaTissueDistributionTooltip = (
  <span>
    Expression distribution in different tissues.
    <hr />
    <strong>Options:</strong>
    <br />
    <ul style={classes.tooltipUl}>
      <li>Detected in all</li>
      <li>Detected in many</li>
      <li>Detected in some</li>
      <li>Detected in single</li>
      <li>Not detected</li>
    </ul>
    <hr />
    <strong>Source:</strong>{' '}
    <Link href="https://www.proteinatlas.org/" target="blank">
      The Human Protein Atlas
    </Link>
    .
  </span>
);

export const rnaTissueSpecifityTooltip = (
  <span>
    Expression specificity in different tissues.
    <hr />
    <strong>Options:</strong>
    <br />
    <ul style={classes.tooltipUl}>
      <li>Tissue enriched</li>
      <li>Tissue enhanced</li>
      <li>Group enriched</li>
      <li>Low tissue specificity</li>
      <li>Not detected</li>
    </ul>
    <hr />
    <strong>Source:</strong>{' '}
    <Link href="https://www.proteinatlas.org/" target="blank">
      The Human Protein Atlas
    </Link>
    .
  </span>
);

export const rnaSpecificTissuesTooltip = (
  <span>
    List of tissues if target expression has some degree of specificity.
    <hr />
    <strong>Source:</strong>{' '}
    <Link href="https://www.proteinatlas.org/" target="blank">
      The Human Protein Atlas
    </Link>
    .
  </span>
);

export const abundanceRegOnCovidTooltip = (
  <span>
    If protein abundance of the target is significantly altered during COVID-19
    infection; this column shows the time point in which the alteration has been
    identified, and the direction of regulation.
    <hr />
    <strong>Time point options are:</strong>
    <br />
    <CellRegulationUnit direction="none" time="2h" />
    <CellRegulationUnit direction="none" time="6h" />
    <CellRegulationUnit direction="none" time="10h" />
    <CellRegulationUnit direction="none" time="24h" />
    <strong>Direction options are:</strong>
    <br />
    <CellRegulationUnit direction="up" time="Up" />
    <CellRegulationUnit direction="down" time="Down" />
    <hr />
    <strong>Source:</strong>{' '}
    <Link
      href="https://www.nature.com/articles/s41586-020-2332-7"
      target="blank"
    >
      Bojkova, D. et al. Proteomics of SARS-CoV-2-infected host cells reveals
      therapy targets
    </Link>
    .
  </span>
);

export const respiratorySystemTissuesTooltip = (
  <span>
    List of tissues from the respiratory system where the target is expressed.
    <hr />
    <strong>Source:</strong>{' '}
    <Link href="https://www.ebi.ac.uk/gxa/home" target="blank">
      Expression Atlas
    </Link>
    .
  </span>
);

export const immuneSystemTissuesTooltip = (
  <span>
    List of tissues from the immune system where the target is expressed.
    <hr />
    <strong>Source:</strong>{' '}
    <Link href="https://www.ebi.ac.uk/gxa/home" target="blank">
      Expression Atlas
    </Link>
    .
  </span>
);

export const tractabilityBucketSMTooltip = (
  <span>
    Highest <i>small molecule</i> tractability bucket. See sidebar for details.
    <hr />
    <strong>Source:</strong>{' '}
    <Link
      href="https://platform-docs.opentargets.org/target/tractability"
      target="blank"
    >
      Open Targets
    </Link>
    .
  </span>
);

export const tractabilityBucketABTooltip = (
  <span>
    Highest <i>antibody</i> tractability bucket. See sidebar for details.
    <hr />
    <strong>Source:</strong>{' '}
    <Link
      href="https://platform-docs.opentargets.org/target/tractability"
      target="blank"
    >
      Open Targets
    </Link>
    .
  </span>
);

export const tractabilityBucketOtherTooltip = (
  <span>
    Highest <i>other modalities</i> tractability bucket. See sidebar for
    details.
    <hr />
    <strong>Source:</strong>{' '}
    <Link
      href="https://platform-docs.opentargets.org/target/tractability"
      target="blank"
    >
      Open Targets
    </Link>
    .
  </span>
);

export const hasSafetyRiskTooltip = (
  <span>
    Whether or not there is any safety risk information for the target.
    <hr />
    <strong>Source:</strong>{' '}
    <Link
      href="https://platform-docs.opentargets.org/target/safety"
      target="blank"
    >
      Open Targets target safety assessment
    </Link>
    .
  </span>
);

export const safetyInfoSourceTooltip = (
  <span>
    Source of the safety risk info.
    <hr />
    <strong>Options:</strong>
    <br />
    <table>
      <tbody>
        <tr>
          <td style={{ textAlign: 'center' }}>
            <FontAwesomeIcon
              style={classes.safetyIcon}
              color="#3489ca"
              icon={faCrosshairs}
            />
          </td>
          <td>Known target safety (Literature, HeCaTos)</td>
        </tr>
        <tr>
          <td style={{ textAlign: 'center' }}>
            <FontAwesomeIcon
              color="#3489ca"
              style={classes.safetyIcon}
              icon={faFlask}
            />
          </td>
          <td>Experimental toxicity (eTox, TOX21)</td>
        </tr>
      </tbody>
    </table>
    <hr />
    <strong>Source:</strong>{' '}
    <Link href="https://platform.opentargets.org" target="blank">
      Open Targets
    </Link>
    .
  </span>
);

export const safetyOrgansSystemsAffectedTooltip = (
  <span>
    List of organs where there are known safety risks for the target.
    <hr />
    <strong>Source:</strong>{' '}
    <Link href="https://platform.opentargets.org" target="blank">
      Open Targets
    </Link>
    .
  </span>
);
