import firebase from '@/utils/firebase'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    unsubscribeAuthObserver: null
  },
  getters: {
  },
  actions: {
    initAuthentication({ commit, state }) {
      return new Promise((resolve) => {
        if (state.unsubscribeAuthObserver) {
          state.unsubscribeAuthObserver();
        }
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          if (user) {
            commit('setIsAuthenticated', true)
            resolve(user)
          } else {
            commit('setIsAuthenticated', false)
            resolve(null)
          }
        })
        commit('setUnsubscribeAuthObserver', unsubscribe)
      })
    },
    signinWithEmailAndPassword(context, { email, password }) {
      return firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
        })
    },
    signOut() {
      return firebase.auth().signOut()
    }
  },
  mutations: {
    setUnsubscribeAuthObserver(state, unsubscribe) {
      Vue.set(state, 'unsubscribeAuthObserver', unsubscribe)
    },
    setIsAuthenticated(state, status) {
      state.isAuthenticated = status;
    }
  }
}