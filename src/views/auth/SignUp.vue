<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useSwal } from '@/utility/useSwal'

const error = ref('')
const form = reactive({
  email: '',
  password: '',
})

const handleSignUp = () => {}
</script>

<template>
  <div class="container py-5 my-3">
    <div class="row justify-content-center">
      <div class="col-mf-6 col-lg-4 border rounded">
        <div class="shadow-sm">
          <div class="card-body p-4">
            <h3 class="text-center mb-4">Đăng nhập</h3>
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
          <button type="submit" class="btn btn-success w-100">
            <span class="spinner-border spinner-border-sm me-2"></span>
            Create Account
          </button>
          <div class="alert alert-danger mt-3 mb-0">{{ error }}</div>
        </form>
        <p class="mt-3 form-label text-center">
          Already have an account? <a href="#">Login here</a>
        </p>
        <div class="text-center mt-3">
          <small
            >Chưa có tài khoản?
            <a href="#" onclick="toggleForms(); return false;">Đăng ký</a></small
          >
        </div>
      </div>
    </div>
  </div>
</template>
