
<script setup lang="ts">
const user = useSupabaseUser();
</script>

<template>
    <header class="flex justify-between items-center p-4 bg-blue-500">
        <h1>Header</h1>
        <p>{{ user?.email }}</p>
    </header>
</template>

