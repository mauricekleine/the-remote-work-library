import Head from "next/head";

import {
  getResourcesWithMetaData,
  getCompaniesWithMetaData,
  getResources
} from "../../utils/fetch";
import ResourcesGrid from "../../components/ResourcesGrid";

const Tag = ({ resources, tag }) => (
  <>
    <Head>
      <title>The Remote Work Library | Remote work {tag.toLowerCase()}s</title>
    </Head>

    <div className="bg-white rounded border border-gray-600 mb-8 py-4 px-6">
      <p className="text-gray-900 font-bold text-xl mr-2">
        Remote work {tag.toLowerCase()}s
      </p>
    </div>

    <ResourcesGrid resources={resources} />
  </>
);

export async function getStaticPaths() {
  const resources = await getResources();

  const paths = resources.map(({ type }) => ({
    params: { tag: type.toLowerCase() }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params: { tag } }) {
  const companies = await getCompaniesWithMetaData();
  const resourcesWithoutCompanies = await getResourcesWithMetaData();

  const resources = resourcesWithoutCompanies
    .map(resource => ({
      ...resource,
      company: companies.find(({ id }) => id === resource.company[0])
    }))
    .filter(({ type }) => type.toLowerCase() === tag);

  return {
    props: { resources, tag }
  };
}

export default Tag;
