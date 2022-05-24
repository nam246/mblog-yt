import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '../firebase/firebaseInit'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      {blogTitle: 'blog card #1', blogCoverPhoto: 'stock-1', blogDate: 'May 1, 2022'},
      {blogTitle: 'blog card #2', blogCoverPhoto: 'stock-2', blogDate: 'May 1, 2022'},
      {blogTitle: 'blog card #3', blogCoverPhoto: 'stock-3', blogDate: 'May 1, 2022'},
      {blogTitle: 'blog card #4', blogCoverPhoto: 'stock-4', blogDate: 'May 1, 2022'}
    ],
    editPost: null,
    user: null,
    profileEmail: null,
    profileFirstname: null,
    profileLastname: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload
      console.log(state.editPost);
    },
    updateUser(state, payload) {
      state.user = payload
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id
      state.profileEmail = doc.data().email;
      state.profileFirstname = doc.data().firstName;
      state.profileLastname = doc.data().lastName;
      state.profileUsername = doc.data().username;
    },
    setProfileInitials(state) {
      state.profileInitials = 
        state.profileFirstname.match(/(\b\S)?/g).join('') +
        state.profileLastname.match(/(\b\S)?/g).join('')
    },
    changeFirstName(state, payload) {
      state.profileFirstname = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeEmail(state, payload) {
      state.profileEmail = payload;
    },
  },
  actions: {
    async getCurrentUser({commit}) {
      const database = await db.collection('users').doc(firebase.auth().currentUser.uid);
      const dbResults = await database.get();
      commit('setProfileInfo', dbResults);
      commit('setProfileInitials');
      // console.log(dbResults);
    },
    async updateUserSettings({commit, state}) {
      const database = await db.collection('users').doc(state.profileId);
      await database.update({
        firstName: state.profileFirstname,
        lastName: state.profileLastname,
        username: state.profileUsername,
      })
      commit('setProfileInitials');
    }
  },
  modules: {
  }
})
