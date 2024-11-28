import { FaChalkboardTeacher, FaLanguage, FaBookOpen } from 'react-icons/fa';

export default function About() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 sm:px-8 lg:px-32 text-center">

        <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
          À propos de nous
        </h2>
        

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 ">

          <div className="lg:w-1/2 w-full space-y-6 text-left">
         <p className="text-justify"> Notre école de russe offre un apprentissage de qualité, dispensé par des professeurs natifs et passionnés. Grâce à nos partenariats avec des universités russes, nous permettons à nos étudiants d'accéder à des ressources pédagogiques de pointe et à des programmes d'échange, renforçant ainsi l’immersion dans la langue et la culture russes. Nos cours sont conçus pour répondre aux besoins de chaque élève, qu'il soit débutant ou avancé, avec un accent particulier sur la communication, la compréhension culturelle et les applications pratiques du russe dans des contextes professionnels et académiques.
</p>
<p className="text-justify">L’objectif de notre école est de rendre nos élèves pleinement autonomes en russe, en leur offrant non seulement des compétences linguistiques solides, mais aussi une ouverture sur la culture russe. Nous croyons qu’apprendre le russe, c’est découvrir un univers riche en histoire, en littérature et en opportunités professionnelles.
   </p>     
          </div>


          <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
            <img
              src="/images/moscow2.jpg"
              alt="École de russe"
              className="w-full h-auto transform transition-all duration-500 hover:scale-105"
            />
          </div>
        </div>
        
        
      </div>
</div>
  );
}
