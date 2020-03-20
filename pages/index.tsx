import { GetStaticProps } from "next";
import Head from "next/head";

import {
  getCompaniesWithMetaData,
  getResourcesWithMetaData
} from "../utils/fetch";
import ResourcesGrid from "../components/ResourcesGrid";
import { getCompoundedString, getUniqueTags } from "../utils/string";
import { CompanyWithMetaData, ResourceWithMetaData } from "../utils/types";

type Props = {
  companies: CompanyWithMetaData[];
  resources: ResourceWithMetaData[];
};

const IndexPage = ({ companies, resources }: Props) => {
  const tags = getUniqueTags(resources);
  const tagsString = getCompoundedString(tags);

  return (
    <>
      <Head>
        <title>
          The Remote Work Library | A curated list of remote work resources
        </title>

        <meta
          name="description"
          content={`A curated list of ${tagsString} about remote work, for digital nomads, remote feelancers, remote workers, remote teams or those interested in working and collaborating remotely.`}
        />

        <link rel="canonical" href="https://theremoteworklibrary.com" />
      </Head>

      <ResourcesGrid companies={companies} resources={resources} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const companies: CompanyWithMetaData[] = await getCompaniesWithMetaData();
  const resources: ResourceWithMetaData[] = await getResourcesWithMetaData();

  return {
    props: {
      companies,
      resources
    }
  };
};

export default IndexPage;
