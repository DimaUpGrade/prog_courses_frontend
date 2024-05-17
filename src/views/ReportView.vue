<template>
    <NavBar></NavBar>
    <div class="wrapper report-wrapper">
        <div class="report-content">
            <h1>Сообщить об ошибке</h1>
            <div class="label-and-fields-report">
                <div class="data-labels-report">
                    <p>Заголовок:</p>
                    <p>Описание:</p>
                </div>
                <div class="data-fields-report">
                    <input id="report-title" type="text" placeholder="Опишите проблему кратко" v-model="report_header">
                    <p class="error-p" id="report-title-error-p"></p>
                    <textarea name="" id="textarea-report" placeholder="Опишите проблему поподробнее"
                        v-model="report_text"></textarea>
                    <p class="error-p" id="report-text-error-p"></p>
                </div>
            </div>
            <button class="button-shadow button-general button-default-border" id="send-report-button"
                @click="submitReport">Отправить</button>
        </div>

    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { sendReport } from '../network'

export default {
    name: 'ReportView',
    components: {
        NavBar
    },
    data() {
        return {
            report_header: "",
            report_text: "",
            header_validation: false,
            text_validation: false
        }
    },
    methods: {
        async submitReport() {
            if (this.header_validation == true && this.text_validation == true) {
                let result;
                result = await sendReport(this.report_header, this.report_text);
            }
            else {
                swal({ title: 'Ошибка!', text: 'Проверьте правильность заполнения полей!' })
            }
        },
        test() {
            alert('texx')
        }
    },
    watch: {
        report_header(new_header) {
            if (new_header.trim().length >= 10) {
                $('#report-title').css('border', '3px solid greenyellow')
                $('#report-title-error-p').html('')
                this.header_validation = true
            }
            else {
                $('#report-title').css('border', '3px solid red')
                $('#report-title-error-p').html('Не менее 10 символов!')
                this.header_validation = false
            }
        },
        report_text(new_text) {
            if (new_text.trim().length >= 20) {
                $('#textarea-report').css('border', '3px solid greenyellow')
                $('#report-text-error-p').html('')
                this.text_validation = true
            }
            else {
                $('#textarea-report').css('border', '3px solid red')
                $('#report-text-error-p').html('Не менее 20 символов!')
                this.text_validation = false
            }
        }
    }
}
</script>

<style>
.report-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.report-content {
    background-color: var(--bright-background);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 80%;
    padding: 2%;
    color: white;
    border-radius: 5px;
    box-shadow:
        0 1px 1px hsl(0deg 0% 0% / 0.075),
        0 2px 2px hsl(0deg 0% 0% / 0.075),
        0 4px 4px hsl(0deg 0% 0% / 0.075),
        0 8px 8px hsl(0deg 0% 0% / 0.075),
        0 16px 16px hsl(0deg 0% 0% / 0.075);
}

#textarea-report {
    width: 100%;
    height: 320px;
    resize: none;
    border-radius: 5px;
    font-size: 18px;
}

.label-and-fields-report {
    display: flex;
    margin: 30px 0 0 0;
    padding: 0 2em;
    width: 90%;
}

.data-fields-report {
    margin: 1em;
    display: flex;
    flex-direction: column;
    /* gap: 1.6em; */
    width: 100%;
    margin: 11px 20px;
}

.data-labels-report {
    display: flex;
    flex-direction: column;
    margin: 0;
    gap: 1em;
}

#report-title {
    width: 100%;
    border-radius: 5px;
    height: 24px;
    font-size: 18px;
}

#send-report-button {
    padding: 10px;
    margin-bottom: 7em;
    width: 30em;
}
</style>