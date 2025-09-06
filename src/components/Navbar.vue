<template>
  <div class="navbar bg-red-700 shadow-sm w-full">
    <div class="flex-1">
      <router-link to="/" class="btn btn-ghost text-xl text-white"
        >daisyUI</router-link
      >
    </div>
    <div class="flex gap-2">
      <!-- button -->
      <a class="btn btn-ghost text-white">賽程</a>
      <a class="btn btn-ghost text-white">車手</a>
      <router-link to="/posts" class="btn btn-ghost text-white"
        >留言板</router-link
      >
      <a class="btn btn-ghost text-white">NEWS</a>
      <button class="btn btn-outline text-white">積分榜</button>

      <!-- Search -->
      <input
        type="text"
        placeholder="Search"
        class="input input-bordered w-24 md:w-auto"
      />
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
