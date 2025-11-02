<script setup lang="ts">
import { PRODUCT_CATEGORIES } from '@/constants/appContant'
import { onMounted, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSwal } from '@/utility/useSwal'
import productService from '@/services/productService'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'

const { showSuccess } = useSwal()

const router = useRouter()
const loading = ref(false)
const errorList = reactive([] as string[])
const route = useRoute()
const propductIdForUpdata = route.params.id
const productObj = reactive({
  name: '',
  desc: '',
  price: 0,
  salePrice: 0,
  tags: '',
  isBestSeller: false,
  category: '',
  image: 'https://placehold.co/600x400',
})

onMounted(async () => {
  if (!propductIdForUpdata) return
  loading.value = true
  try {
    const product = await productService.getProductById(propductIdForUpdata as string)
    Object.assign(productObj, { ...product, tags: product?.tags.join(', ') })
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})

const handleSubmit = async () => {
  try {
    loading.value = true
    errorList.length = 0

    //validations
    if (productObj.name.length < 3) errorList.push('Name sould be at least 3 char long.')
    if (productObj.price <= 0) errorList.push('Price sould be greater than 0.')
    if (productObj.category === '') errorList.push('Please select a category')

    if (!errorList.length) {
      const productData = {
        ...productObj,
        price: Number(productObj.price),
        salePrice: productObj.salePrice ? Number(productObj.salePrice) : null,
        tags: productObj.tags.length > 0 ? productObj.tags.split(',').map((tag) => tag.trim()) : [],
        bestseller: Boolean(productObj.isBestSeller),
      }
      if (propductIdForUpdata) {
        //update
        await productService.updateProduct(propductIdForUpdata as string, productData)
        showSuccess('Product update successfully')
      } else {
        //create
        await productService.createProduct(productData)
        showSuccess('Product create successfully')
      }
      router.push({ name: APP_ROUTE_NAMES.PRODUCT_LIST })
      console.log(productData)
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <img src="" alt="" />
  <div class="container mt-4 border p-5 rounded">
    <h2 class="text-center text-success">
      {{ propductIdForUpdata ? 'Update' : 'Create' }} Product
    </h2>

    <div class="alert alert-danger" v-if="errorList.length > 0">
      <strong>Please fix the following errors:</strong>
      <ul>
        <li v-for="error in errorList" :key="error">{{ error }}</li>
      </ul>
    </div>

    <form v-on:submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" id="name" class="form-control" v-model="productObj.name" />
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea id="description" class="form-control" v-model="productObj.desc"></textarea>
      </div>

      <div class="mb-3">
        <label for="price" class="form-label">Price</label>
        <input type="number" id="price" class="form-control" v-model="productObj.price" />
      </div>

      <div class="mb-3">
        <label for="salePrice" class="form-label">Sale Price</label>
        <input type="number" id="salePrice" class="form-control" v-model="productObj.salePrice" />
      </div>

      <div class="mb-3">
        <label for="tags" class="form-label">Tags</label>
        <input
          type="text"
          id="tags"
          class="form-control"
          placeholder="e.g., modern, classic, luxury"
          v-model="productObj.tags"
        />
      </div>

      <div class="mb-3 form-check">
        <input
          type="checkbox"
          id="bestseller"
          class="form-check-input"
          v-model="productObj.isBestSeller"
        />
        <label for="bestseller" class="form-check-label">Bestseller</label>
      </div>

      <div class="mb-3">
        <label for="category" class="form-label">Category</label>
        <select v-model="productObj.category" class="form-select">
          <option v-for="option in PRODUCT_CATEGORIES" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="image" class="form-label">Image</label>
        <div class="input-ground">
          <input type="file" class="form-control" />
        </div>
      </div>

      <div class="pt-3">
        <button class="btn btn-success m-2 w-25" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>Submit
        </button>
        <router-link
          :to="{ name: APP_ROUTE_NAMES.PRODUCT_LIST }"
          class="btn btn-secondary m-2 -w-25"
          >Cancel</router-link
        >
      </div>
    </form>
  </div>
</template>
