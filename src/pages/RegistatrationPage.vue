<template>
    <div class="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-300 to-blue-200">
        <div
            class="relative w-[850px] h-[550px] bg-white m-5 rounded-3xl shadow-2xl overflow-hidden 650px:h-[calc(100vh-40px)] flex-col">
            <div
                class="absolute right-0 w-1/2 h-full flex flex-col justify-center items-center text-center p-10 max-650px:bottom-0 max-650px:w-full max-650px:h-3/4">
                <h1 class="text-3xl font-bold mb-4">Login</h1>
                <form class="w-full" @submit.prevent="login">
                    <div class="relative my-6">
                        <input type="text" placeholder="Username"
                            class="w-full p-3 pl-5 pr-12 bg-gray-200 rounded-md border-none outline-none text-gray-700">
                        <i class='bx bxs-user absolute right-4 top-1/2 transform -translate-y-1/2 text-xl'></i>
                    </div>
                    <div class="relative my-6">
                        <input type="password" placeholder="Password"
                            class="w-full p-3 pl-5 pr-12 bg-gray-200 rounded-md border-none outline-none text-gray-700">
                        <i class='bx bxs-lock-alt absolute right-4 top-1/2 transform -translate-y-1/2 text-xl'></i>
                    </div>
                    <div class="flex justify-center items-center gap-4 my-6">
                        <label class="relative inline-block w-14 h-8">
                            <input type="checkbox" class="hidden peer">
                            <span
                                class="absolute inset-0 bg-blue-300 rounded-full transition peer-checked:bg-blue-600"></span>
                            <span
                                class="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transition peer-checked:translate-x-6"></span>
                        </label>
                        <p class="text-gray-700">Remember Me</p>
                    </div>
                    <button type="submit"
                        class="w-full h-12 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition-all">
                        Login
                    </button>
                </form>
            </div>
            <div class="toggle-box">
                <div class="toggle-panel">
                    <h1>Hello, Welcome!</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        login() {
            this.$router.push('/home'); // Перенаправление на страницу /home
        }
    }
}
</script>

<style scoped>
.toggle-panel {
    position: absolute;
    width: 50%;
    height: 100%;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2;
    font-size: 36px;
    font-weight: bold;
    margin: -10px 0;
}

.toggle-box::before {
    content: '';
    position: absolute;
    left: -250%;
    width: 300%;
    height: 100%;
    background: #3B82F6;
    border-radius: 150px;
    z-index: 2;

}

@media (max-width: 650px) {
    .toggle-box::before {
        left: 0;
        top: -270%;
        width: 100%;
        height: 300%;
        border-radius: 20vw;
    }

    .toggle-panel {
        width: 100%;
        height: 30%;
    }
}
</style>
