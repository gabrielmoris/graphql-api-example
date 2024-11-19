<template>
  <div class="main-wrapper">
    <h1 class="title">Users List</h1>

    <div v-if="loading" class="gray">Loading users...</div>

    <div v-else-if="error" class="error">
      {{ error.message }}
    </div>

    <div v-else class="users-wrapper">
      <div v-for="user in users" :key="user.id" class="user-card">
        <h2 class="">{{ user.name }}</h2>
        <p class="gray">Username: {{ user.username }}</p>
        <p class="gray">Age: {{ user.age }}</p>
        <p class="gray">Nationality: {{ user.nationality }}</p>

        <div v-if="user.friends && user.friends.length" class="">
          <h3 class="font-medium">Friends:</h3>
          <ul class="list">
            <li v-for="friend in user.friends" :key="friend.id" class="gray">
              {{ friend.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useApollo } from "../composables/useApollo";
import { GET_USERS } from "~/graphql/queries";

// Apollo composable to fetch data
const { result, loading, error } = useApollo(GET_USERS);

// Computed property to get users from the response
const users = computed(() => result.value?.users || []);
</script>

<style lang="css">
body {
  font-family: Verdana, Geneva, sans-serif;
}

.main-wrapper {
  padding: 1rem;
}

.title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
}

.error {
  color: red;
}

.gray {
  color: gray;
}

.font-medium {
  font-weight: 500;
}

.list {
  list-style-type: "- ";
  list-style-position: outside;
}

.users-wrapper {
  margin-top: 1rem;
}

.user-card {
  padding: 1rem;
  border-radius: 0.25rem;
  border-width: 1px;
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.user-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
