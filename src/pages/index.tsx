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

      <div className="bg-white rounded border border-gray-600 mb-8 py-4 px-6">
        <h1 className="text-gray-900 font-bold text-xl mr-2">
          Remote work resources on the coronavirus (COVID-19)
        </h1>
      </div>

      <ResourcesGrid companies={companies} resources={coronaResources} />

      <div className="bg-white rounded border border-gray-600 my-8 py-4 px-6">
        <p className="text-gray-900 font-bold text-xl mr-2">
          Other remote work resources
        </p>
      </div>

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
