<template>
  <div class="container mt-4" style="max-width: 500px;">
    <h2 class="mb-4">Register</h2>
    <b-form @submit.prevent="register">
      <!-- Username -->
      <b-form-group label="Username" label-for="username">
        <div class="d-flex align-items-center">
          <b-form-input
            id="username"
            v-model="state.username"
            :state="getValidationState(v$.username)"
            @input="v$.username.$touch()"
            @focus="focusedField = 'username'"
            @blur="focusedField = null"
          />
          <span v-if="focusedField === 'username'" class="input-note ms-2">
            3-8 letters, English only
          </span>
        </div>
        <b-form-invalid-feedback v-if="v$.username.$dirty && v$.username.$error">
          <div v-if="!v$.username.required">Username is required.</div>
          <div v-else-if="!v$.username.minLength || !v$.username.maxLength">
            Username must be 3–8 characters.
          </div>
          <div v-else-if="!v$.username.alpha">Username must contain only letters.</div>
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- First Name -->
      <b-form-group label="First Name" label-for="firstname">
        <div class="d-flex align-items-center">
          <b-form-input
            id="firstname"
            v-model="state.firstname"
            :state="getValidationState(v$.firstname)"
            @input="v$.firstname.$touch()"
            @focus="focusedField = 'firstname'"
            @blur="focusedField = null"
          />
          <span v-if="focusedField === 'firstname'" class="input-note ms-2">
            Letters only
          </span>
        </div>
        <b-form-invalid-feedback v-if="v$.firstname.$dirty && v$.firstname.$error">
          <div v-if="!v$.firstname.required">First name is required.</div>
          <div v-else-if="!v$.firstname.alpha">First name must contain only letters.</div>
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Last Name -->
      <b-form-group label="Last Name" label-for="lastname">
        <div class="d-flex align-items-center">
          <b-form-input
            id="lastname"
            v-model="state.lastname"
            :state="getValidationState(v$.lastname)"
            @input="v$.lastname.$touch()"
            @focus="focusedField = 'lastname'"
            @blur="focusedField = null"
          />
          <span v-if="focusedField === 'lastname'" class="input-note ms-2">
            Letters only
          </span>
        </div>
        <b-form-invalid-feedback v-if="v$.lastname.$dirty && v$.lastname.$error">
          <div v-if="!v$.lastname.required">Last name is required.</div>
          <div v-else-if="!v$.lastname.alpha">Last name must contain only letters.</div>
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Email -->
      <b-form-group label="Email" label-for="email">
        <div class="d-flex align-items-center">
          <b-form-input
            id="email"
            type="email"
            v-model="state.email"
            :state="getValidationState(v$.email)"
            @input="v$.email.$touch()"
            @focus="focusedField = 'email'"
            @blur="focusedField = null"
          />
          <span v-if="focusedField === 'email'" class="input-note ms-2">
            Must be a valid email address
          </span>
        </div>
        <b-form-invalid-feedback v-if="v$.email.$dirty && v$.email.$error">
          <div v-if="!v$.email.required">Email is required.</div>
          <div v-else-if="!v$.email.email">Email must be valid.</div>
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Country -->
      <b-form-group label="Country" label-for="country">
        <div class="d-flex align-items-center">
          <b-form-select
            id="country"
            v-model="state.country"
            :options="countries"
            :state="getValidationState(v$.country)"
            @change="v$.country.$touch()"
            @focus="focusedField = 'country'"
            @blur="focusedField = null"
          />
          <span v-if="focusedField === 'country'" class="input-note ms-2">
            Please select your country
          </span>
        </div>
        <b-form-invalid-feedback v-if="v$.country.$dirty && v$.country.$error">
          Country is required.
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Password -->
      <b-form-group label="Password" label-for="password">
        <div class="d-flex align-items-center">
          <b-form-input
            id="password"
            type="password"
            v-model="state.password"
            :state="getValidationState(v$.password)"
            @input="v$.password.$touch()"
            @focus="focusedField = 'password'"
            @blur="focusedField = null"
          />
          <span v-if="focusedField === 'password'" class="input-note ms-2">
            5-10 chars, at least 1 digit & 1 special character
          </span>
        </div>
        <b-form-invalid-feedback v-if="v$.password.$dirty && v$.password.$error">
          <div v-if="!v$.password.required">Password is required.</div>
          <div v-else-if="!v$.password.minLength || !v$.password.maxLength">
            Password must be 5–10 characters.
          </div>
          <div v-else-if="!v$.password.passwordComplex">
            Password must contain at least one digit and one special character.
          </div>
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Confirm Password -->
      <b-form-group label="Confirm Password" label-for="confirmedPassword">
        <div class="d-flex align-items-center">
          <b-form-input
            id="confirmedPassword"
            type="password"
            v-model="state.confirmedPassword"
            :state="getValidationState(v$.confirmedPassword)"
            @input="v$.confirmedPassword.$touch()"
            @focus="focusedField = 'confirmedPassword'"
            @blur="focusedField = null"
          />
          <span v-if="focusedField === 'confirmedPassword'" class="input-note ms-2">
            Must match the password above
          </span>
        </div>
        <b-form-invalid-feedback v-if="v$.confirmedPassword.$dirty && v$.confirmedPassword.$error">
          <div v-if="!v$.confirmedPassword.required">Confirmation is required.</div>
          <div v-else-if="!v$.confirmedPassword.sameAsPassword">
            Passwords do not match.
          </div>
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Profile Picture -->
      <b-form-group label="Profile Picture (optional)" label-for="profilePic">
        <b-form-file
          id="profilePic"
          v-model="state.profilePic"
          accept="image/*"
        />
        <div v-if="state.profilePic" class="mt-2">
          <img
            :src="profilePicUrl"
            alt="Preview"
            style="max-width: 100px; max-height: 100px;"
          />
        </div>
      </b-form-group>

      <b-button
        type="submit"
        variant="secondary"
        class="w-100"
        :disabled="v$.$invalid || v$.$pending"
        style="background-color: #adb5bd; border-color: #adb5bd; color: #fff;"
      >
        Register
      </b-button>

      <b-alert
        variant="danger"
        class="mt-3"
        dismissible
        v-if="state.submitError"
        show
      >
        Registration failed: {{ state.submitError }}
      </b-alert>

      <div class="mt-2">
        Already have an account?
        <router-link to="/login">Login here</router-link>
      </div>
    </b-form>
  </div>
</template>

<script>
import { reactive, computed, ref, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength, alpha, sameAs, helpers, email } from '@vuelidate/validators';
import rawCountries from '../assets/countries';

// Helper: check for at least one digit and one special char (no regex)
function hasDigitAndSpecial(val) {
  if (typeof val !== 'string') return false;
  const hasDigit = val.split('').some(c => c >= '0' && c <= '9');
  const specialChars = "!@#$%^&*()_+-=[]{};':\"\\|,.<>/?";
  const hasSpecial = val.split('').some(c => specialChars.includes(c));
  return hasDigit && hasSpecial;
}

const passwordComplex = helpers.withMessage(
  'Password must contain at least one digit and one special character.',
  value => hasDigitAndSpecial(value)
);

export default {
  name: 'RegisterPage',
  setup() {
    const state = reactive({
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmedPassword: '',
      country: '',
      profilePic: null,
      submitError: null,
    });

    const focusedField = ref(null);

    const rules = {
      username: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(8),
        alpha,
      },
      firstname: {
        required,
        alpha,
      },
      lastname: {
        required,
        alpha,
      },
      email: {
        required,
        email,
      },
      country: { required },
      password: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(10),
        passwordComplex,
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs(() => state.password),
      },
    };

    const v$ = useVuelidate(rules, state);

    // Watch password and update confirmedPassword validation when password changes
watch(
  [() => state.password, () => state.confirmedPassword],
  () => {
    v$.value.confirmedPassword.$touch();
    v$.value.confirmedPassword.$validate();
  }
);

    // Helper for input border color
    const getValidationState = (field) => {
      if (!field.$dirty) return null;
      return !field.$invalid;
    };

    // Profile picture preview
    const profilePicUrl = computed(() => {
      if (!state.profilePic) return '';
      if (typeof state.profilePic === 'string') return state.profilePic;
      try {
        return URL.createObjectURL(state.profilePic);
      } catch {
        return '';
      }
    });

    const register = async () => {
      const valid = await v$.value.$validate();
      if (!valid) return;

      try {
        await window.axios.post("http://localhost:3000/Register", {
          username: state.username,
          password: state.password,
          country: state.country,
          firstname: state.firstname,
          lastname: state.lastname,
          email: state.email,
          profilePic: 'https://example.com/profile.jpg',
        });
        window.toast('Registration successful', 'You can now login', 'success');
        window.router.push('/login');
      } catch (err) {
        state.submitError = err.response?.data?.message || 'Unexpected error.';
      }
    };

    return {
      state,
      countries: ['Select a country', ...rawCountries],
      register,
      v$,
      getValidationState,
      profilePicUrl,
      focusedField,
    };
  },
};
</script>

<style scoped>
/* Highlight invalid fields with red border */
.is-invalid, .b-form-input.is-invalid, .b-form-select.is-invalid {
  border-color: #dc3545 !important;
  box-shadow: 0 0 0 0.2rem rgba(220,53,69,.25);
}
.input-note {
  font-size: 0.92em;
  color: #6c757d;
  background: #f8f9fa;
  border-radius: 4px;
  padding: 2px 8px;
  margin-left: 4px;
  white-space: nowrap;
  border: 1px solid #e2e3e5;
}
</style>