<template>
  <div class="d-flex justify-content-center align-items-center mx-5 mt-5">
    <div class="card shadow" id="loginForm">
      <div class="card-body p-4">
        <h3 class="text-center mb-4">Đăng nhập</h3>
        <form onsubmit="handleLogin(event)">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" placeholder="Nhập email" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Mật khẩu</label>
            <input type="password" class="form-control" placeholder="Nhập mật khẩu" required />
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="remember" />
            <label class="form-check-label" for="remember">Ghi nhớ đăng nhập</label>
          </div>
          <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
        </form>
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
