const app = {
  state: {
    header: {
      back: {
        show: false,
        url: "",
      }
    },
    bottom: {
      show: true
    }
  },
  mutations: {
    SET_HEADER_BACK: (state, object) => {
      state.header.back.show = object.show
      state.header.back.url = object.url;
    },
    SET_BOTTOM: (state, show) => {
      state.bottom.show = show
    },
  },
  actions: {
    SetHeaderBack({commit}, object) {
      commit('SET_HEADER_BACK', object)
    },
    SetBottom({commit}, show) {
      commit('SET_BOTTOM', show)
    }
  }
}

export default app