<script setup lang="ts">
import ProductDetail from './ProductDetail.vue'
defineProps({
  product: { type: Object, required: true },
})
</script>

<template>
  <div class="col-12 col-md-6 col-lg-4 mb-4">
    <div class="card h-100 border">
      <div class="position-relative">
        <img
          :src="product.img || `https://placehold.co/600x400`"
          class="card-img-top object-fit-cover"
          style="height: 200px"
          alt="Image Product"
        />
        <div
          v-if="product.bestseller"
          class="position-absolute top-0 end-0 m-2 px-2 py-1 bg-success text-white rounded-1 text-sm d-flex align-items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-star-fill"
            viewBox="0 0 16 16"
            style="color: yellow"
          >
            <path
              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
            />
          </svg>
          Bestseller
        </div>

        <div
          v-if="product.salePrice"
          class="position-absolute top-0 start-0 m-2 px-2 py-1 bg-danger text-white rounded-1 text-sm d-flex align-items-center gap-1"
        >
          Sale
        </div>
      </div>

      <div class="card-body d-flex flex-column">
        <h5 class="card-title mb-2">{{ product.name }}</h5>
        <p class="card-text text-truncate-lines-2 mb-3">{{ product.desc }}</p>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div class="fw-bold me-2 fs-5 text-muted">
            <span
              class="text-success me-2"
              :style="{ textDecoration: product.salePrice ? 'line-through' : 'none' }"
            >
              ${{ product.price.toFixed(0) }}
            </span>
            <span v-if="product.salePrice" class="text-danger">SALE!</span>
          </div>

          <button
            class="btn btn-success fs-6 py-1 px-2"
            data-bs-toggle="modal"
            :data-bs-target="`#productDetailModal-${product.id}`"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-card-list"
              viewBox="0 0 16 16"
            >
              <path
                d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"
              />
              <path
                d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"
              />
            </svg>
            View details
          </button>
        </div>

        <div class="d-flex flex-wrap gap-2">
          <span class="badge bg-secondary p-2">{{ product.category }}</span>
          <span class="badge bg-secondary p-2" v-for="(tag, index) in product.tags" :key="index">{{
            tag
          }}</span>
        </div>
      </div>
    </div>

    <ProductDetail :product="product" />
  </div>
</template>
