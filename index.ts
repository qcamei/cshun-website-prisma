import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from './src/generated/prisma';
import resolvers from './src/resolvers';
import directiveResolvers from './src/directiveResolvers';

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	directiveResolvers,
	context: (req) => ({
		...req,
		db: new Prisma({
			endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma API (value set in `.env`)
			debug: true, // log all GraphQL queries & mutations sent to the Prisma API
			secret: process.env.PRISMA_SECRET // only needed if specified in `database/prisma.yml` (value set in `.env`)
		})
	})
});
server.start({ uploads: { maxFiles: 1, maxFileSize: 2000000 } }, () =>
	console.log(`Server is running on http://localhost:4000`)
);
