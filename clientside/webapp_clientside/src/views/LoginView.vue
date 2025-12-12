<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h1>🍕 Pizza Restaurant</h1>
        <p>Sign in to manage your orders</p>
      </div>

      <form @submit.prevent="loginUser" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            id="email"
            v-model="email" 
            type="email"
            placeholder="admin@pizza.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input 
            id="password"
            v-model="password" 
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" class="login-btn">Sign in</button>

        <p v-if="error" class="error-message">
          ❌ {{ error }}
        </p>
      </form>

      <div class="login-footer">
        <p><strong>Test accounts:</strong></p>
        <p>👤 Admin: admin@pizza.com / admin123</p>
        <p>👤 User: user@pizza.com / user123</p>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "../services/api.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async loginUser() {
      try {
        const res = await login(this.email, this.password);

        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));

        this.$router.push("/admin/pizzas");
      } catch (err) {
        this.error = "Invalid credentials";
      }
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #fbdc7c 0%, #ffc857 50%, #ff9f5a 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-box {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  padding: 40px;
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h1 {
  color: #5c3b00;
  font-size: 32px;
  margin-bottom: 8px;
}

.login-header p {
  color: #888;
  font-size: 14px;
}

.login-form {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #5c3b00;
  font-weight: 600;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #fbdc7c;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: #f9f9f9;
}

.form-group input:focus {
  outline: none;
  border-color: #ff9f5a;
  background: white;
  box-shadow: 0 0 8px rgba(255, 159, 90, 0.3);
}

.form-group input::placeholder {
  color: #ccc;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #8f2e2e 0%, #6b2323 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 15px;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(143, 46, 46, 0.3);
}

.login-btn:active {
  transform: translateY(0);
}

.error-message {
  color: #e74c3c;
  background: #fadbd8;
  padding: 12px;
  border-radius: 6px;
  font-size: 13px;
  border-left: 4px solid #e74c3c;
}

.login-footer {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 6px;
  font-size: 12px;
  color: #666;
}

.login-footer p {
  margin: 5px 0;
  line-height: 1.6;
}

.login-footer strong {
  color: #5c3b00;
  display: block;
  margin-bottom: 5px;
}

@media (max-width: 480px) {
  .login-box {
    padding: 30px 20px;
  }

  .login-header h1 {
    font-size: 24px;
  }
}
</style>
