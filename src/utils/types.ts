type RecordId = string;

export type MetaData = {
  description: string;
  image: string;
  logo: string;
};

export type Company = {
  id: RecordId;
  name: string;
  resources: Resource["id"][];
  website: string;
};

export type CompanyWithMetaData = Company & MetaData;

export type Resource = {
  company: Company["id"];
  id: RecordId;
  link: string;
  name: string;
  tag: string;
  topic: string;
};

export type ResourceWithMetaData = Resource & MetaData;
