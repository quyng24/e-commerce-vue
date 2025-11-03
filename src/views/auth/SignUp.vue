<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useSwal } from '@/utility/useSwal'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
import { UseAuthStore } from '@/stores/authStore'

const error = ref<string>('')
const { showSuccess, showError } = useSwal()
const router = useRouter()
const authStore = UseAuthStore()
const form = reactive({
  email: '',
  password: '',
})

const handleSignUp = async () => {
  try {
    error.value = ''
    console.log(form)
    await authStore.signUpUser(form.email, form.password)
    showSuccess('Account created successfully')
    router.push({ name: APP_ROUTE_NAMES.SIGN_IN })
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message
      showError(err.message)
    } else {
      console.error('Một lỗi không phải là đối tượng Error')
    }
  }
}
</script>

<template>
  <div class="container py-5 my-3">
    <div class="row justify-content-center">
      <div class="col-mf-6 col-lg-4 border rounded">
        <div class="shadow-sm">
          <div class="card-body p-4">
            <h3 class="text-center mb-4">Sign Up</h3>
          </div>
        </div>
        <form @submit.prevent="handleSignUp">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input id="email" type="email" v-model="form.email" class="form-control" required />
          </div>
          <div class="mb-4">
            <label for="password" class="form-label">Password</label>
            <input type="password" v-model="form.password" class="form-control" required />
          </div>
          <button
            :disabled="authStore.isLoading as boolean"
            type="submit"
            class="btn btn-success w-100"
          >
            <span v-if="authStore.isLoading" class="spinner-border spinner-border-sm me-2"></span>
            Create Account
          </button>
          <div v-if="error" class="alert alert-danger mt-3 mb-0">{{ error }}</div>
        </form>
        <p class="mt-3 form-label text-center">
          Already have an account?
          <router-link :to="APP_ROUTE_NAMES.SIGN_IN">Login here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
