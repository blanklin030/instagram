const user = {
  state: {
    info: {
      avatar: '',
      name: '',
    },
  },
  mutations: {
    SET_USER_INFO: (state, object) => {
      state.info.avatar = object.avatar
      state.info.name = object.name;
    },
  },
  actions: {
    SetUserInfo({commit}, object) {
      commit('SET_USER_INFO', object)
    },
  }
}

export default user