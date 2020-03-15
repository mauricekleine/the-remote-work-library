import got from "got";
import Metascraper from "metascraper";
import MetascraperDescription from "metascraper-description";
import MetascraperImage from "metascraper-image";
import MetascraperLogoFavicon from "metascraper-logo-favicon";
import Head from "next/head";
import { useRouter } from "next/router";

import { fetchRecords } from "../../utils/fetch";

const metascraper = Metascraper([
  MetascraperDescription(),
  MetascraperImage(),
  MetascraperLogoFavicon()
]);

const Home = () => {
  const router = useRouter();
  const { company } = router.query;

  return (
    <>
      <Head>
        <title>
          The Remote Work Library | Remote work resources by {company}
        </title>
      </Head>

      <p>Company: {company}</p>
    </>
  );
};

export async function getStaticPaths() {
  const companies = await fetchRecords("Companies");

  const paths = companies.map(({ name }) => ({
    params: { company: name.toLowerCase() }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params: { company } }) {
  const companyRecords = await fetchRecords("Companies");
  const companies = await Promise.all(
    companyRecords.map(async company => {
      const { body: html, url } = await got(company.website);
      const metadata = await metascraper({ html, url });

      return {
        ...company,
        ...metadata
      };
    })
  );

  const resourceRecords = await fetchRecords("Resources");

  const resources = await Promise.all(
    resourceRecords.map(async record => {
      const { body: html, url } = await got(record.link);
      const metadata = await metascraper({ html, url });

      return {
        ...record,
        ...metadata,
        company: companies.find(({ id }) => id === record.company[0])
      };
    })
  );

  return {
    props: {
      resources
    }
  };
}

export default Home;
