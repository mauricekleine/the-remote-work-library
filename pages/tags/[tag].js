import Head from "next/head";

import {
  getResourcesWithMetaData,
  getCompaniesWithMetaData,
  getResources
} from "../../utils/fetch";
import ResourcesGrid from "../../components/ResourcesGrid";

const Tag = ({ companies, resources, tag }) => (
  <>
    <Head>
      <title>The Remote Work Library | Remote work {tag.toLowerCase()}s</title>

      <meta
        name="description"
        content={`A curated list of remote work ${tag.toLowerCase()}s`}
      />
    </Head>

    <div className="bg-white rounded border border-gray-600 mb-8 py-4 px-6">
      <h1 className="text-gray-900 font-bold text-xl mr-2">
        Remote work {tag.toLowerCase()}s
      </h1>
    </div>

    <ResourcesGrid companies={companies} resources={resources} />
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
  const unfilteredResources = await getResourcesWithMetaData();

  const resources = unfilteredResources.filter(
    ({ type }) => type.toLowerCase() === tag
  );

  return {
    props: { companies, resources, tag }
  };
}

export default Tag;
