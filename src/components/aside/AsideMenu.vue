<template>
    <aside class="sidebar flex h-screen transition-all duration-300 absolute" :class="{ 'expanded': isExpanded }">
        <nav class="flex-none bg-white shadow-md">
            <!-- Navigation content -->
            <ul id="primary-navigation" class="space-y-4 p-2">
                <li class="mb-1.5 rounded-sm relative group" @click="toggleSidebar">
                    <a href="#"
                        class="flex h-9 gap-3 items-center  text-decoration-none overflow-hidden whitespace-nowrap border-none outline-none">
                        <i class="far fa-folder-open text-indigo-500"></i>
                        <span v-if="isExpanded" class="flex-1 text-gray-800 capitalize">open file</span>
                    </a>
                </li>
                <li class="mb-1.5 rounded-sm relative group" @click="toggleSidebar">
                    <a href="#"
                        class="flex h-9 gap-3 items-center text-decoration-none overflow-hidden whitespace-nowrap border-none outline-none">
                        <i class="far fa-address-book text-indigo-500" ></i>
                        <span v-if="isExpanded" class="flex-1 text-gray-800 capitalize">address</span>
                    </a>
                </li>
                <li class="mb-1.5 rounded-sm relative group" @click="toggleSidebar">
                    <a href="#"
                        class="flex h-9 gap-3 items-center text-decoration-none overflow-hidden whitespace-nowrap border-none outline-none">
                        <i class="far fa-calendar text-indigo-500" ></i>
                        <span v-if="isExpanded" class="flex-1 text-gray-800 capitalize">calendar</span>
                    </a>
                </li>
                <li class="mb-1.5 rounded-sm relative group" @click="toggleSidebar">
                    <a href="#"
                        class="flex h-9 gap-3 items-center text-decoration-none overflow-hidden whitespace-nowrap border-none outline-none">
                        <i class="far fa-comment text-indigo-500" ></i>
                        <span v-if="isExpanded" class="flex-1 text-gray-800 capitalize">new message</span>
                    </a>
                </li>
                <li class="mb-1.5 rounded-sm relative group" @click="toggleSidebar">
                    <a href="#"
                        class="flex h-9 gap-3 items-center text-decoration-none overflow-hidden whitespace-nowrap border-none outline-none">
                        <i class="far fa-image text-indigo-500" ></i>
                        <span v-if="isExpanded" class="flex-1 text-gray-800 capitalize">image</span>
                    </a>
                </li>
            </ul>

            <!-- Пользовательская навигация -->
            <ul id="primary-navigation" class="space-y-4 p-2">
                <li class="mb-1.5 rounded-sm relative group" @click="toggleSidebar">
                    <a href="#"
                        class="flex h-9 gap-3 items-center text-decoration-none overflow-hidden whitespace-nowrap border-none outline-none">
                        <i class="fas fa-shield-alt text-indigo-500" ></i>
                        <span v-if="isExpanded" class="flex-1 text-gray-800 capitalize">protection</span>
                    </a>
                </li>
                <li class="mb-1.5 rounded-sm relative group" @click="toggleSidebar">
                    <a href="#"
                        class="flex h-9 gap-3 items-center text-decoration-none overflow-hidden whitespace-nowrap border-none outline-none">
                        <i class="fas fa-user-cog text-indigo-500" ></i>
                        <span v-if="isExpanded" class="flex-1 text-gray-800 capitalize">user settings</span>
                    </a>
                </li>
                <li class="mb-1.5 rounded-sm relative group" @click="toggleSidebar">
                    <a href="#"
                        class="flex h-9 gap-3 items-center text-decoration-none overflow-hidden whitespace-nowrap border-none outline-none">
                        <i class="fas fa-cog text-indigo-500" ></i>
                        <span v-if="isExpanded" class="flex-1 text-gray-800 capitalize">settings</span>
                    </a>
                </li>
                <li class="mb-1.5 rounded-sm relative group" @click="toggleSidebar">
                    <a href="#"
                        class="flex h-9 gap-3 items-center text-decoration-none overflow-hidden whitespace-nowrap border-none outline-none">
                        <i class="fas fa-power-off text-indigo-500" ></i>
                        <span v-if="isExpanded" class="flex-1 text-gray-800 capitalize">power off</span>
                    </a>
                </li>
            </ul>
        </nav>
    </aside>
</template>


<script>
export default {
    name: 'Sidebar',
    data() {
        return {
            isExpanded: false
        };
    },
    watch: {
        isExpanded(newValue) {
            this.$emit('sidebar-toggle', newValue);
        }
    },
    methods: {
        toggleSidebar() {
            this.isExpanded = !this.isExpanded;
        }
    }
};
</script>

<style scoped>
.sidebar {
    width: 35px;
    transition: width 0.3s ease-in-out;
}

.sidebar.expanded {
    width: 140px;
}
</style>
