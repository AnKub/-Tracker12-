async function fetchProducts(){
const response = await fetch('https://fakestoreapi.com/products');
if(!response.ok){
  throw new Error('Failed to fetch products');
}
const data = await response.json();
return data;
}

function normalizeName (name){
 const value = name?.trim().replace(/^the\s+/i,'');  
 return value || 'unknown';
}

function normalizeDate(data) {
  return data.map((item)=> {
    return {
      ...item,
      name:normalizeName(item.name)
    };
  });
}

function getRange(price){
  if(price>=1 && price <=100)return '1-100';
  if(price<=200)return '101-200';
  if(price<=300)return '201-300';
  if(price<=400)return '301-400';
  if(price <=500)return '401-500';
  if(price > 500)return '500+';
return null;
}

