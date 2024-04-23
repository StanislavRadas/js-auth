export class List {
    STATE = {
        LOADING: 'loading',
        SUCCESS: 'success',
        ERROR: 'error',
    }

    status = null
    data = null
    element = null

    updateStatus = (status, data) => {
    this.status = status;
    if (data !== null && data !== undefined) {
        this.data = data;
    }
    this.updateView();
}

    updateView = () => {

    }

    loadData = async () => {

    }

    convertData = () => {

    }
}