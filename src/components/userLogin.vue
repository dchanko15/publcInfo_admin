<template>
    <div>
        <div class="row center-xs">
            <div class="col-xs-12 col-sm-12 col-md-9 col-lg-7">
                <section>
                    <div>
                        <form @submit.prevent="loginSubmit">
                            <div class="row ">
                                <div class="col-xs">
                                    <h2 class="header"> ავტორიზაცია</h2>
                                </div>
                            </div>

                            <div class="row ">
                                <div class="col-xs">
                                    <ui-textbox
                                            help="მომხმარებელი"
                                            :invalid="errors.has('userName')"
                                            :error="errors.first('userName')"
                                            v-validate="{required: true}"
                                            data-vv-as="მომხმარებელი"
                                            name="userName"
                                            autocomplete="off"
                                            :autofocus="true"
                                            v-model="userName">
                                    </ui-textbox>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs">
                                    <ui-textbox type="password"
                                                help="პაროლი"
                                                v-model="password"
                                                name="password"
                                                ref="password"
                                                v-validate="{required:true}"
                                                data-vv-as="პაროლი"
                                                :invalid="errors.has('password')"
                                                :error="errors.first('password')">
                                        <!--     <i slot="icon" class="fa fa-key"></i>-->

                                    </ui-textbox>
                                </div>
                            </div>
                            <div class="row ">
                                <div class="col-xs" style="text-align: right">
                                    <ui-button color="primary" icon-position="right">
                                        ავტორიზაცია
                                        <div slot="icon">
                                            <svg height="20px" width="20px" fill="white">
                                                <use xlink:href="svgicons1.svg#icon-log-in"/>
                                            </svg>
                                        </div>


                                    </ui-button>
                                </div>
                            </div>
                        </form>

                    </div>
                </section>
            </div>

        </div>
        <modal-message ref="errors-modal" :error-messages="errorMessages"
                       info="გადაამოწმეთ შეტანილი ინფორმაცია"></modal-message>
    </div>
</template>

<script>
    import ServerValidationMixin from './mixinErrors'
    import modalMessage from './modalMessage'


    export default {
        name: 'serLogin',
        mixins: [ServerValidationMixin],
        components: {
            'modal-message': modalMessage,
        },
        data: function () {
            return {
                userName: '',
                password: '',
                userId: 0,
                role: 0,
            }
        },
        mounted () {
           // this.$validator.localize('ka')
        },
        methods: {
            async loginSubmit() {
                try {
                    let validationResult = await this.$validator.validateAll();
                    if (validationResult) {

                        let postData = {Id: this.userName, Password: this.password};

                        let postRes = await this.$axios.post(this.$globalState.apiUrl+'/GetNaecUsers', postData);
                        let results = postRes.data;
                         if (this.ServerErrors(postRes)) {
                             this.displayErrors()
                         } else {

                            this.userId = +results.userId;
                            this.role =1;
                            this.loginSuccess();
                        }

                    } else {
                        this.showErrors('')
                    }
                } catch (err) {
                    this.showErrors("ამ პარამეტრებით მომხმარებელი ვერ მოიძებნა.")
                }
            },

            loginSuccess() {
                this.$globalState.user.userId = this.userId;
                this.$globalState.user.role = this.role;
                this.$router.push('/request-info');
            },
        }

    }
</script>

<style scoped>

</style>
