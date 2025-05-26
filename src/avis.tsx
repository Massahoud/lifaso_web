import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const testimonials = [
  {
    name: 'Jaque Yameogo',
    text: 'Simple et efficace ! Je l’utilise tous les jours',
    image: '/avatar1.png',
  },
  {
    name: 'Jean Kientega',
    text: 'J’aime beaucoup surtout la partie qu’on peut suivre en temps réel',
    image: '/avatar2.png',
  },
  {
    name: 'Jaque Yameogo',
    text: 'Simple et efficace ! Je l’utilise tous les jours',
    image: '/avatar1.png',
  },
  {
    name: 'Jaque Yameogo',
    text: 'Simple et efficace ! Je l’utilise tous les jours',
    image: '/avatar1.png',
  },
];

const TestimonialsSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="py-12 bg-white overflow-x-hidden">
      <h2 className="text-2xl font-semibold text-center text-teal-800 mb-2">
        Les avis de nos clients et livreurs
      </h2>
      <div className="h-1 w-48 bg-teal-800 mx-auto mb-8 rounded"></div>

      <div className="flex flex-wrap justify-center gap-6 px-4 max-w-8xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="w-full sm:w-80 bg-white border border-teal-800 rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105"
            data-aos="fade-up"
            data-aos-delay={index * 200}
          >
            <div className="flex justify-center mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full"
              />
            </div>
            <div className="flex justify-center text-teal-800 text-xl mb-2">
              {'★'.repeat(5)}
            </div>
            <p className="text-center font-semibold mb-2">{testimonial.name}</p>
            <p className="text-center text-gray-600 text-sm">{testimonial.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
