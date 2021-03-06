import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

import ResourcesGrid from "../../components/ResourcesGrid";

import {
  getCompanies,
  getCompaniesWithMetaData,
  getResourcesWithMetaData
} from "../../utils/fetch";
import { getCompoundedString, getUniqueTags, toSlug } from "../../utils/string";
import {
  Company,
  CompanyWithMetaData,
  ResourceWithMetaData
} from "../../utils/types";

type Props = {
  company: CompanyWithMetaData;
  resources: ResourceWithMetaData[];
};

const CompanyPage = ({ company, resources }: Props) => {
  const tags = getUniqueTags(resources);
  const tagsString = getCompoundedString(tags);

  return (
    <>
      <Head>
        <title>
          The Remote Work Library | Remote work resources by {company.name}
        </title>

        <meta
          name="description"
          content={`A curated list of remote work ${tagsString} by ${company.name}, for digital nomads, remote feelancers, remote workers, remote teams or those interested in working and collaborating remotely`}
        />

        <link
          rel="canonical"
          href={`https://theremoteworklibrary.com/resources/${toSlug(
            company.name
          )}`}
        />
      </Head>

      <div className="bg-white rounded border border-gray-600 mb-8 py-4 px-6">
        <div className="flex items-center mb-2">
          <h1 className="text-gray-900 font-bold text-xl mr-2">
            Remote work {tagsString} by {company.name}
          </h1>

          <img alt={company.name} className="w-6 h-6" src={company.logo} />
        </div>

        <p className="text-gray-700">{company.description}</p>

        <a
          className="flex items-center hover:underline"
          href={company.website}
          rel="noreferrer"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="mr-2 w-4"
          >
            <path
              className="heroicon-ui"
              d="M19 6.41L8.7 16.71a1 1 0 1 1-1.4-1.42L17.58 5H14a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V6.41zM17 14a1 1 0 0 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h5a1 1 0 0 1 0 2H5v12h12v-5z"
            />
          </svg>

          {company.website}
        </a>
      </div>

      <ResourcesGrid companies={[company]} resources={resources} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const companies: Company[] = await getCompanies();

  const paths = companies.map(({ name }) => ({
    params: { company: toSlug(name) }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({
  params: { company: companyNameSlug }
}) => {
  const companies: CompanyWithMetaData[] = await getCompaniesWithMetaData();
  const unfilteredResources: ResourceWithMetaData[] = await getResourcesWithMetaData();

  const company = companies.find(
    ({ name }) => toSlug(name) === companyNameSlug
  );

  const resources = unfilteredResources.filter(
    resource => resource.company === company.id
  );

  return {
    props: { company, resources }
  };
};

export default CompanyPage;
