<template>
  <div class="container">
    <form @submit.prevent="loginUser" class="login-form">
      <h2>Login</h2>
      <p id="errorMsg" v-if="errorMessage">{{ errorMessage }}</p>
      <div class="input">
        <input type="email" placeholder="Email" required v-model="email" />
      </div>
      <div class="input">
        <input
          type="password"
          placeholder="Password"
          required
          v-model="password"
        />
      </div>

      <p id="sign-in">
        Don't have an account?
        <router-link to="/register" style="color: var(--sapphire)"
          >Sign up</router-link
        >
      </p>

      <div class="center">
        <button type="submit">Log In</button>
      </div>
    </form>
  </div>
</template>

<script>
import { initializeAuth, useUserStore } from "@/stores/user";
import { axiosInstance } from "@/utils/axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async loginUser() {
      try {
        const data = {
          email: this.email,
          password: this.password,
        };
        const response = await axiosInstance.post("/user/login", data);
        if (response.status == 200) {
          useUserStore().setEmail(this.email);
          this.$router.push("/");
        }
      } catch (error) {
        this.errorMessage = error.response.data.result;
      }
    },

    async isAuthenticated() {
      const response = await initializeAuth();
      if (response) {
        this.$router.push("/");
      }
    },
  },
  mounted() {
    this.isAuthenticated();
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-form {
  border: 2px solid var(--sapphire);
  padding: 20px 44px;
  margin-top: 8%;
  border-radius: 10px;
  width: 22%;
}

input {
  padding: 12px 15px;
  margin-top: 12px;
  outline: none;
  border-radius: 4px;
  width: 95%;
  background-color: var(--inputBackground);
  color: var(--text);
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  cursor: pointer;
  padding: 12px 8px;
  border-radius: 6px;
  margin-top: 12px;
  color: white;
  background-color: #8839ef;
  font-weight: 700;
  outline: none;
}

#sign-in {
  margin-top: 8px;
}

#errorMsg {
  color: var(--red);
}
</style>
