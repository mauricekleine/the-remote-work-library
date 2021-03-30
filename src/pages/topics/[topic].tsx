import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

import ResourcesGrid from "../../components/ResourcesGrid";

import {
  getCompaniesWithMetaData,
  getResources,
  getResourcesWithMetaData
} from "../../utils/fetch";
import { getUniqueTopics, toSlug } from "../../utils/string";
import {
  CompanyWithMetaData,
  Resource,
  ResourceWithMetaData
} from "../../utils/types";

type Props = {
  companies: CompanyWithMetaData[];
  resources: ResourceWithMetaData[];
  topic: string;
};

const TopicPage = ({ companies, resources, topic }: Props) => {
  const topicString = topic.includes("corona")
    ? "the coronavirus (COVID-19)"
    : topic;

  return (
    <>
      <Head>
        <title>
          The Remote Work Library | Remote work resources on {topicString}
        </title>

        <meta
          name="description"
          content={`A curated list of remote work resources on ${topicString}, for digital nomads, remote feelancers, remote workers, remote teams or those interested in working and collaborating remotely`}
        />

        <link
          rel="canonical"
          href={`https://theremoteworklibrary.com/topics/${toSlug(topic)}`}
        />
      </Head>

      <div className="bg-white rounded border border-gray-600 mb-8 py-4 px-6">
        <h1 className="text-gray-900 font-bold text-xl mr-2">
          Remote work resources on {topicString}
        </h1>
      </div>

      <ResourcesGrid companies={companies} resources={resources} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const resources: Resource[] = await getResources();

  const paths = getUniqueTopics(resources).map(topic => ({
    params: { topic: toSlug(topic) }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({
  params: { topic: topicSlug }
}) => {
  const companies: CompanyWithMetaData[] = await getCompaniesWithMetaData();
  const unfilteredResources: ResourceWithMetaData[] = await getResourcesWithMetaData();

  const resources = unfilteredResources.filter(
    ({ topic }) => topic && toSlug(topic) === topicSlug
  );

  return {
    props: { companies, resources, topic: topicSlug }
  };
};

export default TopicPage;
