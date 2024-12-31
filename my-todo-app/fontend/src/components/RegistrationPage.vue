<template>
  <div class="container">
    <form @submit.prevent="registerUser" class="register-form">
      <h2>Register</h2>
      <p id="errorMsg" v-if="errorMsg">{{ errorMsg }}</p>
      <p id="successMsg" v-if="successMsg">{{ successMsg }}</p>
      <div class="input">
        <input type="text" placeholder="Username" v-model="username" required />
      </div>
      <div class="input">
        <input type="email" placeholder="Email" v-model="email" required />
      </div>
      <div class="input">
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          required
        />
      </div>
      <div class="input">
        <input
          type="password"
          placeholder="Confirm Password"
          v-model="confirmPassword"
          required
        />
      </div>

      <p id="sign-up">
        Have an account?
        <router-link to="/login" style="color: var(--sapphire)"
          >Sign in</router-link
        >
      </p>

      <div class="center">
        <button type="submit">Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script>
import { axiosInstance } from "@/utils/axios";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMsg: "",
      successMsg: "",
    };
  },
  methods: {
    async registerUser() {
      try {
        const data = {
          username: this.username,
          email: this.email,
          password: this.password,
          confirm_password: this.confirmPassword,
        };
        const response = await axiosInstance.post("/user/register", data);
        if (response.status == 201) {
          this.successMsg = "Successfully registered. Please login now!";
          this.errorMsg = "";
        }
        if (this.password !== this.confirmPassword) {
          this.errorMsg = "Password do not match!";
          this.successMsg = "";
        }
      } catch (error) {
        if (error.status == 400) {
          this.errorMsg = error.response.data.result;
          this.successMsg = "";
        }
      }
    },
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

.register-form {
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

#errorMsg {
  color: var(--red);
}

#successMsg {
  color: var(--green);
}

#sign-up {
  margin-top: 8px;
}
</style>
