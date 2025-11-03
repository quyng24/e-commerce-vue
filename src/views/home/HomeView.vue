<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import productService from '@/services/productService'
import ProductCard from '@/components/Product/ProductCard.vue'
import type { UserType } from '@/type/type'
import {
  PRODUCT_CATEGORIES,
  SORT_NAME_A_Z,
  SORT_NAME_Z_A,
  SORT_OPTIONS,
  SORT_PICE_LOW_HIGHT,
  SORT_PRICE_HIGH_LOW,
} from '@/constants/appContant'

const products = ref<UserType[]>()
const loading = ref(false)
const searchValue = ref<string>('')
const selectedSortOptions = ref(SORT_OPTIONS[0])
const selectedCategory = ref<string>('ALL')
const categoryList = ref<string[]>(['ALL', ...PRODUCT_CATEGORIES])

onMounted(() => {
  fetchProducts()
})

const fetchProducts = async () => {
  try {
    loading.value = true
    products.value = await productService.getProducts()
    console.log(products.value)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const filteredCategory = computed(() => {
  if (!products.value || !Array.isArray(products.value)) {
    return []
  }
  let tempArray =
    selectedCategory.value === 'ALL'
      ? [...(products.value as UserType[])]
      : products.value?.filter(
          (item) => item.category.toUpperCase() === selectedCategory.value.toUpperCase(),
        )

  if (searchValue.value) {
    tempArray = tempArray?.filter((item) => {
      return item.name.toUpperCase().includes(searchValue.value.toUpperCase())
    })
  }

  if (selectedSortOptions.value === SORT_NAME_A_Z)
    tempArray?.sort((a, b) => a.name.localeCompare(b.name))
  if (selectedSortOptions.value === SORT_NAME_Z_A)
    tempArray?.sort((a, b) => b.name.localeCompare(a.name))
  if (selectedSortOptions.value === SORT_PICE_LOW_HIGHT)
    tempArray?.sort((a, b) => b.price - a.price)
  if (selectedSortOptions.value === SORT_PRICE_HIGH_LOW)
    tempArray?.sort((a, b) => a.price - b.price)

  return tempArray
})
</script>
<template>
  <div>
    <div
      class="background-home bg-success w-100 position-relative overflow-hidden mb-4 py-5 d-flex flex-column align-items-center hero-section"
    >
      <div class="position-absolute top-0 start-0 w-100 h-100"></div>

      <div class="container-fluid position-relative z-1">
        <div class="row justify-content-center text-center">
          <div class="col-lg-8 col-xl-7">
            <h1 class="display-4 fw-bold text-white mb-4">
              Your One-Stop Stone Shop
              <br class="d-none d-lg-block" />
              Premium Granite & Quartz for Every Style!
            </h1>
            <div class="input-group mt-3 mx-auto shadow-lg rounded-4" style="max-width: 700px">
              <input
                type="text"
                class="form-control border-0 py-3 px-4 fs-5"
                v-model="searchValue"
                placeholder="Search your favorite product..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="product-list" class="container">
      <h2 class="mb-5 text-center display-6">Discover Our Collection</h2>

      <div class="row g-3 mb-4 align-items-center">
        <div class="col-md-auto">
          <div class="d-flex flex-warp gap-3">
            <button
              @click="selectedCategory = category"
              :class="{
                'btn-success text-white': category === selectedCategory,
                'btn-outline-success': category !== selectedCategory,
              }"
              class="btn px-4 py-2"
              v-for="(category, index) in categoryList"
              :key="index"
            >
              {{ category }}
            </button>
          </div>
        </div>
        <div class="col-md-auto ms-md-auto">
          <div class="dropdown">
            <button
              class="btn btn-outline-secondary d-flex align-items-center gap-2 px-4 py-2"
              type="button"
              data-bs-toggle="dropdown"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-sort-down"
                viewBox="0 0 16 16"
              >
                <path
                  d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"
                />
              </svg>
              <spa class="text-capitalize">{{ selectedSortOptions }}</spa>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow-sm">
              <li v-for="(sort, index) in SORT_OPTIONS" :key="`${index}-${sort}`">
                <button
                  @click="selectedSortOptions = sort"
                  class="dropdown-item py-2 d-flex align-items-center gap-2"
                >
                  <i class="bi"></i>
                  <span class="text-capitalize">{{ sort }}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div v-if="filteredCategory && filteredCategory?.length > 0" class="row g-4 pb-4">
        <product-card
          v-for="product in filteredCategory"
          :key="product.id"
          :product="product"
        ></product-card>
      </div>
      <div v-else>
        <h3 class="text-center">No Products Found</h3>
      </div>
    </div>
  </div>
</template>

<style>
.hero-section {
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: white;
  padding: 80px 0;
}
</style>
