<script setup lang="ts">
import { onMounted, ref } from 'vue'
import productService from '@/services/productService'
import type { UserType } from '@/type/type'
import { useSwal } from '@/utility/useSwal'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
import { useRouter } from 'vue-router'

const products = ref<UserType[]>()
const loading = ref(false)
const router = useRouter()
const { showSuccess, showConfirm } = useSwal()

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

const handleDeleteProduct = async (productId: string) => {
  try {
    loading.value = true
    const confirmResult = await showConfirm('Are you sure you want to delete this product?')
    if (confirmResult.isConfirmed) {
      await productService.deleteProduct(productId)
      await showSuccess('Product deleted successfully')
      fetchProducts()
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container py-4">
    <div v-if="loading" class="d-flex justify-content-center align-items-center vh-100">
      <div class="spinner-grow text-secondary">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else class="border rounded pb-3 px-2">
      <div
        class="card-header d-flex flex-column flex-md-row justify-content-between align-item-md-center p-4"
      >
        <div>
          <h1 class="text-secondary">Products</h1>
          <p class="mb-0 text-muted small">Manage your product listings</p>
        </div>

        <router-link
          :to="{ name: APP_ROUTE_NAMES.PRODUCT_CREATE }"
          class="btn btn-success btn-sm gap-2 rounded-1 px-4 py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-plus-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
            />
          </svg>
          &nbsp;<span>Add Product</span></router-link
        >
      </div>

      <div class="card-body p-3">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0 table-striped">
            <thead>
              <tr>
                <th class="ps-3 small text-muted">Product</th>
                <th class="small text-muted">Category</th>
                <th class="small text-muted">Pricing</th>
                <th class="small text-muted">Tags</th>
                <th class="small text-muted">Bestseller</th>
                <th class="pe-3 text-end small text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td class="ps-3">
                  <div class="d-flex align-items-center">
                    <img
                      :src="product.img || `https://placehold.co/50x50`"
                      class="rounded object-fit-cover me-2"
                      style="width: 50px; height: 50px"
                      alt="image product"
                    />
                    <div>
                      <div class="fw-semibold small">{{ product.name }}</div>
                      <small
                        class="text-muted text-truncate d-inline-block"
                        style="max-width: 200px"
                        >{{ product.desc }}</small
                      >
                    </div>
                  </div>
                </td>

                <td>
                  <span class="badge bg-secondary bg-opacity-10 text-secondary small">{{
                    product.category
                  }}</span>
                </td>

                <td>
                  <div class="d-flex flex-column">
                    <span class="fw-semibold small">{{ product.price }}</span>
                    <span class="text-danger small">{{ product.salePrice }}</span>
                  </div>
                </td>

                <td>
                  <div class="d-flex flex-wrap gap-1">
                    <span
                      class="badge bg-info bg-opacity-10 text-info small"
                      v-for="(tag, idx) in product.tags"
                      :key="`${tag}-${idx}`"
                      >{{ tag }}</span
                    >
                  </div>
                </td>

                <td>
                  <span
                    v-if="product.isBestseller"
                    class="badge bg-warning bg-opacity-10 text-warning small"
                    >Bestseller</span
                  >
                  <span v-else class="text-muted text-center">---</span>
                </td>

                <td class="pe-3 text-end">
                  <button
                    @:click="
                      router.push({
                        name: APP_ROUTE_NAMES.PRODUCT_UPDATE,
                        params: { id: product.id },
                      })
                    "
                    class="btn btn-sm btn-outline-secondary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-plus-circle"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
                      />
                      <path
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
                      />
                    </svg>
                    Edit
                  </button>

                  <button
                    @:click="handleDeleteProduct(product.id)"
                    class="btn btn-sm btn-outline-danger"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                      />
                      <path
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                      /></svg
                    >Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
