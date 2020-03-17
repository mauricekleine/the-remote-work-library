import Head from "next/head";

import {
  getCompaniesWithMetaData,
  getResourcesWithMetaData
} from "../utils/fetch";
import ResourcesGrid from "../components/ResourcesGrid";
import { getCompoundedString, getUniqueTags } from "../utils/string";

const Home = ({ companies, resources }) => {
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
          content={`A curated list of ${tagsString} about remote work, working remotely, remote teams and collaborating remotely`}
        />
      </Head>

      <ResourcesGrid companies={companies} resources={resources} />
    </>
  );
};

export async function getStaticProps() {
  const companies = await getCompaniesWithMetaData();
  const resources = await getResourcesWithMetaData();

  return {
    props: {
      companies,
      resources
    }
  };
}

export default Home;
