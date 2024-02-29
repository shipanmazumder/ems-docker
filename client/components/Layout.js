import Head from 'next/head';
import Header from '@/components/Header';
// import Footer from '@/components/Footer';

export default function Layout({
  metaTitle,
  metaDescription,
  metaAuthor,
  metaKeyword,
  children,
}) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <title>{metaTitle}</title>

        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="keyword" content={metaKeyword} />
        <meta name="author" content={metaAuthor} />
        <meta name="description" content={metaDescription} />

        <link
          rel="shortcut icon"
          href="/images/favicon.png"
          type="image/x-icon"
        />
      </Head>

      <Header />

      {children}

      {/* <Footer /> */}
    </>
  );
}

Layout.defaultProps = {
  metaTitle: 'Exam Manegement System',
  metaDescription: 'Manegement System for Exam',
  metaAuthor: 'AUthor',
  metaKeyword: 'Exam, Manegement, System',
};
