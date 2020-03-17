import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

import ResourcesGrid from "../../components/ResourcesGrid";

import {
  getCompaniesWithMetaData,
  getResources,
  getResourcesWithMetaData
} from "../../utils/fetch";
import { getUniqueTags, toSlug } from "../../utils/string";
import {
  CompanyWithMetaData,
  Resource,
  ResourceWithMetaData
} from "../../utils/types";

type Props = {
  companies: CompanyWithMetaData[];
  resources: ResourceWithMetaData[];
  tag: string;
};

const TagPage = ({ companies, resources, tag }: Props) => {
  const companiesString = companies
    .slice(0, 8)
    .map(({ name }) => name)
    .join(", ");

  return (
    <>
      <Head>
        <title>The Remote Work Library | Remote work {tag}s</title>

        <meta
          name="description"
          content={`A curated list of remote work ${tag}s by ${companiesString} and others`}
        />
      </Head>

      <div className="bg-white rounded border border-gray-600 mb-8 py-4 px-6">
        <h1 className="text-gray-900 font-bold text-xl mr-2">
          Remote work {tag}s
        </h1>

        <p className="text-gray-700">By {companiesString} and others.</p>
      </div>

      <ResourcesGrid companies={companies} resources={resources} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const resources: Resource[] = await getResources();

  const paths = getUniqueTags(resources).map(tag => ({
    params: { tag: toSlug(tag) }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({
  params: { tag: tagSlug }
}) => {
  const companies: CompanyWithMetaData[] = await getCompaniesWithMetaData();
  const unfilteredResources: ResourceWithMetaData[] = await getResourcesWithMetaData();

  const resources = unfilteredResources.filter(
    ({ tag }) => toSlug(tag) === tagSlug
  );

  return {
    props: { companies, resources, tag: tagSlug }
  };
};

export default TagPage;
