import {gql} from "@apollo/client";
export const getProducts = gql`
query category($title:String!){
    category(input:{title:$title}) {
      name,
      products{
        id
        name,
        gallery,
        prices {
          amount,
          currency{
            symbol
          }
        } 
      }
    }
  }
`

export const getMeta = gql`
query currencies {
    currencies {
        label,
        symbol
    }
    categories{
        name
    }
}`

export const getProduct = gql`
query product($id:String!) {
  product(id:$id) {
    id,
    inStock,
    gallery,
    description,
    attributes {
      name,
      type,
    	items{
        displayValue,
        value
      }
    },
    prices {
      amount
      currency {
        symbol
      }
    }
    brand
  }
}`