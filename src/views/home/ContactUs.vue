<template>
  <section class="hero-section">
    <div class="container text-center">
      <h1 class="display-4 fw-bold">Get In Touch</h1>
      <p class="lead">We'd love to hear from you. Here's how you can reach us.</p>
    </div>
  </section>

  <section class="py-5">
    <div class="container">
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card h-100 text-center contact-info-card">
            <div class="card-body">
              <i></i>
              <h5 class="card-title">Visit Us</h5>
              <p class="card-text">
                123 Business Street <br />
                Suite 100 <br />
                New Your, NY 10001
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card h-100 text-center contact-info-card">
            <div class="card-body">
              <i></i>
              <h5 class="card-title">Call Us</h5>
              <p class="card-text">
                0868671553 <br />
                Monday-Friday: 8am-5pm
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card h-100 text-center contact-info-card">
            <div class="card-body">
              <i></i>
              <h5 class="card-title">Email Us</h5>
              <p class="card-text">
                nquy50771@gmail.com <br />
                nquy50771@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="py-5">
    <div class="container">
      <h2 class="text-center mb-5">Frequently Asked Questions</h2>

      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq1"
              >
                What is your response time?
              </button>
            </h2>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
.hero-section {
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: white;
  padding: 80px 0;
}
.contact-info-card {
  transition: transform 0.3s ease;
}
.contact-info-card:hover {
  transform: translateY(-5px);
}
.contact-form {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
.map-container {
  height: 400px;
  overflow: hidden;
  border-radius: 10px;
}
</style>
