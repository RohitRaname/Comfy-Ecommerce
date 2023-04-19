import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const {filtered_products:products,grid_view}= useFilterContext()

  if(products<1) return <h4>No products matched...</h4>

  if(grid_view) return <GridView products={products} />
  return <ListView products={products} />
  
}

export default ProductList
