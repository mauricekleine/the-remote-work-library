import Head from "next/head";

import {
  getCompaniesWithMetaData,
  getResourcesWithMetaData
} from "../utils/fetch";
import ResourcesGrid from "../components/ResourcesGrid";

const Home = ({ companies, resources }) => (
  <>
    <Head>
      <title>
        The Remote Work Library | A curated list of remote work resources
      </title>

      <meta
        name="description"
        content="A curated list of remote work resources"
      />
    </Head>

    <ResourcesGrid companies={companies} resources={resources} />
  </>
);

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
