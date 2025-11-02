<script setup lang="ts">
defineProps({
  product: { type: Object, required: true },
})
</script>

<template>
  <div class="modal fade" tabindex="-1" :id="`productDetailModal-${product.id}`">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-muted fs-5">Product Details</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row g-4">
            <div class="col-md-6">
              <div class="">
                <img
                  :src="product.img || `https://placehold.co/600x400`"
                  class="img-fluid rounded-3"
                  style="max-height: 400px"
                  alt="Image Product"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="d-flex justify-content-between align-items-center">
                <h2 class="text-success">{{ product.name }}</h2>

                <div
                  v-if="product.bestseller"
                  class="badge border border-warning py-2 d-flex align-items-center gap-1"
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
              </div>

              <p>{{ product.category }}</p>

              <p class="text-muted mt-3">{{ product.desc }}</p>

              <div class="h3">
                <span
                  class="text-success me-3"
                  :style="{ textDecoration: product.salePrice ? 'line-through' : 'none' }"
                  >${{ product.price }}</span
                >
                <span class="text-danger" v-if="product.salePrice">${{ product.salePrice }}</span>
              </div>

              <div class="d-flex align-items-center gap-1 mt-3">
                <span
                  v-for="(tag, index) in product.tags"
                  :key="index"
                  class="badge border border-success p-2 d-flex align-items-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-tag-fill"
                    viewBox="0 0 16 16"
                    :style="{ color: 'green' }"
                  >
                    <path
                      d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
                    />
                  </svg>
                  <span>{{ tag }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
