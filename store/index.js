export const state = () => ({
  omdbToken: process.env.omdbToken
})

// getters
export const getters = {
  omdbToken: state => state.omdbToken
}
