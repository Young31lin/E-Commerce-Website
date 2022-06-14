import {REVIEW_CREATE_FAIL, REVIEW_CREATE_REQUEST, REVIEW_CREATE_RESET, REVIEW_CREATE_SUCCESS, PRODUCT_TOP_FAIL, PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS} from '../constants/ProductConstants'

export const productReducer = ( state = { products: [] }, action ) => {
    switch (action.type) {
        case 'ALL_PRODUCTS_REQUEST':
            return { loading: true, products: [] }
        case 'ALL_PRODUCTS_SUCCESS':
            return { loading: false, products: action.payload.products , page: action.payload.page, pages: action.payload.pages }
        case 'ALL_PRODUCTS_FAIL':
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productPageReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case 'PRODUCT_REQUEST':
            return { loading: true, ...state }
        case 'PRODUCT_SUCCESS':
            return { loading: false, product: action.payload}
        case 'PRODUCT_FAIL':
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productDeleteReducer = (state = { }, action) => {
    switch (action.type) {
        case 'PRODUCT_DELETE_REQUEST':
            return { loading: true }
        case 'PRODUCT_DELETE_SUCCESS':
            return { loading: false, success:true }
        case 'PRODUCT_DELETE_FAIL':
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case 'PRODUCT_CREATE_REQUEST':
            return { loading: true }
        case 'PRODUCT_CREATE_SUCCESS':
            return { loading: false, success: true, product:action.payload }
        case 'PRODUCT_CREATE_FAIL':
            return { loading: false, error: action.payload }
        case 'PRODUCT_CREATE_RESET':
            return { }

        default:
            return state
    }
}

export const productUpdateReducer = (state = { product: {}}, action) => {
    switch (action.type) {
        case 'PRODUCT_UPDATE_REQUEST':
            return { loading: true }
        case 'PRODUCT_UPDATE_SUCCESS':
            return { loading: false, success: true, product: action.payload }
        case 'PRODUCT_UPDATE_FAIL':
            return { loading: false, error: action.payload }
        case 'PRODUCT_UPDATE_RESET':
            return {product: {}}

        default:
            return state
    }
}

export const productReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case REVIEW_CREATE_REQUEST:
            return { loading: true }
        case REVIEW_CREATE_SUCCESS:
            return { loading: false, success: true}
        case REVIEW_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case REVIEW_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const productTopReducer = (state = {products:[]}, action) => {
    switch (action.type) {
        case PRODUCT_TOP_REQUEST:
            return { loading: true, products:[]}
        case PRODUCT_TOP_SUCCESS:
            return { loading: false, products:action.payload}
        case PRODUCT_TOP_FAIL:
            return { loading: false, error: action.payload}

        default:
            return state
    }
}