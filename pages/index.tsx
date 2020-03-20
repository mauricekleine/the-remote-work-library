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
  coronaResources: ResourceWithMetaData[];
  resources: ResourceWithMetaData[];
};

const IndexPage = ({ companies, coronaResources, resources }: Props) => {
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

      <h1 className="text-xl font-bold my-6">
        Remote work resources related to the coronavirus
      </h1>

      <ResourcesGrid companies={companies} resources={coronaResources} />

      <p className="text-xl font-bold my-8">Other resources</p>

      <ResourcesGrid companies={companies} resources={resources} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const companies: CompanyWithMetaData[] = await getCompaniesWithMetaData();
  const unsortedResources: ResourceWithMetaData[] = await getResourcesWithMetaData();

  const coronaResources = unsortedResources.filter(
    ({ topic }) => topic && topic.includes("corona")
  );
  const otherResources = unsortedResources.filter(
    ({ topic }) => !topic || !topic.includes("corona")
  );

  return {
    props: {
      companies,
      coronaResources,
      resources: otherResources
    }
  };
};

export default IndexPage;
