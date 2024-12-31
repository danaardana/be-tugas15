<template>
  <div class="container">
    <div class="stats-container">
      <div class="details">
        <h1>Todo App</h1>
        <div style="display: flex; flex-direction: row; gap: 20px">
          <p>Welcome</p>
          <p @click="logout">
            <router-link to="/" style="color: var(--sapphire)"
              >Logout</router-link
            >
          </p>
        </div>
        <div id="progressBar">
          <div id="progress" style="width: 50%"></div>
        </div>
      </div>
      <div class="stats-numbers">
        <p id="numbers">
          {{ tasks.length }}
        </p>
      </div>
    </div>

    <form @submit.prevent="submitTask" v-if="submit">
      <input
        v-model="inputTask"
        type="text"
        placeholder="Write your task"
        required
      />
      <button type="submit">+</button>
    </form>

    <form @submit.prevent="editTask(idChoosen)" v-if="edit">
      <input
        v-model="inputTask"
        type="text"
        placeholder="Write your task"
        required
      />
      <button type="submit">+</button>
    </form>
    <p v-if="warn" class="warn">Please fill in</p>

    <ul class="task-list">
      <li v-for="val in tasks" :key="val.id">
        <div class="taskItem">
          <div class="task">
            <input
              type="checkbox"
              v-model="val.is_completed"
              @change="selectOnlyOne(val.id)"
            />

            <p v-if="!val.is_completed">{{ val.job }}</p>
            <s v-if="val.is_completed">{{ val.job }}</s>
          </div>
          <div class="icons">
            <box-icon
              type="solid"
              name="trash"
              @click.prevent="deleteTask(val.id)"
              color="#f38ba8"
              class="box-icon"
            ></box-icon>
            <box-icon
              type="solid"
              name="edit"
              @click.prevent="chooseEdit(val)"
              color="#a6e3a1"
              class="box-icon"
            ></box-icon>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";
import axiosJWT from "@/utils/axios";
import "boxicons";

export default {
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },
  data() {
    return {
      inputTask: "",
      tasks: [],
      warn: false,
      editJob: "",
      submit: true,
      edit: false,
      idChoosen: "",
      count: 0,
    };
  },
  methods: {
    async getTask() {
      try {
        const response = await axiosJWT.get("/task/getall");
        this.tasks = response.data.result;
      } catch (error) {
        console.error(error);
      }
    },

    async selectOnlyOne(id) {
      try {
        await axiosJWT.patch(`/task/edit/status/${id}`);
      } catch (error) {
        console.error(error);
      }
    },

    async submitTask() {
      try {
        if (this.inputTask.trim() == "") {
          this.warn = true;
          setTimeout(() => {
            this.warn = false;
          }, 2500);
          return;
        }
        const data = { job: this.inputTask };
        const response = await axiosJWT.post("/task/add", data);
        const newTask = response.data.result;
        this.tasks = [newTask, ...this.tasks];
        this.inputTask = "";
      } catch (error) {
        console.error(error);
      }
    },

    chooseEdit(val) {
      this.submit = false;
      this.edit = true;
      this.inputTask = val.job;
      this.tasks = this.tasks.filter((task) => task.id !== val.id);
      this.idChoosen = val.id;
    },

    async editTask(id) {
      try {
        const data = { job: this.inputTask };
        const response = await axiosJWT.patch(`/task/edit/job/${id}`, data);
        const newTask = response.data.result;
        this.tasks = [newTask, ...this.tasks];
        this.inputTask = "";
      } catch (error) {
        console.error(error);
      }
    },

    async deleteTask(id) {
      try {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        await axiosJWT.delete(`/task/delete/${id}`);
      } catch (error) {
        console.error(error);
      }
    },
    async logout() {
      try {
        await axiosJWT.delete("/user/logout");
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getTask();
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px auto 0 auto;
  max-width: 500px;
}

.stats-container {
  padding: 30px;
  border-radius: 10px;
  border: 2px solid var(--sapphire);
  display: flex;
  justify-content: space-between;
  gap: 50px;
  width: 100%;
}

.details {
  width: 100%;
}

#progressBar {
  width: 100%;
  height: 10px;
  background-color: var(--secondaryBackground);
  border-radius: 5px;
  margin-top: 20px;
}

#progress {
  height: 10px;
  background-color: var(--green);
  border-radius: 10px;
  transition: all 0.3s ease;
}

#numbers {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--sapphire);
  border-radius: 50%;
  font-size: 20px;
  font-weight: 700;
}

form {
  margin-top: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 16px;
}

input {
  flex: 1;
  padding: 16px;
  background: var(--secondaryBackground);
  border: 1px solid var(--sapphire);
  border-radius: 10px;
  outline: none;
  color: var(--text);
}

button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--sapphire);
  color: var(--text);
  font-size: 30px;
  font-weight: bold;
  outline: none;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
  width: 100%;
  list-style: none;
  padding: 0px;
}

.taskItem {
  display: flex;
  background-color: var(--secondaryBackground);
  padding: 10px;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
}

.task {
  display: flex;
  align-items: center;
  gap: 10px;
}

.task input {
  width: 20px;
  height: 20px;
}

.box-icon {
  width: 24px;
  height: 24px;
  margin: 2px;
  cursor: pointer;
}

.warn {
  color: var(--red);
}
</style>
