async function fetchProducts(){
const response = await fetch('https://fakestoreapi.com/products');
if(!response.ok){
  throw new Error('Failed to fetch products');
}
const data = await response.json();
return data;