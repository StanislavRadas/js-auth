import { Form, REG_EXP_EMAIL, REG_EXP_PASSWORD } from '../../script/form';
import { saveSession } from '../../script/session';


class SignupForm  extends Form {
    
    FIELD_NAME = {
        EMAIL: 'email',
        PASSWORD: 'password',
        PASSWORD_AGAIN: 'passwordAgain',
        ROLE: 'role',
        IS_CONFIRM: 'isConfirm',
    }

    FIELD_ERROR = {
        IS_EMPTY: 'Type value in field!',
        IS_BIG: 'Value is to long!',
        EMAIL: 'Type correct value of email!',
        PASSWORD: 'Password must contain at least 8 symbol!',
        PASSWORD_AGAIN: 'Password must be the same with first',
        NOT_CONFIRM: 'You must agree with privacy policy',
        ROLE: 'Please choose the role!',
    }
    
    validate = (name, value) => {
        if (String(value).length < 1) {
            return this.FIELD_ERROR.IS_EMPTY
        }
        if (String(value).length > 20) {
            return this.FIELD_ERROR.IS_BIG
        }
        if (name === this.FIELD_NAME.EMAIL) {
            if (!REG_EXP_EMAIL.test(String(value))) {
                return this.FIELD_ERROR.EMAIL
            }
        }
        if (name === this.FIELD_NAME.PASSWORD) {
            if (!REG_EXP_PASSWORD.test(String(value))) {
                return this.FIELD_ERROR.PASSWORD
            }
        }
        if (name === this.FIELD_NAME.PASSWORD_AGAIN) {
            if (String(value) !== this.value[this.FIELD_NAME.PASSWORD]) {
                return this.FIELD_ERROR.PASSWORD_AGAIN
            }
        }
        if (name === this.FIELD_NAME.ROLE) {
            if (isNaN(value)) {
                return this.FIELD_ERROR.ROLE
            }
        }
        if (name === this.FIELD_NAME.IS_CONFIRM) {
            if (Boolean(value) !== true) {
                return this.FIELD_ERROR.NOT_CONFIRM
            }
        }
    }

    submit = async () => {
        if (this.disabled === true) {
            this.validateAll()
        } else {
            console.log(this.value)

            this.setAlert('progress', 'Downloading')

            try {
                const res = await fetch('/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                    body: this.convertData(),
                })
                
                const data = await res.json()

                if (res.ok) {
                    this.setAlert('success', data.message)
                    saveSession(data.session)
                    location.assign('/')
                } else {
                    this.setAlert('error', data.message)
                }

            } catch (error) {
                this.setAlert('error', error.message)
            }
        }
    }

    convertData = () => {
        return JSON.stringify({
            [this.FIELD_NAME.EMAIL]: this.value[this.FIELD_NAME.EMAIL],
            [this.FIELD_NAME.PASSWORD]: this.value[this.FIELD_NAME.PASSWORD],
            [this.FIELD_NAME.ROLE]: this.value[this.FIELD_NAME.ROLE],
        })
    }
}

window.signupForm =  new SignupForm()