<template>
    <div class="alert" :class="alert">
        <div class="toast" :class="notificationType ? 'toast_error' : 'toast_success'">
            <div class="toast_header">
                <button type="button" class="btn-close" @click="reset"></button>
            </div>
            <div class="rounded">
                <div v-if="notificationType" class="logo logo_error"></div>
                <div v-else class="logo logo_success"></div>
            </div>
            <div class="toast_body">
                <div class="content">
                    <p class="title"><strong>{{this.type}}</strong></p>
                    <p v-html="this.response"></p>
                </div>
                <div class="progress">
                    <div class="progress_bar" :style="{width: `${progress}%`}"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        data() {
            return {
                progress: 0,
                time: Number
            }
        },
        methods: {
            /**
             * Reset the notification
             */
            reset() {
                this.$store.commit('toast/RESET');
                clearInterval(this.time);
                setTimeout(() => {
                    this.progress = 0;
                }, 500);
            }
        },
        computed: {
            ...mapGetters('toast/', [
                'hidden',
                'type',
                'response'
            ]),
            notificationType() {
                return this.type === 'Error' ? true : false
            },
            alert() {
                if (this.hidden === true) {
                    return 'alert_show';
                } else if (this.hidden === false) {
                    return 'alert_hidden';
                } else {
                    return '';
                }
            }
        },

        watch: {
            hidden(value) {
                if (value) {
                    this.time = setInterval(() => {
                        this.progress++
                        this.progress === 105 ? this.reset() : '';
                    }, 100)
                }
            }
        },
    }
</script>

<style lang="scss">
    .alert {
        z-index: 100;
        position: absolute;
        top: 60px;
        display: none;
        transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);

        &_show {
            animation-name: bounceInRight;
            animation-duration: .3s;
            animation-fill-mode: forwards;
            right: 20px;
            display: flex;
        }

        &_hidden {
            animation-name: bounceInLeft;
            animation-duration: .3s;
            animation-fill-mode: forwards;
            right: 0px;
            display: flex;
        }
    }

    .toast {
        overflow: hidden;
        width: 250px;
        min-height: 80px;
        height: auto;
        font-size: .875rem;
        background-color: rgba(255, 255, 255, 1);
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, .1);
        box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, .1);
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
        opacity: 1;
        border-radius: .40rem;
        display: flex;

        &_header {
            position: absolute;
            right: 0;
            color: black;
        }

        & .rounded {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &_error .rounded {
            width: 30%;
            height: auto;
            background-color: rgb(255, 78, 78);
            border-radius: 0 55% 0% 0%;
        }

        &_success .rounded {
            width: 30%;
            height: auto;
            background-color: rgb(0, 210, 167);
            border-radius: 0 55% 0% 0%;
            position: relative;
        }

        .logo{
            position: relative;
            width: 25px;

            &::before{
                content: " ";
                display: block;
                width: 25px;
                border-top: 4px solid rgb(255, 255, 255);
                transform: rotate(-45deg);
            }

            &_error::before{
                position: absolute;
            }

            &::after{
                position: absolute;
                display: block;
                content: " ";
                border-top: 4px solid rgb(255, 254, 254);
                transform: rotate(45deg);
            }

            &_success::after{
                width: 15px;
                left: -6px;
            }

            &_error::after{
                width: 25px;
            }

        }

        &_body {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .content {
                padding: .75rem .55rem;
                display: inline-flex;
                flex-direction: column;
                justify-content: center;
                text-align: initial;
            }

            p:first-child {
                font-size: 15px;
            }

            p {
                margin: 0;
                padding: .15rem;
                margin-bottom: .15rem;
                white-space: pre-wrap;
                font-size: 13px;
            }
        }

        
        .btn-close {
            background: #fff;
            border: none;
            cursor: pointer;
            padding: 0;
            transition: all .2s ease-in;
            width: 30px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            outline: none;
            appearance: none;

            &:focus {
                border: none;
                appearance: none;
            }

            &::before {
                content: " ";
                display: block;
                position: absolute;
                width: 14px;
                opacity: 1;
                border-top: 3px solid rgb(124, 124, 124);
                transform: rotate(-45deg);
                transition: .4s;
            }

            &::after {
                content: " ";
                display: block;
                position: absolute;
                width: 14px;
                opacity: 1;
                border-top: 3px solid rgb(124, 124, 124);
                transform: rotate(45deg);
                transition: .4s;
            }

            &:hover {

                &::after,
                &::before {
                    border-color: #000;
                    transition: .4s;
                }
            }
        }
    }


    .progress {
        display: flex;
        height: .35rem;
        overflow: hidden;
        background-color: #e9ecef;
        border-radius: 30px;
        position: relative;
        bottom: 0;

        &_bar{
            display: flex;
            flex-direction: column;
            justify-items: center;
            color: #fff;
            text-align: center;
            background: linear-gradient(45deg, #1a7ecf, rgb(0, 210, 167));
            transition: width .6s ease;
            border-radius: 30px;
            width: 50%;
        }
    }

    @keyframes bounceInRight {
        0% { transform: translate3d(100%, 0, 0);}
        100% {transform: translate3d(0%, 0, 0);}
    }

    @keyframes bounceInLeft {
        0% {transform: translate3d(0%, 0, 0);}
        100% {transform: translate3d(100%, 0, 0);}
    }

</style>