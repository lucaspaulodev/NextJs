import { GetServerSideProps } from 'next'
import Link from 'next/link'
import {Title} from '@/styles/pages/Home'
import SEO from '@/components/SEO';
import Prismic from 'prismic-javascript'
import { client } from '@/lib/prismic';
import PrismicDOM from 'prismic-dom'
import {Document} from 'prismic-javascript/types/documents'

interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({recommendedProducts}: HomeProps) {

  return (
    <div>
      <SEO 
        title="DevCommerce, your best place to buy"
        image="og.png"
        shoudExcludeTitleSuffix
      />

      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>

                <Link href={`/catalog/product/${recommendedProduct.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                  </a>  
                </Link>
                
              </li>
            )
          })}
        </ul>
      </section>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ])

  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    }
  }
}
