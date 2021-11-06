import Head from 'next/head';

interface CustomHeadProps {
  title: string;
  description?: string;
  ogImage?: string;
}

const CustomHead: React.FC<CustomHeadProps> = ({
  title = 'FrontendCafé',
  description = 'Gestión de mentorías de FrontendCafé',
}) => {
  return (
    <Head>
      <title>{title} - Calomentor</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
      {/* Imports */}
      <script
        type="text/javascript"
        src="https://addevent.com/libs/atc/1.6.1/atc.min.js"
        async
        defer
      ></script>
    </Head>
  );
};

export default CustomHead;
