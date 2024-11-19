// composables/useApollo.ts
import { ref, onMounted, onUnmounted } from "vue";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  type DocumentNode,
  type TypedDocumentNode,
  type OperationVariables,
} from "@apollo/client/core";

// Create an Apollo Client instance
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

export function useApollo<
  TData = any,
  TVariables extends OperationVariables = OperationVariables
>(
  query: string | DocumentNode | TypedDocumentNode<TData, TVariables>,
  variables: TVariables = {} as TVariables
) {
  const result = ref<TData | null>(null);
  const loading = ref(true);
  const error = ref<Error | null>(null);

  let subscription: { (): void; unsubscribe?: any };

  const executeQuery = async () => {
    loading.value = true;
    error.value = null;
    try {
      // Handle both string and DocumentNode queries
      const queryDoc = typeof query === "string" ? gql(query) : query;

      const response = await client.query<TData>({
        query: queryDoc,
        variables,
      });

      result.value = response.data;
    } catch (e) {
      console.error("Apollo query error:", e);
      error.value =
        e instanceof Error ? e : new Error("An unknown error occurred");
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    executeQuery();

    // Set up subscription for cache updates
    const DUMMY_QUERY = gql`
      query DummyQuery {
        __typename
      }
    `;

    subscription = client.cache.watch({
      query: DUMMY_QUERY,
      optimistic: true,
      callback: () => {
        executeQuery();
      },
    });
  });

  onUnmounted(() => {
    if (subscription) {
      subscription.unsubscribe();
    }
  });

  return {
    result,
    loading,
    error,
    refetch: executeQuery,
  };
}
