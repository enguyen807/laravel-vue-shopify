<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Register</div>
            
                    <div class="card-body">
                        <form @submit.prevent="handleSubmit()">
                            <input type="hidden" name="_token" v-bind:value="csrf">
                            <div class="form-group row">
                                <label
                                    for="fname"
                                    class="col-md-4 col-form-label text-md-right"
                                    >First Name</label
                                >

                                <div class="col-md-6">
                                    <ValidationProvider
                                        v-slot="{ errors }"
                                        name="First Name"
                                        rules="required"
                                    >
                                        <input
                                            id="fname"
                                            type="text"
                                            class="form-control"
                                            name="First Name"
                                            v-model="fname"
                                            required
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
                                    for="lname"
                                    class="col-md-4 col-form-label text-md-right"
                                    >Last Name</label
                                >

                                <div class="col-md-6">
                                    <ValidationProvider
                                        v-slot="{ errors }"
                                        name="Last Name"
                                        rules="required"
                                    >
                                        <input
                                            id="lname"
                                            type="text"
                                            class="form-control"
                                            name="Last Name"
                                            v-model="lname"
                                            required
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
                                            :type="
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            "
                                            v-model="password"
                                            required
                                            autocomplete="new-password"
                                        />
                                        <span
                                            v-show="errors[0]"
                                            class="invalid-feedback d-block"
                                            >{{ errors[0] }}</span
                                        >
                                    </ValidationProvider>
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button
                                        type="submit"
                                        class="btn btn-primary"
                                    >
                                        Register
                                    </button>
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
    name: 'RegisterComponent',
    props: ['csrf'],
    components: {
        ValidationObserver,
        ValidationProvider
    },
    data: () => ({
        fname: '',
        lname: '',
        email: '',
        password: '',
        showPassword: ''
    }),
    methods: {
        ...mapActions('account', ['register']),  
        async handleSubmit () {
            const { fname, lname, email, password } = this

            console.log('Registering User...')

            this.register({ fname, lname, email, password})
        }
    },
    computed: {
      ...mapState('account', ['status'])
    }
}
</script>
