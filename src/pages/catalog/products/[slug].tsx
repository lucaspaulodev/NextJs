import { client } from '@/lib/prismic'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'
import { Document } from 'prismic-javascript/types/documents'

interface IProductProps {
  product: Document;
}

export default function Product({product}: IProductProps) {
  const router = useRouter()

  if(router.isFallback){
    return <p>Loading...</p>
  }

  return(
    <div>
      <h1>
        {PrismicDOM.RichText.asText(product.data.title)}
      </h1>

      <img src={product.data.thumbnail.url} width="300" alt=""/>

      <div dangerouslySetInnerHTML={{ __html: PrismicDOM.RichText.asHtml(product.data.description)}}></div>

      <p>Price: ${product.data.price}</p>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<IProductProps> = async (context) => {
  const {slug} = context.params

  const product = await client().getByUID('product', String(slug), {})

  return {
    props: {
      product,
    },
    revalidate: 5,
  }
}