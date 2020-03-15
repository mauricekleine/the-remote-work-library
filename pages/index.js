import Head from "next/head";

import {
  getCompaniesWithMetaData,
  getResourcesWithMetaData
} from "../utils/fetch";
import ResourcesGrid from "../components/ResourcesGrid";

const Home = ({ resources }) => (
  <>
    <Head>
      <title>The Remote Work Library</title>
    </Head>

    <ResourcesGrid resources={resources} />
  </>
);

export async function getStaticProps() {
  const companies = await getCompaniesWithMetaData();
  const resourcesWithoutCompanies = await getResourcesWithMetaData();

  const resources = resourcesWithoutCompanies.map(resource => ({
    ...resource,
    company: companies.find(({ id }) => id === resource.company[0])
  }));

  return {
    props: {
      resources
    }
  };
}

export default Home;
