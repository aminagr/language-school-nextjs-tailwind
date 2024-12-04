import SignupForm from '@/components/SignupForm';
import Link from 'next/link';
import { useLocale } from 'next-intl'; 

const SignupPage = () => {
  const locale = useLocale();

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 py-8">
      <div className="w-full md:w-[1100px] flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        
   
        <div className="w-full md:w-1/2 bg-custom-blue text-white flex flex-col justify-center items-center p-6">
          <SignupForm />
        </div>


        <div className="w-full md:w-1/2 bg-white text-custom-blue flex flex-col justify-center items-center p-6 md:p-8">
          <div className="w-full hidden md:block mb-4">
            <img 
              src="/images/hero.jpg" 
              alt="Sign Up" 
              
            />
          </div>
          <div className="flex flex-col justify-center items-center h-full mb-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
              {locale === 'fr' ? 'Déjà inscrit ?' : 'Already registered?'}
            </h2>
            <p className="mb-6 text-center text-sm md:text-base">
              {locale === 'fr'
                ? 'Connectez-vous pour accéder à votre compte.'
                : 'Log in to access your account.'}
            </p>

            <Link href={`/${locale}/connexion`}>
              <button className="px-4 py-2 md:px-6 md:py-3 bg-custom-blue text-white font-bold rounded-full hover:bg-custom-red text-center">
                {locale === 'fr' ? 'Connexion' : 'Login'}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
