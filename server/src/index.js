const { ApolloServer, gql } = require("apollo-server");

const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const main = async () => {
  const typeDefs = gql`
    """
    An object with an ID.
    Follows the [Relay Global Object Identification Specification](https://relay.dev/graphql/objectidentification.htm)
    """
    interface Node {
      id: ID!
    }

    """
    Information about pagination in a connection.
    """
    type PageInfo {
      """
      When paginating forwards, the cursor to continue.
      """
      endCursor: String

      """
      When paginating forwards, are there more items?
      """
      hasNextPage: Boolean!

      """
      When paginating backwards, are there more items?
      """
      hasPreviousPage: Boolean!

      """
      When paginating backwards, the cursor to continue.
      """
      startCursor: String
    }

    enum StoreCategory {
      KIOSK
      SHOPPING
      STREET
    }

    type Store implements Node {
      category: StoreCategory!
      companyName: String!
      id: ID!
      tipo: String!
        @deprecated(reason: "Field will be removed in favor of Store#category")
      tradeName: String!
      contract: Contract
    }

    """
    The connection type for Store.
    """
    type StoreConnection {
      """
      A list of edges.
      """
      edges: [StoreEdge!]!

      """
      Information to aid in pagination.
      """
      pageInfo: PageInfo!
      totalCount: Int!
    }

    """
    An edge in a connection.
    """
    type StoreEdge {
      """
      A cursor for use in pagination.
      """
      cursor: String!

      """
      The item at the end of the edge.
      """
      node: Store!
    }

    type Contract implements Node {
      daysOfAntecedence: Int!
      dueDay: Int!
      id: ID!
      store: Store
    }

    input StoreCategoryOperatorInput {
      eq: StoreCategory
      in: [StoreCategory!]
      neq: StoreCategory
      nin: [StoreCategory!]
    }

    input StoresWhereInput {
      category: StoreCategoryOperatorInput!
    }

    type Query {
      stores(
        """
        Returns the elements in the list that come after the specified cursor.
        """
        after: String

        """
        Returns the elements in the list that come before the specified cursor.
        """
        before: String

        """
        Returns the first _n_ elements from the list.
        """
        first: Int

        """
        Returns the last _n_ elements from the list.
        """
        last: Int
        search: String
        where: StoresWhereInput
      ): StoreConnection!
      node(id: ID!): Node
      nodes(ids: [ID!]!): [Node]!
    }
  `;

  const resolvers = {
    Query: {
      stores: async (_root, args) => {
        await sleep(3000);

        if (args.where.category.eq === "STREET") {
          return require("./mocks/stores/streets");
        }

        if (args.where.category.eq === "SHOPPING") {
          return require("./mocks/stores/shopping");
        }

        if (args.where.category.eq === "KIOSK") {
          return require("./mocks/stores/kiosk");
        }

        throw new Error("Unmocked where filter");
      },
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const port = process.env.PORT || 4000;

  const { url } = await server.listen({ port });

  console.info(`🚀 Server ready at ${url}`);
};

main();
