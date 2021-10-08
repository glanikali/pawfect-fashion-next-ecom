import Shop from "../components/Shop/Shop";
import { useDispatch } from "react-redux";
import { productSliceActions } from "../store/products";


export default function Home(props) {
  const { data } = props;
  const dispatch = useDispatch();
  dispatch(productSliceActions.loadProducts(data));
  return <Shop />;
}

export const getServerSideProps = async (context) => {
  let data;
  let httpProtocol; 

  if (context.req.headers.host.includes("localhost")){
    httpProtocol = 'http';
  }
  else{
    httpProtocol = 'https';
  }
  
  try {
    const req = await fetch(`${httpProtocol}://${context.req.headers.host}/api/fetch`, {
      method: "POST",
      body: JSON.stringify({ type: "FETCH_PRODUCTS" }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    data = await req.json();
    
  } catch (error) {
    data = error;
  }
  

  return {
    props: {
      data,
    },
  };
};
