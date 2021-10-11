import Head from "next/head";

interface CustomHeadProps {
  title: string;
  description?: string;
  ogImage?: string;
}

const CustomHead: React.FC<CustomHeadProps> = ({
  title = "Calomentor",
  description = "Gestión de mentorías de FrontendCafé",
}) => {
  return (
    <Head>
      <title>{title} - Calomentor</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
    </Head>
  );
};

export default CustomHead;
