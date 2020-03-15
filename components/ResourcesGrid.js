import Link from "next/link";

const ResourcesGrid = ({ companies, resources }) => (
  <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-8">
    {resources.map(resource => {
      const company = companies.find(({ id }) => id === resource.company);

      return (
        <a
          className="bg-white border border-gray-600 transform transition duration-300 ease-in-out rounded shadow-lg hover:-translate-y-1 hover:shadow-2xl"
          href={resource.link}
          key={resource.id}
          target="_blank"
        >
          <img
            className="object-cover rounded-b w-full h-48"
            src={resource.image}
            alt={resource.name}
          />

          <div className="flex flex-col justify-between px-6 py-4 h-56">
            <div>
              <div className="text-gray-900 font-bold text-xl mb-2">
                {resource.name}
              </div>

              <p className="text-gray-700 truncate">{resource.description}</p>
            </div>

            <div className="flex justify-between">
              <Link
                href="/resources/[company]"
                as={`/resources/${company.name.toLowerCase()}`}
              >
                <a className="flex items-center hover:underline">
                  <img
                    alt={company.description}
                    className="w-4 h-4 mr-2"
                    src={company.logo}
                  />

                  <p className="text-gray-600 text-xs">{company.name}</p>
                </a>
              </Link>

              <Link
                href="/tags/[tag]"
                as={`/tags/${resource.type.toLowerCase()}`}
              >
                <a className="bg-blue-100 rounded px-2 py-1 text-blue-500 hover:text-blue-600 text-xs transition duration-300 ease-in-out hover:bg-blue-200">
                  {resource.type}
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
