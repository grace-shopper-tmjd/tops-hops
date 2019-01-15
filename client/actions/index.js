import {
  GET_ALL_BEERS,
  GET_A_BEER,
  GET_ALL_ORDERS,
  GET_AN_ORDER,
  ADD_TO_CART,
  GET_USER_CART,
  UPDATE_CART_ITEM,
  DELETE_ITEM_FROM_CART,
  GET_USER,
  REMOVE_USER,
  CREATE_USER,
  GET_ORDER_DETAILS
} from './types'

import axios from 'axios'
import history from '../history'

// ------------------ Action Creators ------------------
// =====================================================
// =====================================================

// Action Creator - BEER

export const gotAllBeersFromServer = beers => {
  return {
    type: GET_ALL_BEERS,
    beers
  }
}

export const gotSingleBeerFromServer = singleBeer => {
  return {
    type: GET_A_BEER,
    selectedBeer: singleBeer
  }
}

// Action Creator - ORDER

export const gotAllOrdersFromServer = orders => {
  return {
    type: GET_ALL_ORDERS,
    orders
  }
}

export const gotSingleOrderFromServer = singleOrder => {
  return {
    type: GET_AN_ORDER,
    selectedOrder: singleOrder
  }
}

export const gotOrderDetails = orderDetails => {
  return {
    type: GET_ORDER_DETAILS,
    orderDetails: orderDetails
  }
}

// Action Creator - CART
export const addedItemToCart = beer => {
  return {
    type: ADD_TO_CART,
    item: beer
  }
}

export const gotUserCartFromServer = userCart => {
  return {
    type: GET_USER_CART,
    selectedCart: userCart
  }
}

export const updatedCartItem = beer => {
  return {
    type: UPDATE_CART_ITEM,
    item: beer
  }
}

export const deletedItemFromCart = id => {
  return {
    type: DELETE_ITEM_FROM_CART,
    id
  }
}

// Action Creator - User

const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const createdUserForServer = user => {
  return {
    type: CREATE_USER,
    user
  }
}

// ------------------ Thunk Creators -------------------
// =====================================================
// =====================================================

// Thunk Creator - Beer
// ===========================================

export const fetchAllBeers = () => async dispatch => {
  const {data} = await axios.get('/api/beers')
  const beers = data
  const action = gotAllBeersFromServer(beers)
  dispatch(action)
}

export const fetchSingleBeer = beerId => async dispatch => {
  const {data} = await axios.get(`/api/beers/${beerId}`)
  const beer = data
  const action = gotSingleBeerFromServer(beer)
  dispatch(action)
}
// Thunk Creator - Order
// ===========================================

export const fetchAllOrders = userId => async dispatch => {
  const {data} = await axios.get(`/api/orders/${userId}`)
  const orders = data
  const action = gotAllOrdersFromServer(orders)
  dispatch(action)
}

// export const fetchSingleOrder = orderId => async dispatch => {
//   const {data} = await axios.get(`/api/orders/details/${orderId}`)
//   const order = data
//   const action = gotSingleOrderFromServer(order)
//   dispatch(action)
// }

export const fetchOrderDetails = orderId => async dispatch => {
  const {data} = await axios.get(`/api/orders/details/${orderId}`)
  const orderDetails = data
  const action = gotOrderDetails(orderDetails)
  dispatch(action)
}
// Thunk Creator - CART
// ===========================================

// need user id
// add try and catch block
export const fetchUserCart = () => async dispatch => {
  const {data} = await axios.get(`/api/orders/3/cart`)
  const action = gotUserCartFromServer(data)
  dispatch(action)
}

export const addToCart = item => async dispatch => {
  const {data} = await axios.post('/api/orders/3/cart/add', item)
  const action = addedItemToCart(data)
  dispatch(action)
}

export const updateCartItem = item => async dispatch => {
  const {data} = await axios.put(`/api/orders/3/cart/${item.id}`, item)
  const action = updatedCartItem(data)
  dispatch(action)
}

export const deleteFromCart = id => async dispatch => {
  try {
    await axios.delete(`/api/orders/3/cart/${id}`)
    dispatch(deletedItemFromCart(id))
  } catch (error) {
    console.log(error)
  }
}

// Thunk Creator - User
// ===========================================

export const me = () => async dispatch => {
  const defaultUser = {}
  try {
    const res = await axios.get('/api/users/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/api/users/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    // history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const createOneUser = (user, history) => async dispatch => {
  console.log('created User', user)
  try {
    const {data} = await axios.post('/api/users/auth/registration', user)
    const newUser = data
    const action = createdUserForServer(newUser)
    history.push('/home')
    dispatch(action)
  } catch (error) {
    console.error(error)
  }
}
