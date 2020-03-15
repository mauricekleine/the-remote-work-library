import fetch from "node-fetch";

const AIRTABLE_API_ENDPOINT = `https://api.airtable.com/v0/${process.env.AIRTABLE_API_BASE}`;

export const fetchRecords = async table => {
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
      normalizedRecord[field.toLowerCase()] = record.fields[field];
    });

    return normalizedRecord;
  });
};
