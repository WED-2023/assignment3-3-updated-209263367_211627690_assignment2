<template>
  <div class="container mt-5">
    <h2>My Family Manager</h2>
    <form class="row g-3 mb-4" @submit.prevent="searchUser">
      <div class="col-md-3">
        <input v-model="firstName" class="form-control" placeholder="First name..." />
      </div>
      <div class="col-md-3">
        <input v-model="lastName" class="form-control" placeholder="Last name..." />
      </div>
      <div class="col-md-2">
        <button class="btn btn-primary" type="submit" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm"></span>
          Search
        </button>
      </div>
    </form>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="userResults.length">
      <div
        class="card p-3 mb-3"
        v-for="user in userResults"
        :key="user.id || user.full_name"
      >
        <h5>{{ user.full_name }}</h5>
        <button class="btn btn-success" @click="addToFamily(user.username)" :disabled="adding">
          <span v-if="adding" class="spinner-border spinner-border-sm"></span>
          Add to Family
        </button>
      </div>
    </div>
    <div v-if="successMsg" class="alert alert-success">{{ successMsg }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const store = window.store || {};

const firstName = ref('');
const lastName = ref('');
const userResults = ref([]);
const loading = ref(false);
const adding = ref(false);
const error = ref('');
const successMsg = ref('');

async function searchUser() {
  error.value = '';
  userResults.value = [];
  successMsg.value = '';
  loading.value = true;
  try {
    const params = [];
    if (firstName.value) params.push('first_name=' + encodeURIComponent(firstName.value));
    if (lastName.value) params.push('last_name=' + encodeURIComponent(lastName.value));
    if (params.length === 0) {
      error.value = 'Please enter at least a first name or last name.';
      loading.value = false;
      return;
    }
    const res = await fetch(
      store.server_domain + '/users/searchUsers?' + params.join('&'),
      { credentials: 'include' }
    );
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      userResults.value = data;
    } else {
      error.value = 'No users found.';
    }
  } catch (err) {
    error.value = 'Failed to search users.';
  }
  loading.value = false;
}

import axios from 'axios';

async function addToFamily(family_username) {
    adding.value = true;
    error.value = '';
    successMsg.value = '';
    try {
        const res = await axios.post(
            store.server_domain + '/users/addToFamily',
            { family_username },
            { withCredentials: true }
        );
        if (res.status === 200) {
            successMsg.value = 'User added to your family!';
        } else {
            error.value = res.data?.message || 'Failed to add user to family.';
        }
    } catch (err) {
        error.value = err.response?.data?.message || 'Failed to add user to family.';
    }
    adding.value = false;
}
</script>