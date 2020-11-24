import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBmMj3nhA77DEluv4fNL9cKfLTZGxa7e8Q",
    authDomain: "fire-class-e2728.firebaseapp.com",
    databaseURL: "https://fire-class-e2728.firebaseio.com",
    projectId: "fire-class-e2728",
    storageBucket: "fire-class-e2728.appspot.com",
    messagingSenderId: "378706894754",
    appId: "1:378706894754:web:f51d0f57fa4a5e931edcfb"
};

class Firebase {
    constructor() {
        const firebaseApp = firebase.initializeApp(firebaseConfig)
        this.auth = firebaseApp.auth()
        this.db = firebaseApp.firestore()
    }
    async register(email, password, name) {
        await this.auth.createUserWithEmailAndPassword(email, password)

        this.auth.currentUser.updateProfile({
            displayName: name
        })
    }
    async login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password)
    }
    async logout() {
        return this.auth.signOut()
    }
    async addAnimal(animal) {
        if(!this.auth.currentUser) {
            return alert('No user')
        }
        return this.db.collection('animals').doc(this.auth.currentUser.uid).set({
            animal: animal
        })
    }
    getCurrentUserName() {
        return this.auth.currentUser ? this.auth.currentUser.displayName : false
    }
    authChange() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }
}

export default new Firebase()