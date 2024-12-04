import LoginForm from '@/components/LoginForm';
import Link from 'next/link';
import { useLocale } from 'next-intl'; // Importer useLocale

const LoginPage = () => {
  const locale = useLocale(); // Utiliser useLocale

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full md:w-[900px] h-auto md:h-[600px] flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2 bg-white text-gray-900 flex flex-col justify-center items-center p-6">
          <LoginForm />
        </div>

        <div className="w-full md:w-1/2 bg-custom-blue text-white flex flex-col justify-center items-center p-6 md:p-8">
          <div className="w-full hidden md:block">
            <img src="/images/moscow6.jpg" alt="Login" className="rounded-2xl" />
            <br />
          </div>
          <div className="flex flex-col justify-center items-center h-full mb-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
              {locale === 'fr' ? 'Pas encore inscrit ?' : 'Not registered yet?'}
            </h2>
            <p className="mb-6 text-center text-sm md:text-base">
              {locale === 'fr'
                ? 'Créez un compte pour accéder à toutes nos fonctionnalités.'
                : 'Create an account to access all features.'}
            </p>

            <Link href={`/${locale}/inscription`}>
              <button className="px-4 py-2 md:px-6 md:py-3 bg-white text-custom-blue font-bold rounded-full hover:bg-black hover:text-white text-center">
                {locale === 'fr' ? 'Inscrivez-vous !' : 'Sign Up!'}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
