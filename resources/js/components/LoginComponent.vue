<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Login</div>

                    <div class="card-body">
                        <form @submit.prevent="handleSubmit()">
                            <input type="hidden" name="_token" v-bind:value="csrf">
                                                        <div class="form-group row">
                                <label
                                    for="email"
                                    class="col-md-4 col-form-label text-md-right"
                                    >E-Mail Address</label
                                >

                                <div class="col-md-6">
                                    <ValidationProvider
                                        v-slot="{ errors }"
                                        name="Email"
                                        rules="required|email"
                                    >
                                        <input
                                            id="email"
                                            type="email"
                                            class="form-control"
                                            name="email"
                                            v-model="email"
                                            required
                                            autocomplete="email"
                                        />
                                        <span
                                            v-show="errors[0]"
                                            class="invalid-feedback d-block"
                                            >{{ errors[0] }}</span
                                        >
                                    </ValidationProvider>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label
                                    for="password"
                                    class="col-md-4 col-form-label text-md-right"
                                    >Password</label
                                >

                                <div class="col-md-6">
                                    <ValidationProvider
                                        v-slot="{ errors }"
                                        name="Password"
                                        rules="required|min:6"
                                    >
                                        <input
                                            id="password"
                                            class="form-control"
                                            name="Password"
                                            v-model="password"
                                            type="password"
                                            required
                                            autocomplete="current-password"
                                        />
                                        <span
                                            v-show="errors[0]"
                                            class="invalid-feedback d-block"
                                            >{{ errors[0] }}</span
                                        >
                                    </ValidationProvider>
                                </div>
                            </div>                            
                            
                            <div class="form-group row">
                                <div class="col-md-6 offset-md-4">
                                    <div class="form-check">
                                        <input class="form-check-input"
                                        type="checkbox" name="remember"
                                        id="remember"
                                        v-model="rememberMe"
                                        >

                                        <label
                                            class="form-check-label"
                                            for="remember"
                                        >
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button
                                        type="submit"
                                        class="btn btn-primary"
                                    >
                                        Login
                                    </button>

                                    
                                    <a
                                        class="btn btn-link"
                                        href="#"
                                    >
                                        Forgot Your Password?
                                    </a>
                                    
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import { required, email, min } from 'vee-validate/dist/rules'
import {
    extend,
    ValidationObserver,
    ValidationProvider,
    setInteractionMode
} from 'vee-validate'

setInteractionMode('eager')

extend('required', {
    ...required,
    message: '{_field_} can not be empty'
})

extend('min', {
    ...min,
    message: '{_field_} must contain at least {length} characters.'
})

extend('email', {
    ...email,
    message: 'Email must be valid'
})

export default {
    name: 'LoginComponent',
    props: ['csrf'],
    components: {
        ValidationObserver,
        ValidationProvider
    },
    data: () => ({
        email: '',
        password: '',
        rememberMe: false,
    }),
    methods: {
        ...mapActions('account', ['login']),  
        async handleSubmit () {
            const { email, password, rememberMe } = this

            console.log('Logging User in...')

            await this.login({ email, password, rememberMe })
        }
    },
    computed: {
      ...mapState('account', ['status'])
    }
}
</script>
