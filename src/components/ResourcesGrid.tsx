import Link from "next/link";

import CoverImage from "./CoverImage";
import Logo from "./Logo";

import { toSlug } from "../utils/string";
import { CompanyWithMetaData, ResourceWithMetaData } from "../utils/types";

type Props = {
  companies: CompanyWithMetaData[];
  resources: ResourceWithMetaData[];
};

const ResourcesGrid = ({ companies, resources }: Props) => (
  <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-8">
    {resources.map(resource => {
      const company = companies.find(({ id }) => id === resource.company);

      return (
        <a
          className="bg-white border border-gray-600 transform transition duration-300 ease-in-out rounded hover:shadow-lg hover:translate-y-1 shadow-2xl"
          href={resource.link}
          key={resource.id}
          rel="noreferrer"
          target="_blank"
        >
          <CoverImage
            alt={`A remote work ${resource.tag} by ${company.name}`}
            fileName={`cover-${resource.id}`}
          />

          <div className="flex flex-col justify-between px-6 pt-4 h-40">
            <div className="overflow-hidden">
              <h3 className="text-gray-900 font-bold sm:text-lg text-xl mb-2">
                {resource.name}
              </h3>

              <p className="text-gray-700 truncate">{resource.description}</p>
            </div>
          </div>

          <div className="flex justify-between rounded bg-gray-100 px-3 py-2">
            <Link
              href="/resources/[company]"
              as={`/resources/${toSlug(company.name)}`}
            >
              <a className="flex items-center hover:underline px-3 py-1">
                <Logo
                  alt={company.name}
                  fallback={company.logo}
                  fileName={`logo-${company.id}`}
                />

                <p className="text-gray-700 text-xs">{company.name}</p>
              </a>
            </Link>

            <div className="flex items-center">
              {resource.topic && (
                <Link
                  href="/topics/[topic]"
                  as={`/topics/${toSlug(resource.topic)}`}
                >
                  <a className="text-gray-700 text-xs hover:underline py-1">
                    #{resource.topic}
                  </a>
                </Link>
              )}

              <Link href="/tags/[tag]" as={`/tags/${toSlug(resource.tag)}`}>
                <a className="text-gray-700 text-xs hover:underline px-3 py-1">
                  #{resource.tag}
                </a>
              </Link>
            </div>
          </div>
        </a>
      );
    })}
  </div>
);

export default ResourcesGrid;
