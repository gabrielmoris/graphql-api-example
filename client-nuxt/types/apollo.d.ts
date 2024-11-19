declare module "@nuxtjs/apollo" {
  interface ApolloQuery {
    users: {
      id: string;
      name: string;
      username: string;
      age: number;
      nationality: string;
      friends?: {
        id: string;
        name: string;
      }[];
    }[];
  }
}
