import got from "got";
import Metascraper from "metascraper";
import MetascraperDescription from "metascraper-description";
import MetascraperImage from "metascraper-image";
import MetascraperLogoFavicon from "metascraper-logo-favicon";
import fetch from "node-fetch";

const AIRTABLE_API_ENDPOINT = `https://api.airtable.com/v0/${process.env.AIRTABLE_API_BASE}`;

const metascraper = Metascraper([
  MetascraperDescription(),
  MetascraperImage(),
  MetascraperLogoFavicon()
]);

const fetchMetaData = async urlToFetch => {
  const { body: html, url } = await got(urlToFetch);

  return await metascraper({ html, url });
};

const fetchRecords = async table => {
  const res = await fetch(`${AIRTABLE_API_ENDPOINT}/${table}`, {
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`
    }
  });

  const { records } = await res.json();

  return records.map(record => {
    const normalizedRecord = {
      id: record.id
    };

    Object.keys(record.fields).map(field => {
      const normalizedField = field.toLowerCase();

      normalizedRecord[normalizedField] = record.fields[field];
    });

    return normalizedRecord;
  });
};

export const getCompanies = async () => await fetchRecords("Companies");

export const getCompaniesWithMetaData = async () => {
  const companyRecords = await getCompanies();

  return await Promise.all(
    companyRecords.map(async company => {
      const metadata = await fetchMetaData(company.website);

      return {
        ...company,
        ...metadata
      };
    })
  );
};

export const getResources = async () => await fetchRecords("Resources");

export const getResourcesWithMetaData = async () => {
  const resourceRecords = await getResources();

  return await Promise.all(
    resourceRecords.map(async resource => {
      const metadata = await fetchMetaData(resource.link);

      return {
        ...resource,
        company: resource.company[0],
        ...metadata
      };
    })
  );
};
