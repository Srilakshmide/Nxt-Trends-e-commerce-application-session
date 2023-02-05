import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    showProducts: true,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const apiUrl = 'https://apis.ccbp.in/products'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        imageUrl: product.image_url,
        id: product.id,
        price: product.price,
        rating: product.rating,
      }))
      this.setState({productsList: updatedData, showProducts: false})
    }
  }

  renderProductsList = () => {
    const {productsList} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {showProducts} = this.state

    return (
      <>
        {showProducts ? (
          <div data-testid="loader" className="products-loader-container">
            <Loader type="Oval" color="#324f4b" height={50} width={50} />
          </div>
        ) : (
          this.renderProductsList()
        )}
      </>
    )
  }
}

export default AllProductsSection
