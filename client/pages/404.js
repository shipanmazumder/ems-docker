import Link from 'next/link';
import { Heading, Button } from '@chakra-ui/react';
import Layout from '@/components/Layout';

export default function PageNotFound() {
  return (
    <Layout metaTitle={'Page Not Found'}>
      <section className="mt-5 pt-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <Heading as="h1" size="4xl" className="mb-3">
                  404
                </Heading>
                <p className="mb-4">
                  Oops. The page you're looking for doesn't exist.
                </p>
                <Link href="/">
                  <Button
                    fontSize={'sm'}
                    fontWeight={600}
                    color={'white'}
                    bg={'teal.400'}
                    _hover={{
                      bg: 'teal.500',
                    }}
                    _focus={{
                      color: 'white',
                    }}
                  >
                    Back to home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
