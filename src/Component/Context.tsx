import React from 'react'
import store from '../Mobx/Store'

const Context = React.createContext(store)

export const Provider = Context.Provider
export const Consumer = Context.Consumer
export default Context