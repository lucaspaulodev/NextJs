import { GetStaticProps } from "next";
import { Title } from "../styles/pages/Home";

interface IProducts {
  id: string;
  title: string;
}

interface ITop10Props {
  products: IProducts[];
}

export default function Top10({ products }: ITop10Props) {
  return (
    <div>
      <Title>Top 10</Title>

      <ul>
          {products.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                {recommendedProduct.title}
              </li>
            )
          })}
        </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps<ITop10Props> = async (context) => {
  const response = await fetch('http://localhost:3333/products')
  const products = await response.json();

  return {
    props: {
      products,
    },
    revalidate: 5,
  }
}