import got from "got";
import Metascraper from "metascraper";
import MetascraperDescription from "metascraper-description";
import MetascraperImage from "metascraper-image";
import MetascraperLogoFavicon from "metascraper-logo-favicon";
import Head from "next/head";
import Link from "next/link";

import { fetchRecords } from "../utils/fetch";

const metascraper = Metascraper([
  MetascraperDescription(),
  MetascraperImage(),
  MetascraperLogoFavicon()
]);

const Home = ({ resources }) => (
  <>
    <Head>
      <title>The Remote Work Library</title>
    </Head>

    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 mx-4 sm:mx-auto gap-8">
      {resources.map(resource => (
        <a
          className="bg-white border border-gray-600 transform transition duration-300 ease-in-out rounded shadow-lg hover:-translate-y-1 hover:shadow-2xl xs:my-2"
          href={resource.link}
          key={resource.id}
          target="_blank"
        >
          <img
            className="object-cover rounded-b w-full h-48"
            src={resource.image}
            alt={resource.name}
          />

          <div className="flex flex-col justify-between px-6 py-4 h-48">
            <div>
              <div className="text-gray-900 font-bold text-xl mb-2">
                {resource.name}
              </div>

              <p className="text-gray-700 truncate">{resource.description}</p>
            </div>

            <div className="flex justify-between">
              <Link
                href="/resources/[company]"
                as={`/resources/${resource.company.name.toLowerCase()}`}
              >
                <div className="flex items-center">
                  <img
                    alt={resource.company.description}
                    className="w-4 h-4 mr-2"
                    src={resource.company.logo}
                  />
                  <p className="text-gray-600 text-xs">
                    {resource.company.name}
                  </p>
                </div>
              </Link>

              <span className="bg-blue-100 rounded px-2 py-1 text-blue-500 text-xs">
                {resource.type}
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  </>
);

export async function getStaticProps() {
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
