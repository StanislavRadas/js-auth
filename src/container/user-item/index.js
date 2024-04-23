import { List } from '../../script/list'
import { USER_ROLE } from '../../script/user'

class UserItem extends List {
    constructor() {
        super()

        this.element = document.querySelector('#user-item')
        if (!this.element) throw new Error('Element is null')

        this.id = new URL(location.href).searchParams.get('id')
        if (!this.id) location.assign('/user-list')
        
        this.loadData()
    }

    loadData = async () => {
        this.updateStatus(this.STATE.LOADING)
        
        try {
            const res = await fetch(`/user-item-data?id=${this.id}`, {
                method: 'GET',
            })

            const rawData = await res.json()
            console.log("Raw data:", rawData) 

        if (res.ok) {
            const convertedData = this.convertData(rawData)
            console.log("Converted data:", convertedData)

            this.updateStatus(
                this.STATE.SUCCESS,
                convertedData,
            )
            } else {
                this.updateStatus(this.STATE.ERROR, data)
            } 
        } catch (err) {
            this.updateStatus(this.STATE.ERROR, {
                message: err.message,
            })
        }
    }

    convertData = (data) => {
        return {
            ...data,
            user: {
                ...data.user,
                role: USER_ROLE[data.user.role],
                confirm: data.user.isConfirm ? 'Yes' : 'No'
            },
        }
    }
    updateView = () => {
        this.element.innerHTML = ''
        console.log(this.status, this.data)
        switch (this.status) {
            case this.STATE.LOADING:
                this.element.innerHTML = `
                    <div class="data">
                        <span class="data__title skeleton">ID</span>
                        <span class="data__value skeleton"></span>
                    </div>
                    <div class="data">
                        <span class="data__title skeleton">Email</span>
                        <span class="data__value skeleton"></span>
                    </div>
                    <div class="data">
                        <span class="data__title skeleton">Role</span>
                        <span class="data__value skeleton"></span>
                    </div>
                    <div class="data">
                        <span class="data__title skeleton">Email is Confirm?</span>
                        <span class="data__value skeleton"></span>
                    </div>
                    `
                break
            case this.STATE.SUCCESS:
                const { id, email, role, confirm } = this.data.user;
                this.element.innerHTML = `
                <div class="data">
                        <span class="data__title">ID</span>
                        <span class="data__value">${id}</span>
                    </div>
                    <div class="data">
                        <span class="data__title">Email</span>
                        <span class="data__value">${email}</span>
                    </div>
                    <div class="data">
                        <span class="data__title">Role</span>
                        <span class="data__value">${role}</span>
                    </div>
                    <div class="data">
                        <span class="data__title">Email is Confirm?</span>
                        <span class="data__value">${confirm}</span>
                    </div>
                `
                break
            case this.STATE.ERROR:
                this.element.innerHTML = `
                <span class="alert alert--error">${this.data.message}</span>
                `
                break
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
            if (!window.session || !window.session.user.isConfirm) {
            location.assign('/')
        }
    } catch (err) {
        
    }

    new UserItem()
})